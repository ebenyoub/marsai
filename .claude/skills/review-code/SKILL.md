---
name: review-code
description: Relire du code (diff récent ou périmètre donné) pour trouver bugs de correction, failles de sécurité et incohérences de contrat — sans modifier le code.
---

# Revue de code

## Objectif

Produire une liste de constats vérifiés et actionnables sur le périmètre demandé. La revue est en lecture seule : les corrections sont une mission séparée.

## Méthode

1. Délimiter le périmètre (diff, dossier, feature) et lire le code **appelant et appelé**, pas seulement les fichiers listés — la plupart des bugs sont aux frontières (contrats front/back, clés de payload, casse camelCase/snake_case).
2. Chercher en priorité : erreurs de logique avec scénario d'échec concret, données non validées, auth/autorisations manquantes, requêtes non paramétrées, erreurs avalées silencieusement, incohérences type ↔ réalité runtime.
3. Vérifier chaque constat avant de le rapporter (relire le chemin complet, exécuter une commande de démonstration si possible) — pas de suppositions.
4. Classer : critique (casse ou faille) / important (bug probable) / mineur (qualité).

## Autorisé à modifier

Rien. Lecture et commandes de démonstration non destructives uniquement.

## Interdit

- Modifier le moindre fichier du projet.
- Rapporter un constat non vérifié ou purement stylistique comme s'il était bloquant.
- Re-signaler la dette déjà documentée du projet comme une découverte.

## Vérifications obligatoires avant de terminer

1. Chaque constat : gravité, fichier:ligne, scénario d'échec concret (entrées → conséquence), correctif proposé.
2. Constats classés par gravité décroissante, résumé de 3 lignes en tête.
3. Confirmation explicite qu'aucun fichier n'a été modifié.
