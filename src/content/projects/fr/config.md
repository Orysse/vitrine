---
title: Config NixOS
summary: "La configuration de mon ThinkPad pensée avec la même logique que mon homelab : une racine en mémoire vive qui s'efface à chaque extinction pour forcer chaque choix à être écrit dans Git, et des applications auto-portées empaquetées directement dans le store Nix avec nix-wrapper-modules."
order: 2
repo: https://github.com/Orysse/config
stack: [NixOS, flake-parts, import-tree, nix-wrapper-modules, disko, preservation, lanzaboote, sops-nix, river]
facts:
  - [Machine, "ThinkPad (NixOS, flake dendritique)"]
  - [Architecture, "flake-parts et import-tree (découverte automatique de modules/)"]
  - [Applications, "nix-wrapper-modules (paquets autonomes dans /nix/store, nix run .#nvim)"]
  - [Système de fichiers, "Racine / en tmpfs, persistance déclarative via preservation (/persistent)"]
  - [Stockage, "Partitionnement GPT, chiffrement LUKS et sous-volumes btrfs via disko"]
  - [Chaîne de boot, "UEFI Secure Boot via lanzaboote et déverrouillage automatique par TPM2"]
  - [Secrets, "sops-nix (dépôt privé séparé, déchiffré par YubiKey ou clé SSH hôte)"]
  - [Environnement, "river, waybar, kitty, tmux, neovim, zsh (thème Everforest Dark Medium)"]
  - [Dépôt, "github.com/Orysse/config"]
---

## Pourquoi penser son poste comme du code

Quand on utilise Linux tous les jours sur son ordinateur portable, le système finit toujours par accumuler des fichiers de configuration oubliés, des paquets installés pour un test rapide et de l'état caché au fond du dossier personnel. Au bout d'un an, on ne sait plus vraiment ce qui fait fonctionner la machine, et la réinstaller à l'identique sur un nouveau matériel devient impossible.

Ce qui m'a passionné dans Nix, c'est justement la promesse inverse : pouvoir décrire une machine entière sous forme de code et obtenir exactement le même résultat à chaque construction. J'ai donc voulu appliquer à mon ThinkPad la même rigueur que sur mon serveur, en utilisant mon environnement de travail quotidien comme laboratoire pour pousser l'approche déclarative jusqu'au bout.

## Des applications auto-portées avec nix-wrapper-modules

Pour configurer mes outils du quotidien comme Neovim, Kitty, Tmux, Zsh, River ou Waybar, je voulais éviter de générer des fichiers de configuration éparpillés dans mon dossier personnel ou couplés à l'activation globale d'une session utilisateur. Toute la couche applicative du dépôt repose donc sur nix-wrapper-modules.

Le principe consiste à envelopper chaque programme directement lors de sa construction dans le store Nix : le binaire final embarque ses propres drapeaux de lancement, ses plugins et ses fichiers de configuration générés dans une dérivation immuable. Dans le flake, chaque dossier applicatif expose à la fois un module NixOS pour le système et un paquet autonome prêt à être exécuté.

Cette approche offre un avantage immédiat à l'usage : mes outils deviennent totalement portables et indépendants de la machine hôte. Si je travaille temporairement sur un autre ordinateur disposant de Nix, une seule commande comme nix run github:Orysse/config#nvim ou nix run .#kitty me redonne instantanément mon éditeur ou mon terminal complet avec tous ses réglages, sans jamais écrire un seul fichier dans le dossier personnel de la machine. Je peux également tester une modification de configuration en lançant le paquet isolément avant même de reconstruire le système.

## Architecture dendritique avec flake-parts et import-tree

À mesure qu'une configuration NixOS grandit, maintenir à la main de longues listes d'imports devient vite fastidieux. Pour garder une structure modulaire sans friction, le dépôt combine flake-parts et import-tree : n'importe quel fichier ajouté dans le dossier modules est découvert et évalué automatiquement, sans jamais avoir à l'enregistrer dans un index central.

L'arborescence est découpée en quatre couches claires. Le dossier features regroupe les applications encapsulées avec nix-wrapper-modules, chacune isolée dans son propre répertoire. Le dossier system contient le socle matériel et système de base (amorçage, réseau, audio, impermanence, YubiKey, GPG). Le dossier flavors définit des profils thématiques optionnels que l'on peut activer selon le rôle d'une machine (développement, infrastructure, sécurité, VPN WireGuard), tandis que hosts assemble la configuration finale du ThinkPad.

## Une racine en mémoire vive qui s'efface à chaque extinction

Pour garantir qu'aucun fichier créé ou modifié à la main ne devienne silencieusement indispensable au fonctionnement du poste, la racine du système est montée en mémoire vive dans un tmpfs. À chaque fois que j'éteins l'ordinateur, l'intégralité du système de fichiers racine disparaît.

Le partitionnement du disque physique (table GPT, conteneur chiffré LUKS et sous-volumes btrfs) est lui-même entièrement déclaré en code avec disko, ce qui permet de formater et reconstruire le disque de zéro en une seule commande. Au démarrage, seuls le store Nix et le sous-volume persistent survivent sur le disque. Le module preservation se charge de monter explicitement les seuls répertoires et fichiers que j'ai choisi de conserver d'une session à l'autre. Tout le reste s'évapore à l'extinction, ce qui force chaque changement durable à être inscrit dans Git.

## Chaîne de démarrage verrouillée et secrets sur YubiKey

Comme il s'agit d'un ordinateur portable que j'emporte partout, l'intégrité du démarrage et la protection des secrets reposent entièrement sur le matériel. Les générations de démarrage NixOS sont signées avec mes propres clés Secure Boot grâce à lanzaboote. Tant que la chaîne de démarrage UEFI n'a pas été altérée, la puce TPM2 déverrouille automatiquement la partition LUKS au démarrage, tout en exigeant la phrase de passe complète si l'environnement d'amorçage change.

Enfin, aucun secret n'est stocké en clair sur le disque ni dans le dépôt public. Les clés privées, jetons et configurations sensibles proviennent d'un dépôt chiffré séparé et sont déchiffrés à la volée par sops-nix à l'aide de ma YubiKey ou de la clé SSH de la machine.
