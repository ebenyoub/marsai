# TASKS.md — MarsAI

## En attente de décision utilisateur

- [ ] **Push des 6 commits locaux** (`03de953`..`cc10a32`) + du travail PBI 010 (non commité) vers `origin/main` — attend validation explicite. Voir `PROJECT_STATE.md`.
- [ ] **Choisir le prochain PBI** (voir propositions dans `PROJECT_STATE.md`).

## Dette technique identifiée, non traitée (volontairement)

- [ ] Assigner un rôle à `POST /movies`, `/collaborators`, `/directors` **si** une UI frontend vient à les appeler un jour — sinon laisser en authentification simple.
- [ ] Corriger `CLAUDE.md` section "État connu (juillet 2026)" (obsolète — voir `docs/decisions.md` du 2026-07-07) lors de la phase de documentation globale annoncée par l'utilisateur.
- [ ] `SubmissionsTable.tsx` / `TabsListContainer.tsx` (`getStatusBadge`, en-têtes de colonnes) : texte français codé en dur alors que des clés i18n existent déjà (`common.pending`, `common.validated`, `common.rejected`) — repéré lors du PBI 010, non corrigé (hors scope, non bloquant).
- [ ] Conteneur Docker `marsai_backend` toujours cassé (`dist/server.js` manquant, image jamais reconstruite) — contournement : backend lancé en local (`npm run dev`) pointé sur MySQL Docker (port 3310) pour la vérification du PBI 010.

## Terminé cette session (2026-07-08)

- [x] PBI 010 — modération des soumissions : `GET /movies?status=all` protégé (admin/super-admin uniquement), UI d'approbation/rejet vérifiée fonctionnelle E2E (non commité)

## Terminé session précédente (2026-07-07)

- [x] Audit + correction des 29 erreurs `tsc --noEmit` frontend (commit `cf6cfb5`)
- [x] Suppression code mort `SubmissionCard.tsx` / `SubmissionsPanel.tsx` (commit `39e6208`)
- [x] Audit + correction auth manquante sur routes mutantes festival/movie/collaborator/director (commit `03de953`)
- [x] Audit + correction fuite de hash de mot de passe sur `/users` (commit `1337c47`)
- [x] RBAC minimal : rôle dans le JWT, middleware `requireRole`, routes évidentes protégées (commit `c85eb01`)

## Terminé sessions précédentes

- [x] PBI 001-008 (commit `ae51ecc`)
- [x] PBI 009 — compteur soumissions festival + nom réalisateur jury (commit `cc07b71`)
- [x] Fix données factices dashboards admin/super-admin (commit `d92af8f`)
