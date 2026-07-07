---
name: fix-typescript
description: Résorber des erreurs TypeScript (tsc --noEmit) proprement — typage réel, pas de contournement. À invoquer pour une passe de typage ou après fix-build si le typecheck reste rouge.
---

# Corriger le typage TypeScript

## Objectif

Réduire les erreurs `tsc --noEmit` en améliorant les types réels, sans jamais dégrader la sécurité de typage ni changer le comportement.

## Méthode

1. `npx tsc --noEmit` dans chaque module ; compter les erreurs par fichier (`| sort | uniq -c`) pour prioriser.
2. Traiter par groupe de cause (une interface fausse corrige souvent des dizaines d'erreurs) plutôt que fichier par fichier.
3. Aligner les types sur la **réalité à l'exécution** (réponse API réelle, schéma DB réel) — vérifier avant de typer, ne pas deviner.
4. Champs réellement optionnels → `?` ; valeur inconnue → `unknown` + affinage ; jamais `any`.

## Autorisé à modifier

Interfaces, types, génériques, signatures, annotations, tsconfig si une option est objectivement mal réglée.

## Interdit

- `any`, `@ts-ignore`, `@ts-expect-error` sans justification écrite en rapport.
- Modifier le comportement à l'exécution (le diff ne doit contenir que du typage, sauf bug réel découvert — le signaler alors séparément).
- Affaiblir `strict` ou les options associées.

## Vérifications obligatoires avant de terminer

1. Nombre d'erreurs `tsc --noEmit` avant/après documenté (objectif : zéro sur le périmètre demandé).
2. Le build passe toujours.
3. Rapport : erreurs corrigées par groupe de cause, erreurs restantes assumées et pourquoi.
