# TASKS.md — MarsAI

## En attente de décision utilisateur

- [ ] **Push des 6+1 commits locaux** (`03de953`..`32fb4ee`) + du travail PBI 011 (non commité) vers `origin/main` — attend validation explicite. Voir `PROJECT_STATE.md`.
- [ ] **Choisir le prochain PBI** (voir propositions dans `PROJECT_STATE.md`).

## Dette technique identifiée, non traitée (volontairement)

- [ ] Assigner un rôle à `POST /movies`, `/collaborators`, `/directors` **si** une UI frontend vient à les appeler un jour — sinon laisser en authentification simple.
- [ ] Corriger `CLAUDE.md` section "État connu (juillet 2026)" (obsolète — voir `docs/decisions.md` du 2026-07-07) lors de la phase de documentation globale annoncée par l'utilisateur.
- [ ] Conteneur Docker `marsai_backend` toujours cassé (`dist/server.js` manquant, image jamais reconstruite) — contournement : backend lancé en local (`npm run dev`) pointé sur MySQL Docker (port 3310) pour la vérification des PBI 010/011.

## Terminé cette session (2026-07-08)

- [x] PBI 010 — modération des soumissions : `GET /movies?status=all` protégé (admin/super-admin uniquement), UI d'approbation/rejet vérifiée fonctionnelle E2E (commit `32fb4ee`)
- [x] PBI 011 — i18n de la table de modération : statuts/en-têtes/titres de boutons câblés sur `t()` au lieu de texte français codé en dur ; 2 tests Playwright corrigés pour forcer la langue explicitement (non commité)
- [x] Nettoyage dette : suppression du test vacueusement vert `Admin Flow: Moderation Actions (Approve, Reject)` (`e2e.spec.ts`) — redondant et dangereux (mutation d'état partagé), entièrement couvert par `submission-moderation.spec.ts` ; 24 → 23 tests, aucune perte de couverture réelle (non commité)

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
