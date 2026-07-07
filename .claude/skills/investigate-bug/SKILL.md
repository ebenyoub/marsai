---
name: investigate-bug
description: Investiguer méthodiquement un bug (comportement inattendu, crash, donnée incohérente) jusqu'à la cause racine prouvée, avant toute correction.
---

# Investiguer un bug

## Objectif

Identifier la cause racine d'un bug avec preuve reproductible. La correction ne commence qu'une fois la cause démontrée — jamais de correction « à l'intuition ».

## Méthode

1. **Reproduire d'abord** : obtenir le scénario minimal qui déclenche le bug (commande, payload, séquence UI). Sans reproduction, pas d'investigation fiable.
2. Suivre la donnée de bout en bout : entrée utilisateur → client → requête réseau → middleware → contrôleur → SQL → réponse → rendu. Localiser le premier maillon où la donnée devient fausse.
3. Instrumenter temporairement si nécessaire (logs du payload reçu, des paramètres SQL) — et **retirer** cette instrumentation après.
4. Distinguer la cause racine du symptôme : « le champ est undefined » est un symptôme ; « le client envoie `firstName` et le serveur lit `firstname` » est une cause.
5. Vérifier l'hypothèse par une contre-preuve (modifier l'entrée d'une façon qui devrait changer le résultat si l'hypothèse est vraie).

## Autorisé à modifier

Instrumentation temporaire (logs) obligatoirement retirée en fin de mission. La correction elle-même seulement si demandée, en mission séparée ou explicitement incluse.

## Interdit

- Corriger sans avoir reproduit et prouvé la cause.
- Laisser des logs de debug, des données de test ou des contournements dans le code.
- Masquer le symptôme (try/catch, valeur par défaut) au lieu de traiter la cause.

## Vérifications obligatoires avant de terminer

1. Scénario de reproduction documenté (commandes/étapes exactes).
2. Cause racine énoncée en une phrase, avec le fichier:ligne fautif et la preuve.
3. Si correction appliquée : le scénario de reproduction passe désormais, et le code est net de toute instrumentation.
