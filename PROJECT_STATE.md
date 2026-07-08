# PROJECT_STATE.md — MarsAI

Dernière mise à jour : 2026-07-08 (session en cours).

## Où on en est

MVP fonctionnel, testé E2E (26 tests Playwright, tous verts). Les PBI produit 001-009 sont terminés et pushés sur `origin/main`.

Le chantier de dette technique du 2026-07-07 (sécurité backend, TSC, RBAC, code mort) est clos et vérifié, mais **pas encore pushé** (6 commits locaux).

Le cycle PBI produit a repris le 2026-07-08 :
- **PBI 010 — modération des soumissions** : l'UI d'approbation/rejet dans `/admin` existait déjà et était déjà câblée à de vraies routes (pas un mock décoratif) ; le vrai trou fonctionnel identifié était une faille de confidentialité (`GET /movies?status=all` public, exposant les soumissions pending/rejected à n'importe qui). Corrigée et **commitée** (`32fb4ee`), validée par l'utilisateur.
- **PBI 011 — i18n de la table de modération** : `SubmissionsTable`/`TabsListContainer` recevaient déjà un prop `t` mais ne l'utilisaient jamais ; statuts, en-têtes et titres de boutons étaient codés en dur en français. Corrigé en réutilisant les clés `common.pending/validated/rejected` existantes + 8 nouvelles clés `admin.submissions.*`. Nettoyage immédiat associé : suppression du test `Admin Flow: Moderation Actions` vacueusement vert et redondant. **Commitée** (`1d05f62`), validée par l'utilisateur.
- **PBI 012 — inscription (`/register`)** : parcours explicitement requis par `AGENTS.md`, jamais couvert par un test Playwright, jamais retouché depuis l'import initial du monorepo (aucun historique Git). Vérification en navigateur : le champ de confirmation du mot de passe affichait le label **"Save"** (`t('common.save')`) au lieu de "Confirmer le mot de passe" — vrai bug UX, pas une fonctionnalité manquante. Corrigé + 2 tests Playwright ajoutés (mismatch bloqué, inscription réussie → connexion auto → redirection `/`). **Commitée** (`4c06934`), validée par l'utilisateur.
- **PBI 013 — page de succès de soumission (`/success`)** : flux explicitement requis par `AGENTS.md` ("submit final", "message succès"), URL vérifiée par les tests existants mais jamais son contenu. Le titre utilisait `t('submit.success')` correctement, mais le paragraphe de description entier était codé en dur en français — un utilisateur en anglais voyait une page mi-anglaise mi-française juste après avoir soumis son film. Corrigé (nouvelle clé `submit.success.description`) + test Playwright ajouté (contenu vérifié en FR et EN, bouton retour à l'accueil). **Travail non commité, en attente de validation.**

## Commits locaux non pushés (9)

Sur `main`, en avance sur `origin/main` :

1. `03de953` — fix: auth manquante sur routes mutantes festival/movie/collaborator/director
2. `1337c47` — fix: fuite de hash de mot de passe bcrypt sur `/users` (critique, corrigée)
3. `cf6cfb5` — fix: résolution des 29 erreurs TSC préexistantes frontend (0 erreur restante, aucun changement de comportement runtime)
4. `39e6208` — chore: suppression code mort (`SubmissionCard.tsx`, `SubmissionsPanel.tsx`)
5. `c85eb01` — feat: RBAC minimal (rôle dans le JWT, middleware `requireRole`, routes évidentes protégées)
6. `cc10a32` — docs: close out session — project state, tasks, decisions, backlog progress
7. `32fb4ee` — fix: require admin role to list unmoderated (pending/rejected) submissions (PBI 010)
8. `1d05f62` — feat: wire i18n in submissions moderation table, drop vacuous test (PBI 011 + nettoyage)
9. `4c06934` — fix: mislabeled confirm-password field on registration, add E2E coverage (PBI 012)

**Chacun a été vérifié individuellement** : build + lint (backend et/ou frontend selon pertinence), `tsc --noEmit` (0 erreur depuis `cf6cfb5`), suite Playwright complète, vérifications manuelles ciblées (curl par rôle, scripts Playwright jetables supprimés après usage).

⚠️ **Ne jamais pousser ces commits sans validation explicite de l'utilisateur** — règle rappelée à chaque fin de cycle dans cette session, aucune exception.

## PBI produit terminés (pushés sur origin/main)

- PBI 001-008 (commit `ae51ecc`) : statistiques admin, persistance branding, gestion jury, refonte soumission film.
- PBI 009 (commit `cc07b71`) : compteur de soumissions par festival (super-admin), nom du réalisateur affiché côté jury.
- Fix données factices dashboards admin/super-admin (commit `d92af8f`) : `AdminSidebar` et `SuperAdminDashboard` utilisaient des festivals codés en dur ; branchés sur `/festivals` réel.

## PBI 010 terminé (2026-07-08, commit `32fb4ee`, validé)

Modération des soumissions. Analyse : l'UI (`SubmissionsTable`, `TabsListContainer`) et les routes (`PUT /movies/:id`) existaient déjà et fonctionnaient réellement (pas un mock). Le vrai trou : `GET /movies?status=all` n'avait aucune protection, donc n'importe quel visiteur anonyme pouvait lister les soumissions `pending`/`rejected` (titre, synopsis, nom du réalisateur) avant modération. Correction : `marsai_backend/src/routes/movie.router.ts` — nouvelle garde `requireModerationAccess` qui laisse la galerie publique ouverte (pas de `status`, ou `status=approved`) mais exige `verifyToken` + `requireRole(['admin','super-admin'])` dès que `status` est fourni avec une autre valeur. Vérifié par curl (401 anonyme, 403 rôle user, 200 admin) et par un nouveau test Playwright (`tests/submission-moderation.spec.ts`) qui approuve une soumission fraîchement créée et vérifie sa réapparition dans la galerie publique, en plus de la régression 401/403.

## PBI 011 terminé (2026-07-08, commit `1d05f62`, validé)

i18n de la table de modération. Analyse : `SubmissionsTable.tsx` déclarait déjà un prop `t` (fonction de traduction) sans jamais l'utiliser — en-têtes de colonnes, titres de boutons et badges de statut étaient codés en dur en français dans `SubmissionsTable.tsx` et `TabsListContainer.tsx` (`getStatusBadge`), en violation de la règle i18n d'`AGENTS.md`. Correction : réutilisation des clés existantes `common.pending`/`common.validated`/`common.rejected` pour les badges, ajout de 8 nouvelles clés `admin.submissions.column.*` / `admin.submissions.preview|approve|reject` dans `fr.json`/`en.json`, câblage du prop `t` déjà présent. Effet de bord découvert et corrigé : la locale par défaut d'un navigateur/contexte de test neuf (`navigator.language`) est l'anglais, pas le français — deux tests Playwright préexistants présumaient silencieusement le français sans le forcer ; ils passaient par accident car le texte était figé en dur. Corrigés pour forcer explicitement le français, comme le fait déjà le reste de la suite. Nettoyage immédiat associé dans le même commit : `Admin Flow: Moderation Actions (Approve, Reject)` (`e2e.spec.ts`) analysé — vacueusement vert (`if isVisible` silencieux sur un locator à 0 résultat, jamais force la langue), mutait un vrai film de seed en `approved` sans le restaurer (effet de bord non déterministe), entièrement redondant avec `submission-moderation.spec.ts` (déterministe). **Supprimé plutôt que réécrit.**

## PBI 012 terminé (2026-07-08, commit `4c06934`, validé)

Inscription (`/register`). Analyse : parcours explicitement requis par `AGENTS.md` ("inscription" dans la checklist de vérification navigateur obligatoire), mais **zéro couverture Playwright** et aucun historique Git (fichier jamais retouché depuis l'import initial du monorepo — `git log --follow` ne montre rien). Vérification en navigateur (`page.locator('label').allInnerTexts()`) : les 5 labels du formulaire étaient `First Name / Last Name / Email / Password / Save` — le champ de confirmation du mot de passe affichait **"Save"** (`t('common.save')`) au lieu de "Confirmer le mot de passe". Vrai bug UX sur un parcours jamais vérifié, pas une fonctionnalité manquante (le backend `/auth/register` et la validation zod — dont le message `errors.passwords_dont_match` — fonctionnaient déjà correctement). Correction : nouvelle clé `register.confirm_password` (`fr.json`/`en.json`, aucune clé existante ne convenait) câblée dans `Register.tsx`. Ajout de `tests/register.spec.ts` (2 tests, jusqu'ici absent) : mismatch de mot de passe bloqué avec message d'erreur visible, inscription réussie → connexion automatique → redirection `/` → token en localStorage.

## PBI 013 terminé (2026-07-08, non commité)

Page de succès de soumission (`/success`). Analyse : flux explicitement requis par `AGENTS.md` ("submit final", "message succès"), et son URL était bien vérifiée par 3 tests existants (`e2e.spec.ts`, `submission-collaborators.spec.ts`) — mais jamais son **contenu**. Lecture du composant : le titre utilisait correctement `t('submit.success')`, mais le paragraphe de description entier (`"Merci d'avoir participé à l'aventure marsAI..."`) était codé en dur en français juste en dessous, sans clé i18n. Un utilisateur ayant basculé en anglais voyait donc une page de confirmation mi-anglaise mi-française immédiatement après avoir soumis son film — le moment le plus visible du parcours de soumission. Correction : nouvelle clé `submit.success.description` (`fr.json`/`en.json`, aucune clé existante ne convenait) câblée dans `Success.tsx`. Ajout de `tests/submission-success.spec.ts` : contenu complet vérifié en français puis en anglais (bascule de langue), plus le bouton de retour à l'accueil.

## Dette technique restante (connue, non bloquante)

- `POST /movies`, `/collaborators`, `/directors` : authentifiées (`verifyToken`) mais sans contrôle de rôle — aucune UI frontend ne les appelle actuellement, donc pas de rôle "évident" à leur assigner sans deviner.
- Tokens JWT émis avant le déploiement RBAC n'ont pas de champ `role` — se résout naturellement à la reconnexion (expiration 2h), pas un bug.
- Mapping de statut festival frontend (`'active'|'upcoming'|'archived'`) vs backend (`'Actif'|'Inactif'`) : simplification introduite au cycle précédent (`Inactif`→`archived` faute de concept "upcoming" côté backend).
- Jointure `festival→submissionsCount` (via `user.email = director.email`) reste fragile (pas de FK, correspondance texte) — acceptée faute de meilleure option vu le schéma actuel.
- `CLAUDE.md` section "État connu (juillet 2026)" contient des affirmations **obsolètes**, découvertes lors de l'audit de cette session (voir `docs/decisions.md`). Correction reportée à une phase de documentation globale, décision explicite de l'utilisateur.

## Prochain PBI (non décidé)

Candidats produit (backlog V1, priorité actuelle) :
1. Continuer l'audit systématique du reste de la checklist `AGENTS.md` (ex. flux jury/admin non encore passés au crible comme `/register` l'a été) pour trouver le prochain vrai trou fonctionnel.

Candidats hors scope pour l'instant (mis en pause explicitement par l'utilisateur) :
2. Statuer sur les routes ambiguës (`POST /movies`, `/collaborators`, `/directors`).
3. Phase de documentation globale pour corriger `CLAUDE.md`.
4. Revue sécurité plus large (`security-reviewer`).

## Environnement de dev (rappel)

- `docker compose up -d` (MySQL → 3310, backend → 3002) ou backend local via `npm run dev` (le conteneur `marsai_backend` Docker était cassé en cours de session — image jamais reconstruite après les derniers changements de code, `dist/server.js` manquant — non retouché, hors scope). Utilisé pour vérifier le PBI 010 : `DB_HOST=localhost DB_PORT=3310 DB_USER=user DB_PASSWORD=password DB_NAME=marsai JWT_SECRET=marsai_secret_key_12345 PORT=3002 npm run dev`.
- Frontend : `cd marsai_frontend && npm run dev` (→ 5173).
- Comptes démo (mdp `password123`) : `jean.dupont@email.com` (admin), `marie.curie@email.com` (jury), `albert.einstein@email.com` (user), `ada.lovelace@email.com` (super-admin).
