---
name: mvp-mode
description: Mode de travail MVP — priorité absolue à un produit stable et démontrable. À invoquer en début de session quand l'objectif est de livrer/réparer vite sans refonte.
---

# Mode MVP

## Objectif

Amener ou maintenir le projet dans un état démontrable de bout en bout, par petites étapes vérifiables, en réutilisant l'existant.

## Règles de travail

1. Corriger avant d'améliorer : un bug bloquant la démo passe avant toute amélioration de code.
2. Petites étapes : chaque modification doit être vérifiable indépendamment (build + test réel du flux touché) avant de passer à la suivante.
3. Réutiliser les mécanismes existants (helpers, middlewares, composants) plutôt qu'en créer de nouveaux.
4. Toute simplification assumée (feature désactivée, statut par défaut, mock) doit être signalée explicitement dans le rapport final — jamais silencieuse.
5. Ne pas s'arrêter après une correction : continuer jusqu'au prochain blocage ou jusqu'à la démo complète.

## Autorisé à modifier

Tout le code applicatif nécessaire à la stabilité de la démo.

## Interdit

- Refonte d'architecture, renommages de masse, déplacement de fichiers non indispensable.
- Suppression de fonctionnalités existantes pour « simplifier ».
- Nouvelle documentation (en dehors de la mise à jour du fichier mémoire projet existant).
- Nouvelles dépendances sauf nécessité démontrée (la justifier dans le rapport).

## Vérifications obligatoires avant de terminer

1. Build de chaque partie touchée passe.
2. Le parcours de démo complet exercé réellement (navigateur/API), pas seulement compilé.
3. Rapport : fichiers modifiés, problèmes corrigés, tests réalisés, simplifications assumées, blocages restants.
