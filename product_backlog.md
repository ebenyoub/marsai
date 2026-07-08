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
| 015 | Galerie d'accueil (`VideoSection.tsx`) sans traduction anglaise — titre, chargement, erreur, vide, compteur, placeholder de recherche codés en dur en français ; même défaut corrigé dans `JuryDashboard.tsx` ; 1 test ajouté (FR + EN) | `5d38aeb` | ✅ commité, validé, en attente de push |
| 016 | Clés `footer.about`/`footer.contact` manquantes des deux fichiers de traduction, affichées brutes (`footer.about`, `footer.contact`) sur toutes les pages ; corrigé, 1 test ajouté (garde-fou générique contre toute clé manquante future) | `8bb2d0e` | ✅ commité, validé, en attente de push |
| 017 | Audit systématique des 306 appels `t()` du frontend — `admin.lastCheck` manquant (motif `t(x) || 'repli'` inefficace), `admin.systemStatus` mort, `submit.error` retombait en français en anglais, `CheckBox.tsx` jamais importé (supprimé) ; 1 test ajouté | `c761e60` | ✅ commité, validé, en attente de push |
| 018 | Écran de vote du jury (`FilmEvaluator.tsx`) presque entièrement codé en dur — clés `jury.ai.*`/`jury.rating.*` déjà présentes mais jamais câblées, réutilisées + ~20 nouvelles clés ; test `Jury Flow` existant corrigé (langue non forcée) ; 1 test ajouté | `a4cd982` | ✅ commité, en attente de validation |

## Chantier dette technique (2026-07-07, clos, pas encore pushé)

6 commits de dette technique (TSC, sécurité, RBAC, code mort) sont prêts localement mais **pas encore pushés** (voir `PROJECT_STATE.md`).

## Hors V1 — voir ROADMAP_V2.md

Deux vrais bugs trouvés pendant l'audit du PBI 014 (lien "Mot de passe oublié" mort, liens légaux du footer vers `#`) ont été évalués comme non indispensables au MVP : aucun PBI terminé listé ci-dessus, ni la description du MVP dans `PROJECT_STATE.md`, n'inclut l'un ou l'autre. Détail et justification dans `ROADMAP_V2.md`, pas seulement dans `PROJECT_STATE.md`.

## Backlog V1 non développé — revue fonctionnelle complète (2026-07-08, décisions produit officielles)

Rien n'est développé. Spécifications complètes ci-dessous, aucune information de la revue n'a été omise. Estimations : S (< 1/2 journée), M (1/2 à 1 journée), L (> 1 journée).

### P0 — bloquant MVP

| PBI | Résumé | Est. | Dépend de |
|---|---|---|---|
| 040 | **Fiabilité du vote jury (API + verrouillage backend)** — corriger l'erreur "API Error" rencontrée lors du vote ; vérifier que le vote est réellement enregistré en base ; puis rendre impossible toute modification d'un vote déjà soumis (verrouillage définitif côté serveur) | M | — |
| 041 | **UX post-vote jury** — dans la liste des vidéos : badge/icône verte sur les vidéos déjà votées ; après validation d'un vote : remplacer les `alert()` par une vraie modale de succès avec icône verte + message de confirmation ; verrouiller le vote côté UI : griser les notes, commentaire en lecture seule, bouton d'envoi désactivé, affichage clair "vote déjà enregistré" | M | 040 |
| 042 | **Login : soumission par Entrée** — appuyer sur Entrée après saisie email + mot de passe doit soumettre le formulaire ; vérifier que les boutons utilisent bien `type="submit"` | S | — |

### P1 — MVP

| PBI | Résumé | Est. | Dépend de |
|---|---|---|---|
| 035 | **Countdown Accueil** — compte à rebours pointé sur le 10/09/2026 09h00 ; texte "Bientôt" affichant le 09/09/2026 ; vérifier FR/EN de ces textes | S | — |
| 043 | **Page Vidéos** — la Home ne doit afficher qu'un extrait des vidéos ; créer une vraie page "Vidéos" contenant toutes les vidéos | M | — |
| 036 | **Page Événements + routage par connexion** — créer une vraie page événements ; actuellement "S'inscrire aux événements" redirige vers la création de compte même pour un utilisateur déjà connecté ; attendu : visiteur non connecté → redirection login/register, utilisateur connecté → accès direct à la page Événements, jamais de demande de création de compte à un utilisateur connecté | M | — |
| 037 | **Inscription aux événements** — afficher tous les événements existants avec le nombre de places restantes ; sélection d'un ou plusieurs événements ; vérifier les places disponibles ; inscrire l'utilisateur connecté ; empêcher la double inscription ; message de succès/erreur clair (ex. Conférence IA : 800 places) | L | 036 |
| 038 | **Événements inscrits sur la Home** — utilisateur connecté : afficher les événements auxquels il est inscrit + bouton "Se désinscrire" + conserver le bouton "S'inscrire aux événements" ; utilisateur non connecté : afficher seulement l'appel à l'inscription/connexion | M | 037 |
| 039 | **Désinscription événement** — depuis la Home et depuis la page Événements si pertinent ; remettre la place disponible ; message clair | S | 037 |

### P2 — finitions UI / Admin

| PBI | Résumé | Est. | Dépend de |
|---|---|---|---|
| 044 | **Nettoyage dashboard Admin** — vérifier si les cartes "Statut API" et "Database" sont réellement utiles, les supprimer sinon ; boutons "Paramètres" et "Export CSV" ne font rien : décider (implémenter ou masquer) ; vérifier si le champ "Clé API YouTube" est réellement utilisé, le supprimer si inutile ; vérifier que la création d'un juré dans Utilisateurs est fonctionnelle avec mot de passe par défaut `password123` | M | — |
| 045 | **UI Super Admin** — les cartes "Festival actif", "Festival archivé", "Total sites", "Instances" doivent avoir exactement la même hauteur ; la couleur principale doit être représentée par un petit carré de couleur, pas une longue barre | S | — |
| 046 | **Formulaire de soumission — finitions** — vérifier l'ordre de tabulation ; boutons radio ronds et cohérents avec le design ; ajouter un bouton de pré-remplissage avec des données fictives en mode développement | M | — |
| 047 | **Login — centrage du formulaire** — recentrer parfaitement le formulaire de login | S | — |
| 048 | **Sidebar — déconnexion en double** — supprimer le bouton Déconnexion de la sidebar, conserver uniquement celui de la navbar | S | — |

## Prochain PBI

Recommandation (2026-07-08) : traiter d'abord les P0 dans l'ordre **042 → 040 → 041** (042 est un quick win indépendant ; 041 dépend de 040), puis les P1 en commençant par **035** et **043**, puis le bloc Événements **036 → 037 → 038/039**. Méthode : code actuel + historique Git + `PROJECT_STATE.md`/`product_backlog.md` comme sources de vérité (pas `AGENTS.md`, qui décrit des règles de dev, pas le périmètre produit). Routes ambiguës `/movies`/`/collaborators`/`/directors`, `CLAUDE.md` et revue sécurité plus large restent en pause (demande explicite de l'utilisateur).
