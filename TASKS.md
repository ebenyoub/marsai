# TASKS.md — MarsAI

## En attente de décision utilisateur

- [ ] **Push des 5 commits locaux** (`03de953`..`c85eb01`) vers `origin/main` — attend validation explicite. Voir `PROJECT_STATE.md`.
- [ ] **Choisir le prochain PBI** de la session de demain (voir propositions dans `PROJECT_STATE.md`).

## Dette technique identifiée, non traitée (volontairement)

- [ ] Assigner un rôle à `POST /movies`, `/collaborators`, `/directors` **si** une UI frontend vient à les appeler un jour — sinon laisser en authentification simple.
- [ ] Corriger `CLAUDE.md` section "État connu (juillet 2026)" (obsolète — voir `docs/decisions.md` du 2026-07-07) lors de la phase de documentation globale annoncée par l'utilisateur.

## Terminé cette session (2026-07-07)

- [x] Audit + correction des 29 erreurs `tsc --noEmit` frontend (commit `cf6cfb5`)
- [x] Suppression code mort `SubmissionCard.tsx` / `SubmissionsPanel.tsx` (commit `39e6208`)
- [x] Audit + correction auth manquante sur routes mutantes festival/movie/collaborator/director (commit `03de953`)
- [x] Audit + correction fuite de hash de mot de passe sur `/users` (commit `1337c47`)
- [x] RBAC minimal : rôle dans le JWT, middleware `requireRole`, routes évidentes protégées (commit `c85eb01`)

## Terminé sessions précédentes

- [x] PBI 001-008 (commit `ae51ecc`)
- [x] PBI 009 — compteur soumissions festival + nom réalisateur jury (commit `cc07b71`)
- [x] Fix données factices dashboards admin/super-admin (commit `d92af8f`)
