# product_backlog.md — MarsAI

Suivi d'avancement des PBI produit. Ce fichier ne documente que l'état d'avancement — pas les spécifications détaillées (voir historique Git / conversations pour le détail de chaque PBI).

## Terminés

| PBI | Résumé | Commit | Statut push |
|---|---|---|---|
| 001-008 | Statistiques admin, persistance branding, gestion jury, refonte soumission film | `ae51ecc` | ✅ pushé |
| 009 | Compteur de soumissions par festival (super-admin) + nom du réalisateur (jury) | `cc07b71` | ✅ pushé |
| — | Fix données factices dashboards admin/super-admin (`AdminSidebar`, `SuperAdminDashboard`) | `d92af8f` | ✅ pushé |
| 010 | Modération des soumissions — fuite de confidentialité corrigée (`GET /movies?status=all` public) ; UI d'approbation/rejet déjà existante vérifiée fonctionnelle E2E | `32fb4ee` | ✅ commité, validé, en attente de push |
| 011 | i18n de la table de modération — statuts/en-têtes/titres de boutons câblés sur `t()` au lieu de texte codé en dur ; 2 tests Playwright corrigés (langue non forcée) + suppression d'un test redondant/vacueux | `1d05f62` | ✅ commité, validé, en attente de push |
| 012 | Inscription (`/register`) — label "Save" mal câblé sur le champ de confirmation du mot de passe, corrigé ; parcours jusqu'ici sans aucune couverture Playwright, 2 tests ajoutés | `4c06934` | ✅ commité, validé, en attente de push |
| 013 | Page de succès de soumission (`/success`) — paragraphe de description codé en dur en français, corrigé ; seule l'URL était vérifiée jusqu'ici, 1 test ajouté (contenu FR + EN) | `5777b51` | ✅ commité, validé, en attente de push |
| 014 | Statut festival "À venir" (super-admin) — option non persistable (reliquat de mock jamais nettoyé après branchement API réelle), UI alignée sur les 2 états réels du backend, 1 test ajouté (round-trip) | `7094c74` | ✅ commité, validé, en attente de push |
| 015 | Galerie d'accueil (`VideoSection.tsx`) sans traduction anglaise — titre, chargement, erreur, vide, compteur, placeholder de recherche codés en dur en français ; même défaut corrigé dans `JuryDashboard.tsx` ; 1 test ajouté (FR + EN) | non commité | ⏳ en attente de validation |

## Chantier dette technique (2026-07-07, clos, pas encore pushé)

6 commits de dette technique (TSC, sécurité, RBAC, code mort) sont prêts localement mais **pas encore pushés** (voir `PROJECT_STATE.md`).

## Hors V1 — voir ROADMAP_V2.md

Deux vrais bugs trouvés pendant l'audit du PBI 014 (lien "Mot de passe oublié" mort, liens légaux du footer vers `#`) ont été évalués comme non indispensables au MVP défini par `AGENTS.md` — aucun des deux ne conditionne un parcours produit requis (accueil, galerie, soumission, auth, rôles, vote, admin/super-admin, i18n, YouTube, collaborateurs). Détail et justification dans `ROADMAP_V2.md`, pas seulement dans `PROJECT_STATE.md`.

## Prochain PBI

Non décidé. Méthode : code actuel + historique Git + `PROJECT_STATE.md`/`product_backlog.md` comme sources de vérité (pas `AGENTS.md`, qui décrit des règles de dev, pas le périmètre produit). Routes ambiguës `/movies`/`/collaborators`/`/directors`, `CLAUDE.md` et revue sécurité plus large restent en pause (demande explicite de l'utilisateur).
