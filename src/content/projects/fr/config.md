---
title: Config NixOS
summary: La configuration de mon laptop (ThinkPad) en un flake dendritique, sans home-manager. Racine en tmpfs, disque chiffré déclaré, Secure Boot, secrets sur YubiKey.
order: 2
art: laptop
paper: yellow
repo: https://github.com/Orysse/config
stack: [NixOS, flake-parts, import-tree, nix-wrapper-modules, disko, preservation, lanzaboote, sops-nix, sway]
facts:
  - [Structure, "flake-parts + import-tree : features/, system/, flavors/, hosts/"]
  - [Programmes, "configurés avec nix-wrapper-modules ; chacun se lance seul : nix run .#kitty"]
  - [Racine, "tmpfs ; seuls /nix et /persistent survivent (preservation)"]
  - [Disque, "GPT + LUKS + btrfs, déclaré avec disko"]
  - [Démarrage, "Secure Boot avec lanzaboote, LUKS déverrouillé par TPM2"]
  - [Secrets, "sops-nix, clé sur YubiKey ou clé SSH de l'hôte, dépôt chiffré séparé"]
  - [Bureau, "sway, waybar, kitty, tmux, nvim, thème Everforest Dark Medium"]
---

## Organisation

Le flake n'a pas de liste de modules maintenue à la main : import-tree charge tout ce qui est dans `modules/`, et chaque fichier est un module flake-parts.

- `features/` : une application par dossier (kitty, nvim, tmux, zsh, waybar…), exposée à la fois en paquet (`perSystem`) et en module NixOS.
- `system/` : le socle (boot, utilisateurs, réseau, impermanence, YubiKey, GPG).
- `flavors/` : des profils optionnels par machine (dev, infra, sécurité, secrets, WireGuard…).
- `hosts/` : les `nixosConfigurations`, aujourd'hui `thinkpad`.

## Sans home-manager

Les programmes sont configurés avec nix-wrapper-modules : le paquet embarque sa configuration. Chaque outil se lance seul depuis le flake, par exemple `nix run .#nvim` ou `nix build .#zsh`.

## État et sécurité

La racine est un tmpfs : tout ce qui n'est pas déclaré disparaît au redémarrage. Ce qui doit survivre est listé explicitement et rangé dans `/persistent`. Le disque est chiffré (LUKS) et déverrouillé par le TPM2, avec Secure Boot via lanzaboote. Les secrets viennent d'un dépôt chiffré séparé et sont déchiffrés par sops-nix avec la YubiKey ou la clé SSH de l'hôte.
