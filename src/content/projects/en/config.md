---
title: NixOS Config
summary: "My ThinkPad configuration, written with the same logic as the homelab: a root filesystem in RAM wiped on every shutdown, so every choice has to be in Git, and applications packaged in the Nix store with nix-wrapper-modules."
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

On a laptop used every day, the system accumulates forgotten dotfiles, packages installed for a quick test and hidden state in the home directory. After a year, you no longer know what makes the machine work, and reproducing it on other hardware becomes difficult.

Nix describes an entire machine in code and gives the same result on every build. I apply the same method to my ThinkPad as to my server and to the NixOS images at La Forge, with my daily workstation as the testbed.

## The tools around Nix

- **flake-parts and import-tree** split the configuration into modules: a file you add is found automatically.
- **nix-wrapper-modules** packages each program with its configuration.
- **disko** describes the disk partitioning so it can be redone with one command.
- **preservation** lists the only files that survive the wipe of the root.
- **lanzaboote** signs the boot with my own Secure Boot keys.
- **sops-nix** decrypts secrets with the YubiKey or the machine's SSH key.
- **microvm.nix** and **deploy-rs** are for the homelab: the first generates the virtual machines, the second deploys the host with automatic rollback.

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
