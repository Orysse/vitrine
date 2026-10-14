---
title: NixOS Config
summary: "My ThinkPad configuration built with the exact same mindset as my homelab: an in-memory root filesystem that wipes itself on every shutdown so every change has to live in Git, and self-contained applications packaged directly in the Nix store with nix-wrapper-modules."
order: 2
repo: https://github.com/Orysse/config
stack: [NixOS, flake-parts, import-tree, nix-wrapper-modules, disko, preservation, lanzaboote, sops-nix, river]
facts:
  - [Machine, "ThinkPad (NixOS, dendritic flake)"]
  - [Architecture, "flake-parts and import-tree (automatic discovery of modules/)"]
  - [Applications, "nix-wrapper-modules (standalone packages in /nix/store, nix run .#nvim)"]
  - [Filesystem, "tmpfs root /, declarative state persistence via preservation (/persistent)"]
  - [Storage, "GPT partitioning, LUKS encryption, and btrfs subvolumes via disko"]
  - [Boot chain, "UEFI Secure Boot via lanzaboote and automatic TPM2 unlock"]
  - [Secrets, "sops-nix (separate private repository, decrypted via YubiKey or host SSH key)"]
  - [Environment, "river, waybar, kitty, tmux, neovim, zsh (Everforest Dark Medium theme)"]
  - [Repository, "github.com/Orysse/config"]
---

## Why treat a laptop like code

When you use a Linux laptop every day, the system inevitably accumulates stray dotfiles, packages installed for a quick five-minute test, and hidden state scattered across your home directory. After a year, you no longer really know what holds the machine together, and reproducing the setup cleanly on new hardware becomes guesswork.

What hooked me on Nix was the exact opposite promise: describing an entire machine in code and getting the exact same result on every build. I wanted to apply the same engineering discipline to my daily ThinkPad as I do to my homelab, turning my personal workstation into a testing ground for declarative system patterns.

## Self-contained applications with nix-wrapper-modules

For everyday tools like Neovim, Kitty, Tmux, Zsh, River, and Waybar, I wanted to avoid scattering generated dotfiles across my home directory or tying tool configurations to a global user-session activation step. Instead, every application in the repository is built around nix-wrapper-modules.

With this pattern, each program is wrapped directly inside the Nix store at build time: the resulting derivation bundles the binary together with its launch flags, plugins, and generated configuration files in one immutable package. Inside the flake, each application directory exposes both a NixOS module for system-wide integration and a standalone package output.

In daily use, this makes every tool completely portable and decoupled from the host state. If I sit down at another machine that has Nix installed, running a single command like nix run github:Orysse/config#nvim or nix run .#kitty immediately launches my exact editor or terminal with all its plugins and keybindings, without touching a single file in that machine's home directory. It also lets me build and test configuration changes in isolation as regular packages before switching the system generation.

## Dendritic flake structure with flake-parts and import-tree

As a NixOS configuration grows, maintaining long lists of module imports by hand quickly becomes tedious. To keep the repository modular without boilerplate, the flake combines flake-parts with import-tree: any file placed under the modules directory is discovered and evaluated automatically without registering it in a central index.

The tree is organized into four distinct layers. The features directory holds the self-contained applications packaged with nix-wrapper-modules, one folder per tool. The system directory defines the core hardware and OS foundation (boot, networking, audio, impermanence, YubiKey, GPG). The flavors directory provides optional, composable capability profiles (development, infrastructure, security, WireGuard VPN), while hosts assembles the final ThinkPad configuration.

## An in-memory root filesystem that wipes itself on shutdown

To make sure no manual tweak or stray file ever silently becomes indispensable, the root filesystem is mounted in RAM as a tmpfs. Every time the laptop powers off, everything on the root partition vanishes.

The physical disk layout itself (GPT partition table, LUKS encrypted container, and btrfs subvolumes) is declared entirely in Nix using disko, so the drive can be partitioned, formatted, and mounted from scratch in a single command. Across reboots, only the Nix store and a dedicated persistent btrfs subvolume survive on disk. The preservation module explicitly bind-mounts only the exact directories and state files I have chosen to keep. Everything else disappears on shutdown, forcing every lasting change to be committed to Git.

## Hardware-locked boot chain and YubiKey secrets

Because this is a laptop that travels with me, boot integrity and secret management are anchored in hardware from start to finish. NixOS boot generations are signed with custom Secure Boot keys using lanzaboote. As long as the UEFI boot chain has not been tampered with, the onboard TPM2 chip unlocks the LUKS partition automatically at boot, falling back to a full passphrase prompt if any boot measurement changes.

Finally, no plaintext secret ever sits on the root filesystem or in the public repository. Private keys, tokens, and sensitive configurations live in a separate encrypted repository and are decrypted at activation time by sops-nix using either my hardware YubiKey or the machine's host SSH key.
