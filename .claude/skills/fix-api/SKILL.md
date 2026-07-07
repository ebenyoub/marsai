---
name: fix-api
description: Diagnostiquer et corriger un endpoint API cassé ou manquant (4xx/5xx, contrat incohérent, erreur SQL). À invoquer quand un appel API échoue ou qu'un flux front-back ne fonctionne pas.
---

# Réparer une API

## Objectif

Rendre l'endpoint fonctionnel de bout en bout : requête du client → validation → persistance → réponse conforme à ce que le consommateur attend.

## Méthode

1. Reproduire d'abord : appel `curl` minimal qui échoue, avec le payload exact envoyé par le client réel (lire le code appelant, pas la doc).
2. Suivre la chaîne complète : route montée ? middleware (auth, validation, parseur multipart) ? contrôleur ? requête SQL ? Localiser le maillon exact.
3. Comparer champ par champ le payload client et ce que le serveur attend (camelCase/snake_case, types, champs `undefined` — cause classique de « Bind parameters must not contain undefined »).
4. Corriger la cause racine côté approprié (client OU serveur, pas un contournement des deux côtés).

## Autorisé à modifier

Routes, contrôleurs, modèles, schémas de validation, et le code client appelant si c'est lui qui est fautif.

## Interdit

- Modifier le contrat d'API (noms de champs, structure de réponse) sans vérifier **tous** les consommateurs existants.
- try/catch silencieux pour masquer l'erreur.
- Désactiver la validation ou l'authentification pour « débloquer ».

## Vérifications obligatoires avant de terminer

1. Le `curl` de reproduction initial passe désormais (cas nominal + au moins un cas d'erreur propre : 400/401/404 justifié).
2. La donnée est réellement persistée/lue (vérification directe en base si écriture).
3. Le flux complet côté client re-testé (pas seulement le curl).
4. Rapport : cause racine, maillon fautif, tests exécutés.
