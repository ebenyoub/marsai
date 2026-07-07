# PROJECT_STATE.md — MarsAI

Dernière mise à jour : 2026-07-07 (fin de session).

## Où on en est

MVP fonctionnel, testé E2E (22 tests Playwright, tous verts). Les PBI produit 001-009 sont terminés et pushés sur `origin/main`.

Depuis PBI 009, la session en cours a traité un **chantier de dette technique** (pivot demandé explicitement par l'utilisateur, hors cycle PBI produit) : sécurité backend (auth manquante, fuite de mot de passe), 29 erreurs TSC frontend, code mort, RBAC minimal. Ce chantier est terminé et vérifié, mais **pas encore pushé**.

## Commits locaux non pushés (5)

Sur `main`, en avance sur `origin/main` :

1. `03de953` — fix: auth manquante sur routes mutantes festival/movie/collaborator/director
2. `1337c47` — fix: fuite de hash de mot de passe bcrypt sur `/users` (critique, corrigée)
3. `cf6cfb5` — fix: résolution des 29 erreurs TSC préexistantes frontend (0 erreur restante, aucun changement de comportement runtime)
4. `39e6208` — chore: suppression code mort (`SubmissionCard.tsx`, `SubmissionsPanel.tsx`)
5. `c85eb01` — feat: RBAC minimal (rôle dans le JWT, middleware `requireRole`, routes évidentes protégées)

**Chacun a été vérifié individuellement** : build + lint (backend et/ou frontend selon pertinence), `tsc --noEmit` (0 erreur depuis `cf6cfb5`), 22/22 tests Playwright, vérifications manuelles ciblées (curl par rôle, scripts Playwright jetables supprimés après usage).

⚠️ **Ne jamais pousser ces commits sans validation explicite de l'utilisateur** — règle rappelée à chaque fin de cycle dans cette session, aucune exception.

## PBI produit terminés (pushés sur origin/main)

- PBI 001-008 (commit `ae51ecc`) : statistiques admin, persistance branding, gestion jury, refonte soumission film.
- PBI 009 (commit `cc07b71`) : compteur de soumissions par festival (super-admin), nom du réalisateur affiché côté jury.
- Fix données factices dashboards admin/super-admin (commit `d92af8f`) : `AdminSidebar` et `SuperAdminDashboard` utilisaient des festivals codés en dur ; branchés sur `/festivals` réel.

## Dette technique restante (connue, non bloquante)

- `POST /movies`, `/collaborators`, `/directors` : authentifiées (`verifyToken`) mais sans contrôle de rôle — aucune UI frontend ne les appelle actuellement, donc pas de rôle "évident" à leur assigner sans deviner.
- Tokens JWT émis avant le déploiement RBAC n'ont pas de champ `role` — se résout naturellement à la reconnexion (expiration 2h), pas un bug.
- Mapping de statut festival frontend (`'active'|'upcoming'|'archived'`) vs backend (`'Actif'|'Inactif'`) : simplification introduite au cycle précédent (`Inactif`→`archived` faute de concept "upcoming" côté backend).
- Jointure `festival→submissionsCount` (via `user.email = director.email`) reste fragile (pas de FK, correspondance texte) — acceptée faute de meilleure option vu le schéma actuel.
- `CLAUDE.md` section "État connu (juillet 2026)" contient des affirmations **obsolètes**, découvertes lors de l'audit de cette session (voir `docs/decisions.md`). Correction reportée à une phase de documentation globale, décision explicite de l'utilisateur.

## Prochain PBI (non décidé — proposition à valider demain)

Aucun choix n'est acté. Candidats raisonnables pour la reprise :
1. Reprendre le cycle PBI produit là où il s'était arrêté avant le pivot dette technique (cycle 3, max 3 PBI, même processus que les cycles précédents).
2. Statuer sur les routes ambiguës (`POST /movies`, `/collaborators`, `/directors`) si un rôle devient évident.
3. Lancer la "phase de documentation globale" annoncée pour corriger `CLAUDE.md`.
4. Revue sécurité plus large (`security-reviewer`) sur le reste du périmètre.

## Environnement de dev (rappel)

- `docker compose up -d` (MySQL → 3310, backend → 3002) ou backend local via `npm run dev` (le conteneur `marsai_backend` Docker était cassé en cours de session — image jamais reconstruite après les derniers changements de code, `dist/server.js` manquant — non retouché, hors scope).
- Frontend : `cd marsai_frontend && npm run dev` (→ 5173).
- Comptes démo (mdp `password123`) : `jean.dupont@email.com` (admin), `marie.curie@email.com` (jury), `albert.einstein@email.com` (user), `ada.lovelace@email.com` (super-admin).
