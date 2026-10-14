---
title: Config NixOS
summary: "Mon poste de travail sous NixOS, décrit entièrement dans Git. La racine s'efface à chaque extinction, et les programmes sont emballés avec leur configuration : ils se lancent sur n'importe quelle machine qui a Nix."
order: 2
repo: https://github.com/Orysse/config
stack: [NixOS, flake-parts, import-tree, nix-wrapper-modules, disko, preservation, lanzaboote, sops-nix, river]
facts:
  - [Architecture, "flake-parts et import-tree (découverte automatique de modules/)"]
  - [Applications, "nix-wrapper-modules (paquets autonomes dans /nix/store, nix run .#nvim)"]
  - [Système de fichiers, "Racine / en tmpfs, persistance déclarative via preservation (/persistent)"]
  - [Stockage, "Partitionnement GPT, chiffrement LUKS et sous-volumes btrfs via disko"]
  - [Chaîne de boot, "UEFI Secure Boot via lanzaboote et déverrouillage automatique par TPM2"]
  - [Secrets, "sops-nix (dépôt privé séparé, déchiffré par YubiKey ou clé SSH hôte)"]
  - [Dépôt, "github.com/Orysse/config"]
---

Ma machine de travail est décrite entièrement dans Git. Sa racine est un tmpfs : ce qui n'est pas déclaré disparaît à l'extinction, et preservation liste les seuls répertoires qui survivent. Le disque (LUKS, btrfs) est déclaré avec disko, le démarrage est signé avec mes clés (lanzaboote) et sops-nix déchiffre les secrets avec une YubiKey.

Les programmes sont emballés avec nix-wrapper-modules : le binaire embarque sa configuration dans le store. `nix run github:Orysse/config#nvim` donne mon éditeur complet sur n'importe quelle machine qui a Nix, sans rien écrire dans son dossier personnel.

Le dépôt est un flake dendritique (flake-parts, import-tree) : un fichier ajouté dans modules/ est découvert tout seul. Un hôte est un assemblage de features, de system et de flavors, donc un hôte de plus est un assemblage de plus.
