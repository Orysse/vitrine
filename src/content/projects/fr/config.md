---
title: Config NixOS
summary: La configuration de mon laptop (ThinkPad) en un flake dendritique, sans home-manager. Racine en tmpfs, disque chiffré déclaré, Secure Boot, secrets sur YubiKey.
order: 2
photo: { src: "/img/thinkpad.jpg", credit: "Edvard10 / Wikimedia Commons", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:ThinkPad_T14.jpg" }
repo: https://github.com/Orysse/config
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
