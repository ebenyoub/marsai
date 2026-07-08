# product_backlog.md — MarsAI

Suivi d'avancement des PBI produit. Ce fichier ne documente que l'état d'avancement — pas les spécifications détaillées (voir historique Git / conversations pour le détail de chaque PBI).

## Terminés

| PBI | Résumé | Commit | Statut push |
|---|---|---|---|
| 001-008 | Statistiques admin, persistance branding, gestion jury, refonte soumission film | `ae51ecc` | ✅ pushé |
| 009 | Compteur de soumissions par festival (super-admin) + nom du réalisateur (jury) | `cc07b71` | ✅ pushé |
| — | Fix données factices dashboards admin/super-admin (`AdminSidebar`, `SuperAdminDashboard`) | `d92af8f` | ✅ pushé |
| 010 | Modération des soumissions — fuite de confidentialité corrigée (`GET /movies?status=all` public) ; UI d'approbation/rejet déjà existante vérifiée fonctionnelle E2E | `32fb4ee` | ✅ commité, validé, en attente de push |
| 011 | i18n de la table de modération — statuts/en-têtes/titres de boutons câblés sur `t()` au lieu de texte codé en dur ; 2 tests Playwright corrigés (langue non forcée) + suppression d'un test redondant/vacueux | non commité | ✅ validé, en attente de commit |

## Chantier dette technique (2026-07-07, clos, pas encore pushé)

6 commits de dette technique (TSC, sécurité, RBAC, code mort) sont prêts localement mais **pas encore pushés** (voir `PROJECT_STATE.md`).

## Prochain PBI

Non décidé — candidats dans `PROJECT_STATE.md` (routes ambiguës `/movies` `/collaborators` `/directors`, phase de documentation globale `CLAUDE.md`, revue sécurité plus large).
