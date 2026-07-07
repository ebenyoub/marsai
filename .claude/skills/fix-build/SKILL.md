---
name: fix-build
description: Réparer un build qui échoue (npm run build, vite, tsc, bundler) sans toucher au comportement métier. À invoquer dès qu'une commande de build sort en erreur.
---

# Réparer le build

## Objectif

Ramener toutes les commandes de build du projet à un code de sortie 0, avec le diff le plus petit possible.

## Méthode

1. Identifier les cibles : lire les scripts de `package.json` (ou Makefile/équivalent) de chaque module du projet.
2. Lancer chaque build, collecter **toutes** les erreurs avant de corriger (éviter les allers-retours).
3. Corriger la cause racine de chaque erreur, pas le symptôme (ex. : type incorrect à la source plutôt que cast au point d'erreur).
4. Relancer jusqu'à zéro erreur.

## Autorisé à modifier

Types, imports, signatures, fichiers de configuration de build (tsconfig, vite.config…) si la config elle-même est fautive.

## Interdit

- Changer la logique métier ou le comportement à l'exécution.
- `any`, `@ts-ignore`, `eslint-disable` pour masquer une erreur (utiliser `unknown` puis affiner).
- Supprimer du code ou des fichiers pour « faire passer ».
- Désactiver des options strictes de compilation.

## Vérifications obligatoires avant de terminer

1. Tous les builds du projet passent (pas seulement celui qui échouait).
2. Le lint ne remonte pas de nouvelle erreur par rapport au point de départ.
3. Rapport : chaque erreur → cause racine → correction appliquée.
