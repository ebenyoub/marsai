---
name: create-feature
description: Développer une nouvelle fonctionnalité de bout en bout (DB → API → UI) en réutilisant les patterns existants du projet, par étapes vérifiables.
---

# Créer une fonctionnalité

## Objectif

Livrer la fonctionnalité complète et testée réellement, intégrée aux conventions du projet — pas un prototype ni un bouton décoratif.

## Méthode

1. **Inventaire avant d'écrire** : chercher les patterns existants équivalents (un CRUD voisin, un formulaire similaire, un hook comparable) et les répliquer — ne pas inventer un nouveau style.
2. Construire par couches testables : schéma DB → modèle → route+contrôleur (tester par curl) → appel client → UI (tester en navigateur). Valider chaque couche avant la suivante.
3. Chaque élément d'UI visible doit avoir un comportement réel branché ; chaque texte visible passe par l'i18n si le projet en a une.
4. Gérer les états non nominaux dès la construction : chargement, erreur serveur, données vides, double soumission.

## Autorisé à modifier

Tout ce qui est nécessaire à la fonctionnalité, dans le respect des couches et conventions existantes.

## Interdit

- Refactorer du code existant non lié « tant qu'on y est ».
- Casser ou modifier un contrat d'API existant sans vérifier tous ses consommateurs.
- Nouvelle dépendance sans justification écrite.
- Livrer une UI dont des boutons/liens sont inertes ou dont les erreurs sont silencieuses.

## Vérifications obligatoires avant de terminer

1. Builds verts sur tous les modules touchés.
2. Le parcours utilisateur complet de la fonctionnalité exercé réellement (navigateur + vérification de la persistance en base).
3. Les fonctionnalités voisines re-testées (non-régression sur ce qui partage du code).
4. Rapport : couches ajoutées, contrat d'API, tests réalisés, limites connues.
