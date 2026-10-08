{
  description = "vitrine.abe.lc: Abel Chartier's site (Astro), served from a NixOS homelab";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});

      # The version lives in package.json and tags the image.
      version = (builtins.fromJSON (builtins.readFile ./package.json)).version;
      rev = self.shortRev or self.dirtyShortRev or "dev";

      mkSite =
        pkgs: siteUrl:
        pkgs.buildNpmPackage {
          pname = "vitrine";
          inherit version;
          src = pkgs.lib.fileset.toSource {
            root = ./.;
            fileset = pkgs.lib.fileset.unions [
              ./package.json
              ./package-lock.json
              ./astro.config.mjs
              ./tsconfig.json
              ./src
              ./public
            ];
          };
          # Dependencies come from the integrity hashes in package-lock.json: no hash to update.
          npmDeps = pkgs.importNpmLock { npmRoot = ./.; };
          npmConfigHook = pkgs.importNpmLock.npmConfigHook;
          nodejs = pkgs.nodejs;
          env = {
            SITE_URL = siteUrl;
            ASTRO_TELEMETRY_DISABLED = "1";
          };
          installPhase = ''
            runHook preInstall
            cp -r dist $out
            runHook postInstall
          '';
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

          nginx-conf = mkNginxConf pkgs site;

          image = pkgs.dockerTools.buildLayeredImage {
            name = "ghcr.io/orysse/vitrine";
            tag = version;
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
              Labels = {
                "org.opencontainers.image.source" = "https://github.com/Orysse/vitrine";
                "org.opencontainers.image.version" = version;
                "org.opencontainers.image.revision" = rev;
              };
            };
          };
        }
      );

      apps = forAllSystems (pkgs: {
        # Production build behind the image's nginx config, on http://localhost:8080
        preview = {
          type = "app";
          program = toString (
            pkgs.writeShellScript "vitrine-preview" ''
              exec ${pkgs.nginx}/bin/nginx -e stderr -c ${mkNginxConf pkgs (mkSite pkgs "http://localhost:8080")} -g 'daemon off;'
            ''
          );
        };
      });

      # nix develop, then: npm install && npm run dev
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell { packages = [ pkgs.nodejs ]; };
      });

      checks = forAllSystems (pkgs: {
        site = self.packages.${pkgs.stdenv.hostPlatform.system}.site;
      });

      formatter = forAllSystems (pkgs: pkgs.nixfmt);
    };
}
