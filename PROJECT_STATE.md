# PROJECT_STATE.md — MarsAI

Dernière mise à jour : 2026-07-08 (session en cours).

## Où on en est

MVP fonctionnel, testé E2E (29 tests Playwright, tous verts). Les PBI produit 001-009 sont terminés et pushés sur `origin/main`.

Le chantier de dette technique du 2026-07-07 (sécurité backend, TSC, RBAC, code mort) est clos et vérifié, mais **pas encore pushé** (6 commits locaux).

**Correction de méthode (2026-07-08, x2)** : `AGENTS.md` décrit des règles de développement, pas le périmètre du backlog produit. Les sources de vérité sont le code actuel, l'historique Git, `PROJECT_STATE.md`, `product_backlog.md` et les décisions produit documentées — que ce soit pour identifier le prochain PBI, ou pour justifier qu'une fonctionnalité trouvée est hors MVP (`ROADMAP_V2.md` a été reformulé en conséquence, voir commit `62b5cda`).

Le cycle PBI produit a repris le 2026-07-08 :
- **PBI 010 — modération des soumissions** : l'UI d'approbation/rejet dans `/admin` existait déjà et était déjà câblée à de vraies routes (pas un mock décoratif) ; le vrai trou fonctionnel identifié était une faille de confidentialité (`GET /movies?status=all` public, exposant les soumissions pending/rejected à n'importe qui). Corrigée et **commitée** (`32fb4ee`), validée par l'utilisateur.
- **PBI 011 — i18n de la table de modération** : `SubmissionsTable`/`TabsListContainer` recevaient déjà un prop `t` mais ne l'utilisaient jamais ; statuts, en-têtes et titres de boutons étaient codés en dur en français. Corrigé en réutilisant les clés `common.pending/validated/rejected` existantes + 8 nouvelles clés `admin.submissions.*`. Nettoyage immédiat associé : suppression du test `Admin Flow: Moderation Actions` vacueusement vert et redondant. **Commitée** (`1d05f62`), validée par l'utilisateur.
- **PBI 012 — inscription (`/register`)** : parcours jamais couvert par un test Playwright, jamais retouché depuis l'import initial du monorepo (aucun historique Git). Vérification en navigateur : le champ de confirmation du mot de passe affichait le label **"Save"** (`t('common.save')`) au lieu de "Confirmer le mot de passe" — vrai bug UX, pas une fonctionnalité manquante. Corrigé + 2 tests Playwright ajoutés (mismatch bloqué, inscription réussie → connexion auto → redirection `/`). **Commitée** (`4c06934`), validée par l'utilisateur.
- **PBI 013 — page de succès de soumission (`/success`)** : son URL était vérifiée par les tests existants mais jamais son contenu. Le titre utilisait `t('submit.success')` correctement, mais le paragraphe de description entier était codé en dur en français — un utilisateur en anglais voyait une page mi-anglaise mi-française juste après avoir soumis son film. Corrigé (nouvelle clé `submit.success.description`) + test Playwright ajouté (contenu vérifié en FR et EN, bouton retour à l'accueil). **Commitée** (`5777b51`), validée par l'utilisateur.
- **PBI 014 — statut festival "À venir" non persistable (super-admin)** : trouvé en lisant le code (`SuperAdminDashboard.tsx`, `EditFestivalDialog.tsx`) — trois options de statut proposées (Actif / À venir / Archivé) mais la base ne stocke que 2 valeurs (`enum('Actif','Inactif')`). Choisir "À venir" et enregistrer sauvegardait silencieusement `Inactif`, et après rechargement le festival réapparaissait "Archivé" — pire que la "simplification acceptée" déjà notée dans ce document, car le choix ne survit jamais à un rechargement. Origine : reliquat de l'UI mock d'avant `d92af8f` (3 festivals fictifs), jamais nettoyé quand cette UI a été branchée sur l'API réelle. Corrigé en alignant le frontend sur les 2 états réels du backend (suppression de l'option "À venir" du select et du type, correction de l'état optimiste de création, remplacement de la stat "Festivals à Venir" — toujours à 0 — par "Festivals Archivés"). Test Playwright ajouté (round-trip Actif→Archivé→Actif après rechargement, restaure l'état pour ne pas casser les tests suivants). **Commitée** (`7094c74`), validée par l'utilisateur. Les deux autres bugs trouvés pendant le même audit (lien "Mot de passe oublié" mort, liens légaux du footer vers `#`) ont été évalués comme non indispensables au MVP et déplacés vers `ROADMAP_V2.md` — voir cette section plus bas, ils ne sont plus documentés seulement ici.
- **PBI 015 — galerie d'accueil sans traduction anglaise** : `VideoSection.tsx` (le composant central du produit — c'est la galerie de films de la page d'accueil) n'avait **aucun** appel `t()` : titre "Films en Compétition", états de chargement/erreur/vide, et le compteur de films sélectionnés étaient 100% codés en dur en français ; le placeholder de la barre de recherche appelait bien `t('search.placeholder', 'Rechercher un film...')` mais la clé n'existait dans aucun des deux fichiers de traduction, donc retombait toujours sur le texte français par défaut. Un utilisateur basculant en anglais voyait la page d'accueil rester en français partout sauf la navbar/footer. Même défaut trouvé dans `JuryDashboard.tsx` (état de chargement identique, plus deux messages d'erreur). Corrigé : 8 nouvelles clés (`gallery.*`, `search.placeholder`, `jury.error.*`) câblées dans les deux fichiers. Ajout de `tests/gallery-i18n.spec.ts` : titre, placeholder de recherche et compteur vérifiés en FR puis en EN. **Commitée** (`5d38aeb`), validée par l'utilisateur.
- **PBI 016 — clés i18n manquantes affichées brutes dans le footer** : `Footer.tsx` appelle `t('footer.about')` et `t('footer.contact')`, mais ces deux clés n'existaient dans **aucun** des deux fichiers de traduction. Sans clé et sans `defaultValue`, i18next affiche la clé elle-même comme texte — confirmé en dumpant le texte réel du footer en navigateur : `"...Jury\nfooter.about\nLegal\n...GDPR\nfooter.contact\ncontact@marsai.fr..."`. Le footer étant présent sur toutes les pages, c'est le bug le plus visible trouvé cette session (littéralement du texte `footer.xxx` affiché à chaque utilisateur, dans les deux langues). Corrigé : ajout de `footer.about`/`footer.contact` dans `fr.json`/`en.json`. Ajout de `tests/footer-i18n.spec.ts` : vérifie qu'aucune clé brute (`footer.`) n'apparaît dans le texte du footer, en FR et en EN — garde-fou générique contre toute clé manquante future dans ce composant, pas seulement ces deux-là. **Travail non commité, en attente de validation.**

## Commits locaux non pushés (14)

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
10. `5777b51` — fix: hardcoded French paragraph on submission success page (PBI 013)
11. `7094c74` — fix: festival "upcoming" status silently degraded to "archived" (PBI 014)
12. `a9309c5` — docs: create ROADMAP_V2, move non-MVP findings out of PROJECT_STATE
13. `5d38aeb` — fix: home gallery had no English translation at all (PBI 015)
14. `62b5cda` — docs: base V2 justification on the backlog, not AGENTS.md

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

## PBI 013 terminé (2026-07-08, commit `5777b51`, validé)

Page de succès de soumission (`/success`). Analyse : son URL était bien vérifiée par 3 tests existants (`e2e.spec.ts`, `submission-collaborators.spec.ts`) — mais jamais son **contenu**. Lecture du composant : le titre utilisait correctement `t('submit.success')`, mais le paragraphe de description entier (`"Merci d'avoir participé à l'aventure marsAI..."`) était codé en dur en français juste en dessous, sans clé i18n. Un utilisateur ayant basculé en anglais voyait donc une page de confirmation mi-anglaise mi-française immédiatement après avoir soumis son film — le moment le plus visible du parcours de soumission. Correction : nouvelle clé `submit.success.description` (`fr.json`/`en.json`, aucune clé existante ne convenait) câblée dans `Success.tsx`. Ajout de `tests/submission-success.spec.ts` : contenu complet vérifié en français puis en anglais (bascule de langue), plus le bouton de retour à l'accueil.

## PBI 014 terminé (2026-07-08, commit `7094c74`, validé)

Statut festival "À venir" non persistable (super-admin). Analyse (code + `git show d92af8f`) : `EditFestivalDialog.tsx` proposait 3 statuts (Actif / À venir / Archivé), reliquat d'une UI mock (3 festivals fictifs) jamais nettoyée quand `d92af8f` a branché le dashboard sur l'API réelle — la base ne stocke que `enum('Actif','Inactif')`. Choisir "À venir" et enregistrer sauvegardait silencieusement `Inactif`, et après rechargement le festival redevenait "Archivé" : plus grave que la simple approximation de lecture déjà notée en dette technique, c'est une perte de choix silencieuse à l'écriture. La stat "Festivals à Venir" du tableau de bord était structurellement toujours à 0 pour la même raison. Corrigé en alignant le frontend sur les 2 états réels : suppression de l'option "À venir" (`EditFestivalDialog.tsx`, type `FestivalInstance` dans `CreateFestivalForm.tsx`), état optimiste de création corrigé (`SuperAdminDashboard.tsx`, `'upcoming'` → `'archived'` pour ne pas mentir avant le prochain rechargement), stat remplacée par "Festivals Archivés" (`CMSStatsGrid.tsx`). Ajout de `tests/festival-status.spec.ts` : confirme que seuls 2 statuts sont proposés, vérifie la persistance après rechargement dans les deux sens (Actif→Archivé→Actif), et restaure l'état initial pour ne pas affecter les tests suivants (un seul festival existe dans les données de seed).

Deux autres bugs trouvés pendant le même audit ont été classés **hors V1** (voir `ROADMAP_V2.md` pour le détail et la justification, ils ne sont plus décrits ici) : lien "Mot de passe oublié" mort dans `Login.tsx`, liens légaux du footer vers `#` dans `Footer.tsx`.

## PBI 015 terminé (2026-07-08, commit `5d38aeb`, validé)

Galerie d'accueil sans traduction anglaise. Analyse : `VideoSection.tsx` est le composant central du produit (la galerie de films sur `/`) et n'avait **aucun** appel `t()` — titre, états de chargement/erreur/vide, compteur de films sélectionnés, tout était codé en dur en français. Le placeholder de recherche (`SearchBar.tsx`) appelait bien `t('search.placeholder', 'Rechercher un film...')`, mais la clé `search.placeholder` n'existait dans aucun des deux fichiers de traduction, donc `i18next` retombait systématiquement sur la valeur par défaut française, même en anglais. Un utilisateur basculant en anglais voyait donc la navbar/footer traduits mais la galerie elle-même rester intégralement en français. Même défaut, même texte de chargement, trouvé dans `JuryDashboard.tsx` (plus deux messages d'erreur hardcodés). Correction : 8 nouvelles clés (`gallery.title`, `gallery.loading`, `gallery.error`, `gallery.empty`, `gallery.selected_count`, `search.placeholder`, `jury.error.no_films`, `jury.error.connection`) dans `fr.json`/`en.json`, câblées dans les deux composants ; `gallery.loading` réutilisée dans `JuryDashboard.tsx` plutôt que dupliquée. Ajout de `tests/gallery-i18n.spec.ts` : titre, placeholder de recherche et compteur de films vérifiés en français puis en anglais.

## PBI 016 terminé (2026-07-08, non commité)

Clés i18n manquantes affichées brutes dans le footer. Analyse : `Footer.tsx` appelle `t('footer.about')` et `t('footer.contact')` sans `defaultValue`, mais ni `fr.json` ni `en.json` ne définissaient ces deux clés. Comportement par défaut d'i18next sans clé trouvée : afficher la clé elle-même. Confirmé en dumpant le texte réel du footer via Playwright : `"...Jury\nfooter.about\nLegal\n...GDPR\nfooter.contact\ncontact@marsai.fr..."` — présent sur toutes les pages, dans les deux langues, donc le bug le plus visible trouvé cette session. Correction : ajout de `footer.about`/`footer.contact` dans les deux fichiers de traduction (Footer.tsx n'a pas eu besoin d'être modifié, les appels `t()` existaient déjà). Ajout de `tests/footer-i18n.spec.ts` : vérifie qu'aucun texte contenant `footer.` n'apparaît dans le footer rendu, en FR et en EN — détecte toute clé manquante future dans ce composant, pas seulement ces deux-là.

## Dette technique restante (connue, non bloquante)

- `POST /movies`, `/collaborators`, `/directors` : authentifiées (`verifyToken`) mais sans contrôle de rôle — aucune UI frontend ne les appelle actuellement, donc pas de rôle "évident" à leur assigner sans deviner.
- Tokens JWT émis avant le déploiement RBAC n'ont pas de champ `role` — se résout naturellement à la reconnexion (expiration 2h), pas un bug.
- Jointure `festival→submissionsCount` (via `user.email = director.email`) reste fragile (pas de FK, correspondance texte) — acceptée faute de meilleure option vu le schéma actuel.
- `CLAUDE.md` section "État connu (juillet 2026)" contient des affirmations **obsolètes**, découvertes lors de l'audit de cette session (voir `docs/decisions.md`). Correction reportée à une phase de documentation globale, décision explicite de l'utilisateur.

## Prochain PBI (non décidé)

Candidats hors scope pour l'instant (mis en pause explicitement par l'utilisateur) :
1. Statuer sur les routes ambiguës (`POST /movies`, `/collaborators`, `/directors`).
2. Phase de documentation globale pour corriger `CLAUDE.md`.
3. Revue sécurité plus large (`security-reviewer`).

Voir `ROADMAP_V2.md` pour les évolutions non indispensables au MVP identifiées mais non planifiées (mot de passe oublié, pages légales).

## Environnement de dev (rappel)

- `docker compose up -d` (MySQL → 3310, backend → 3002) ou backend local via `npm run dev` (le conteneur `marsai_backend` Docker était cassé en cours de session — image jamais reconstruite après les derniers changements de code, `dist/server.js` manquant — non retouché, hors scope). Utilisé pour vérifier le PBI 010 : `DB_HOST=localhost DB_PORT=3310 DB_USER=user DB_PASSWORD=password DB_NAME=marsai JWT_SECRET=marsai_secret_key_12345 PORT=3002 npm run dev`.
- Frontend : `cd marsai_frontend && npm run dev` (→ 5173).
- Comptes démo (mdp `password123`) : `jean.dupont@email.com` (admin), `marie.curie@email.com` (jury), `albert.einstein@email.com` (user), `ada.lovelace@email.com` (super-admin).
