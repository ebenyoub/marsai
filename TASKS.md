# TASKS.md — MarsAI

## En attente de décision utilisateur

- [ ] **Push des 14 commits locaux** (`03de953`..`62b5cda`) + du travail PBI 016 (non commité) vers `origin/main` — attend validation explicite. Voir `PROJECT_STATE.md`.
- [ ] **Choisir le prochain PBI** (voir propositions dans `PROJECT_STATE.md`).

## Dette technique identifiée, non traitée (volontairement)

- [ ] Assigner un rôle à `POST /movies`, `/collaborators`, `/directors` **si** une UI frontend vient à les appeler un jour — sinon laisser en authentification simple.
- [ ] Corriger `CLAUDE.md` section "État connu (juillet 2026)" (obsolète — voir `docs/decisions.md` du 2026-07-07) lors de la phase de documentation globale annoncée par l'utilisateur.
- [ ] Conteneur Docker `marsai_backend` toujours cassé (`dist/server.js` manquant, image jamais reconstruite) — contournement : backend lancé en local (`npm run dev`) pointé sur MySQL Docker (port 3310) pour la vérification des PBI 010-016.

## Hors V1 (voir ROADMAP_V2.md)

- [ ] Réinitialisation de mot de passe — lien mort dans `Login.tsx`, nécessite un choix d'infra email.
- [ ] Pages légales du footer — liens vers `#` dans `Footer.tsx`, nécessitent du contenu réel.

## Terminé cette session (2026-07-08)

- [x] PBI 010 — modération des soumissions : `GET /movies?status=all` protégé (admin/super-admin uniquement), UI d'approbation/rejet vérifiée fonctionnelle E2E (commit `32fb4ee`)
- [x] PBI 011 — i18n de la table de modération : statuts/en-têtes/titres de boutons câblés sur `t()` au lieu de texte français codé en dur ; 2 tests Playwright corrigés pour forcer la langue explicitement ; suppression du test vacueusement vert `Admin Flow: Moderation Actions` (commit `1d05f62`)
- [x] PBI 012 — inscription (`/register`) : label "Save" mal câblé sur le champ de confirmation du mot de passe (`common.save` au lieu d'une vraie clé), corrigé ; ajout de `tests/register.spec.ts` (mismatch + inscription complète), parcours jusqu'ici sans aucune couverture Playwright (commit `4c06934`)
- [x] PBI 013 — page de succès de soumission (`/success`) : paragraphe de description codé en dur en français (page mi-anglaise mi-française en langue EN), corrigé ; ajout de `tests/submission-success.spec.ts` (contenu vérifié FR + EN), seule l'URL était vérifiée jusqu'ici (commit `5777b51`)
- [x] PBI 014 — statut festival "À venir" (super-admin) : option de statut non persistable (reliquat de mock jamais nettoyé), corrigée en alignant l'UI sur les 2 états réels du backend ; ajout de `tests/festival-status.spec.ts` (round-trip après rechargement) (commit `7094c74`)
- [x] PBI 015 — galerie d'accueil (`VideoSection.tsx`) sans traduction anglaise (titre, chargement, erreur, vide, compteur, placeholder de recherche) ; même défaut corrigé dans `JuryDashboard.tsx` ; ajout de `tests/gallery-i18n.spec.ts` (commit `5d38aeb`)
- [x] PBI 016 — clés `footer.about`/`footer.contact` manquantes, affichées brutes sur toutes les pages ; corrigé ; ajout de `tests/footer-i18n.spec.ts` (garde-fou générique) (non commité)
- [x] Création de `ROADMAP_V2.md` : réinitialisation de mot de passe et pages légales du footer déplacées hors `PROJECT_STATE.md` avec justification (commit `a9309c5`) ; reformulé pour se baser sur le backlog plutôt qu'`AGENTS.md` (commit `62b5cda`)

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
