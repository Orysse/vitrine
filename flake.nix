{
  description = "vitrine.abe.lc: Abel Chartier's showcase, printed as a psychedelic underground magazine";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});

      # Printed in the footer of every page: which commit is being served.
      rev = self.shortRev or self.dirtyShortRev or "dev";

      mkSite =
        pkgs: baseUrl:
        pkgs.stdenvNoCC.mkDerivation {
          pname = "vitrine";
          version = rev;
          src = pkgs.lib.fileset.toSource {
            root = ./.;
            fileset = pkgs.lib.fileset.unions [
              ./config.toml
              ./content
              ./templates
              ./static
            ];
          };
          nativeBuildInputs = [ pkgs.zola ];
          # Zola builds an HTTP client at startup (for load_data) and panics without CA certs.
          SSL_CERT_FILE = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
          buildPhase = ''
            runHook preBuild
            zola build --base-url ${baseUrl} --output-dir $out
            find $out -name '*.html' -exec sed -i 's/@BUILD_REV@/${rev}/g' {} +
            runHook postBuild
          '';
          dontInstall = true;
        };

      mkNginxConf =
        pkgs: site:
        pkgs.replaceVars ./nginx.conf {
          mime = "${pkgs.nginx}/conf/mime.types";
          root = site;
        };
    in
    {
      packages = forAllSystems (
        pkgs:
        let
          site = mkSite pkgs "https://vitrine.abe.lc";
        in
        {
          inherit site;
          default = site;

          # Same site with links pointing at localhost, to try the image locally.
          site-local = mkSite pkgs "http://localhost:8080";

          nginx-conf = mkNginxConf pkgs site;

          image = pkgs.dockerTools.buildLayeredImage {
            name = "ghcr.io/orysse/vitrine";
            tag = rev;
            contents = [ pkgs.dockerTools.fakeNss ];
            extraCommands = "mkdir -m 1777 tmp";
            config = {
              Cmd = [
                "${pkgs.nginx}/bin/nginx"
                "-e"
                "stderr"
                "-c"
                "${mkNginxConf pkgs site}"
                "-g"
                "daemon off;"
              ];
              User = "65534:65534";
              ExposedPorts."8080/tcp" = { };
              Labels."org.opencontainers.image.source" = "https://github.com/Orysse/vitrine";
            };
          };
        }
      );

      apps = forAllSystems (pkgs: {
        # Live preview with reload: nix run .#serve
        serve = {
          type = "app";
          program = toString (
            pkgs.writeShellScript "vitrine-serve" ''
              exec ${pkgs.zola}/bin/zola serve "$@"
            ''
          );
        };

        # Serves the production build with the image's nginx config on :8080.
        preview = {
          type = "app";
          program = toString (
            pkgs.writeShellScript "vitrine-preview" ''
              exec ${pkgs.nginx}/bin/nginx -e stderr -c ${mkNginxConf pkgs (mkSite pkgs "http://localhost:8080")} -g 'daemon off;'
            ''
          );
        };

        # Re-downloads and subsets the fonts into static/fonts (output is committed).
        fetch-fonts = {
          type = "app";
          program = toString (
            pkgs.writeShellApplication {
              name = "fetch-fonts";
              runtimeInputs = [
                (pkgs.python3.withPackages (p: [
                  p.fonttools
                  p.brotli
                ]))
                pkgs.curl
                pkgs.git
              ];
              text = builtins.readFile ./scripts/fetch-fonts.sh;
            }
          ) + "/bin/fetch-fonts";
        };
      });

      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell { packages = [ pkgs.zola ]; };
      });

      checks = forAllSystems (pkgs: {
        site = self.packages.${pkgs.system}.site;
      });

      formatter = forAllSystems (pkgs: pkgs.nixfmt);
    };
}
