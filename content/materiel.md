+++
title = "Le catalogue du matériel"
description = "Ce qui fait tourner mon travail : laptop, clé, serveur et flake."
template = "materiel.html"
weight = 3

[extra]
num = "20"
kicker = "Catalogue"
heading = ["Le catalogue", "du matériel"]
intro = "Tout ce qui fait tourner mon travail, et ce que chaque pièce fait. Façon Whole Earth Catalog : des outils, pas des produits."

[[extra.items]]
name = "Le laptop"
art = "laptop"
paper = "yellow"
rows = [
  ["Quoi", "ThinkPad sous NixOS"],
  ["Racine", "tmpfs : seuls /nix et /persistent survivent au reboot"],
  ["Disque", "GPT, LUKS et btrfs, décrits avec disko"],
  ["Démarrage", "Secure Boot (lanzaboote), déverrouillage LUKS par TPM2"],
  ["Bureau", "sway, waybar, kitty, tmux, nvim, en Everforest"],
]

[[extra.items]]
name = "La clé"
art = "key"
paper = "green"
rows = [
  ["Quoi", "YubiKey"],
  ["Sert à", "déchiffrer les secrets (sops-nix), déverrouiller KeePassXC"],
  ["Pourquoi", "un secret qui ne quitte jamais un objet physique"],
]

[[extra.items]]
name = "Le serveur"
art = "nuc"
paper = "pink"
rows = [
  ["Quoi", "Intel NUC, nuc1"],
  ["Fait tourner", "trois microVMs (microvm.nix), un cluster k3s"],
  ["Sert", "ce site"],
]

[[extra.items]]
name = "Le fichier"
art = "flake"
paper = "blue"
rows = [
  ["Quoi", "flake.nix"],
  ["Décrit", "le laptop, le serveur, les VMs, le cluster"],
  ["Style", "dendritique : flake-parts + import-tree, sans home-manager"],
  ["Lancer", "chaque programme : nix run .#kitty, .#nvim…"],
]
+++
