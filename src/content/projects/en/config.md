---
title: NixOS config
summary: My laptop (ThinkPad) configuration as one dendritic flake, without home-manager. tmpfs root, declared encrypted disk, Secure Boot, secrets on a YubiKey.
order: 2
art: laptop
paper: yellow
photo: { src: "/img/thinkpad.jpg", credit: "Edvard10 / Wikimedia Commons", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:ThinkPad_T14.jpg" }
repo: https://github.com/Orysse/config
stack: [NixOS, flake-parts, import-tree, nix-wrapper-modules, disko, preservation, lanzaboote, sops-nix, sway]
facts:
  - [Layout, "flake-parts + import-tree: features/, system/, flavors/, hosts/"]
  - [Programs, "configured with nix-wrapper-modules; each runs on its own: nix run .#kitty"]
  - [Root, "tmpfs; only /nix and /persistent survive (preservation)"]
  - [Disk, "GPT + LUKS + btrfs, declared with disko"]
  - [Boot, "Secure Boot with lanzaboote, LUKS unlocked by TPM2"]
  - [Secrets, "sops-nix, keyed to a YubiKey or the host SSH key, separate encrypted repo"]
  - [Desktop, "sway, waybar, kitty, tmux, nvim, Everforest Dark Medium theme"]
---

## Layout

The flake has no hand-maintained module list: import-tree loads everything in `modules/`, and each file is a flake-parts module.

- `features/`: one application per folder (kitty, nvim, tmux, zsh, waybar…), exposed both as a package (`perSystem`) and as a NixOS module.
- `system/`: the base (boot, users, network, impermanence, YubiKey, GPG).
- `flavors/`: optional per-host profiles (dev, infra, security, secrets, WireGuard…).
- `hosts/`: the `nixosConfigurations`, currently `thinkpad`.

## Without home-manager

Programs are configured with nix-wrapper-modules: the package carries its own configuration. Each tool runs on its own from the flake, for example `nix run .#nvim` or `nix build .#zsh`.

## State and security

The root is a tmpfs: whatever is not declared disappears on reboot. What must survive is listed explicitly and kept in `/persistent`. The disk is encrypted (LUKS) and unlocked by the TPM2, with Secure Boot through lanzaboote. Secrets come from a separate encrypted repository and are decrypted by sops-nix with the YubiKey or the host SSH key.
