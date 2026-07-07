# MarsAI — mémoire projet

Plateforme web de festival de courts-métrages IA. Monorepo : `marsai_backend/` (Express 5 + TS + MySQL) et `marsai_frontend/` (React 19 + Vite + Tailwind 4 + i18next FR/EN).

## Commandes et accès

- Lancer : `docker compose up -d` (MySQL → **3310**, backend → **3002**), puis `cd marsai_frontend && npm run dev` (→ 5173).
- Comptes démo (mot de passe **`password123`** pour tous) : `jean.dupont@email.com` (admin), `marie.curie@email.com` (jury), `albert.einstein@email.com` (user), `ada.lovelace@email.com` (super-admin).
- Builds : `npm run build` dans chaque dossier. Lint : `npm run lint`. Pas de script `typecheck` (utiliser `npx tsc --noEmit`).
- La base est recréée à chaque `docker compose down && up` (pas de volume de données) — les seeds SQL sont la source de vérité.

## État connu (juillet 2026)

- MVP fonctionnel et testé E2E : galerie, détail film, auth JWT, tunnel de soumission 5 étapes (`POST /api/submissions`, multer), vote jury (upsert).
- Dette assumée : soumissions créées en `approved` (pas d'UI de modération) ; dashboards admin/super-admin décoratifs (aucun appel API) ; ~88 erreurs `tsc --noEmit` préexistantes côté frontend (le build Vite passe) ; `/rating` sans verifyToken ; pas de garde de rôle sur `/jury`, `/admin`, `/superadmin` ; `PUT /movies/:id` cassé (`updated_at` inexistant).
- Le dossier **est un dépôt git** (`origin` sur GitHub, branche `main`). `AGENTS.md` est historique (pré-MVP) : ne pas suivre ses instructions "restaurer depuis git".
- ⚠️ La liste de dette ci-dessus contient des points obsolètes découverts le 2026-07-07 (voir `docs/decisions.md`) — correction reportée à une phase de documentation globale, ne pas s'y fier sans revérifier dans le code. Voir `PROJECT_STATE.md` pour l'état réel et à jour.

## Règles

- Jamais de refonte d'architecture ni de simplification du produit (rôles, i18n, vote, soumission, collaborateurs sont intouchables).
- Petites étapes vérifiables ; après toute modification : build + test réel du flux touché (un build qui passe ne prouve pas que le produit marche).

## Routage (orchestration)

La session principale est l'orchestrateur : elle choisit, lance et agrège. Déléguer à un sous-agent seulement si la tâche est longue, isolée ou parallélisable — pour une correction de 2 minutes, rester inline (un sous-agent démarre à froid et coûte plus cher).

| Tâche | Agent (`.claude/agents/`) | Skill associée |
|---|---|---|
| Erreurs de build / compilation / lint | build-guardian | /fix-build, /fix-typescript |
| API, SQL, modèles, routes backend | backend-engineer | /fix-api |
| UI, pages, hooks, formulaires React | frontend-engineer | /create-feature |
| Vérification E2E, Playwright, curl, DB | integration-tester | /run-tests |
| Docker, compose, VPS, Nginx, SSL | deployment-agent | /fix-docker, /deploy-vps |
| Audit sécurité (JWT, rôles, OWASP) | security-reviewer | /review-code |

Les agents ne communiquent jamais entre eux : chacun rend un rapport à l'orchestrateur, qui décide de la suite.
