---
name: run-tests
description: Exécuter la batterie de vérifications du projet (builds, lint, tests API, tests navigateur Playwright, état DB/Docker) et produire un rapport PASS/FAIL sans rien corriger.
---

# Lancer les tests

## Objectif

Photographie fiable de l'état du projet : ce qui marche, ce qui est cassé, avec reproduction pour chaque échec. Aucune correction — le rapport sert à décider de la suite.

## Méthode

1. **Statique** : build de chaque module, lint, typecheck — noter les compteurs d'erreurs (et les comparer au niveau connu/toléré du projet s'il est documenté).
2. **Services** : conteneurs up/healthy, un appel HTTP réel par service, connexion DB.
3. **API** : un appel par endpoint critique (auth, lecture, écriture) avec vérification du code HTTP et de la forme de la réponse ; pour les écritures, vérifier la persistance en base puis utiliser des données jetables identifiables (préfixe `test`/timestamp).
4. **Navigateur** : Playwright headless sur les parcours critiques définis par le projet ; capturer erreurs console et dialogs ; screenshots des échecs.
5. Isoler les tests : ne pas dépendre de l'ordre d'exécution ni laisser l'environnement dans un état différent (données de test signalées dans le rapport).

## Autorisé à modifier

Scripts de test temporaires (hors dépôt), données de test jetables et identifiables en base.

## Interdit

- Corriger le code du produit (même un fix « évident » — le signaler seulement).
- Modifier ou supprimer des données réelles/seedées.
- Marquer PASS un flux non exercé réellement (un build vert n'est pas un test fonctionnel).

## Vérifications obligatoires avant de terminer

1. Rapport PASS/FAIL par vérification, groupé par niveau (statique / services / API / navigateur).
2. Pour chaque FAIL : étapes exactes de reproduction, message d'erreur, hypothèse de cause.
3. Liste des données de test laissées en base, le cas échéant.
