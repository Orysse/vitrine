---
title: NixOS Config
summary: "My workstation on NixOS, described entirely in Git. The root is wiped at every shutdown, and programs are wrapped with their configuration: they run on any machine that has Nix."
order: 2
repo: https://github.com/Orysse/config
stack: [NixOS, flake-parts, import-tree, nix-wrapper-modules, disko, preservation, lanzaboote, sops-nix, river]
facts:
  - [Architecture, "flake-parts and import-tree (automatic discovery of modules/)"]
  - [Applications, "nix-wrapper-modules (standalone packages in /nix/store, nix run .#nvim)"]
  - [Filesystem, "tmpfs root /, declarative state persistence via preservation (/persistent)"]
  - [Storage, "GPT partitioning, LUKS encryption, and btrfs subvolumes via disko"]
  - [Boot chain, "UEFI Secure Boot via lanzaboote and automatic TPM2 unlock"]
  - [Secrets, "sops-nix (separate private repository, decrypted via YubiKey or host SSH key)"]
  - [Repository, "github.com/Orysse/config"]
---

My workstation is described entirely in Git. Its root is a tmpfs: whatever is not declared disappears at shutdown, and preservation lists the only directories that survive. The disk (LUKS, btrfs) is declared with disko, the boot is signed with my keys (lanzaboote) and sops-nix decrypts the secrets with a YubiKey.

Programs are wrapped with nix-wrapper-modules: the binary carries its configuration in the store. `nix run github:Orysse/config#nvim` gives my full editor on any machine that has Nix, without writing anything to its home directory.

The repository is a dendritic flake (flake-parts, import-tree): a file added under modules/ is discovered on its own. A host is an assembly of features, system and flavors, so one more host is one more assembly.
