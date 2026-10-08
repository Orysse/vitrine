+++
title = "The gear catalogue"
description = "What runs my work: laptop, key, server and flake."
template = "materiel.html"
weight = 3

[extra]
num = "20"
kicker = "Catalogue"
heading = ["The gear", "catalogue"]
intro = "Everything my work runs on, and what each piece does. Whole Earth Catalog style: tools, not products."

[[extra.items]]
name = "The laptop"
art = "laptop"
paper = "yellow"
rows = [
  ["What", "ThinkPad running NixOS"],
  ["Root", "tmpfs: only /nix and /persistent survive a reboot"],
  ["Disk", "GPT, LUKS and btrfs, declared with disko"],
  ["Boot", "Secure Boot (lanzaboote), LUKS unlocked by TPM2"],
  ["Desktop", "sway, waybar, kitty, tmux, nvim, in Everforest"],
]

[[extra.items]]
name = "The key"
art = "key"
paper = "green"
rows = [
  ["What", "YubiKey"],
  ["Used for", "decrypting secrets (sops-nix), unlocking KeePassXC"],
  ["Why", "a secret that never leaves a physical object"],
]

[[extra.items]]
name = "The server"
art = "nuc"
paper = "pink"
rows = [
  ["What", "Intel NUC, nuc1"],
  ["Runs", "three microVMs (microvm.nix), a k3s cluster"],
  ["Serves", "this site"],
]

[[extra.items]]
name = "The file"
art = "flake"
paper = "blue"
rows = [
  ["What", "flake.nix"],
  ["Describes", "the laptop, the server, the VMs, the cluster"],
  ["Style", "dendritic: flake-parts + import-tree, no home-manager"],
  ["Run", "every program: nix run .#kitty, .#nvim…"],
]
+++
