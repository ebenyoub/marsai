# ROADMAP_V2.md — MarsAI

Fonctionnalités identifiées comme réelles (pas des mocks à corriger) mais **non indispensables au MVP**. Le périmètre du MVP est celui décrit dans `PROJECT_STATE.md` ("Où on en est") et couvert par les PBI déjà terminés dans `product_backlog.md` (accueil, galerie, tunnel de soumission, auth, rôles, vote jury, admin/super-admin, i18n FR/EN) — aucune décision produit documentée n'a jamais inclus les deux éléments ci-dessous dans ce périmètre.

Contrairement à `product_backlog.md`, ce fichier ne suit pas des PBI en cours — il liste des évolutions futures, non planifiées.

## Réinitialisation de mot de passe

**Trouvé** : le lien "Mot de passe oublié ?" (`marsai_frontend/src/components/Login.tsx`) redirige vers `/` — aucune fonctionnalité derrière.

**Pourquoi V2, pas V1** : l'authentification fonctionne pleinement sans cette fonctionnalité (connexion, inscription, rôles, JWT — PBI 001-008 et PBI 012 déjà terminés et validés couvrent ce périmètre sans elle). La construire correctement nécessite un choix d'infrastructure (service d'envoi d'email, SMTP ou provider tiers) qui n'existe pas dans le projet aujourd'hui et qui dépasse la correction d'un bug de code.

**Portée quand elle sera reprise** : route backend de demande de réinitialisation (génération d'un token à expiration courte, ex. table dédiée ou JWT signé), envoi d'un email via un service à choisir, page frontend de saisie du nouveau mot de passe, route de confirmation.

## Pages légales du footer

**Trouvé** : les liens "Mentions légales", "Confidentialité" et "RGPD" (`marsai_frontend/src/components/Footer.tsx`) pointent vers `href="#"` — aucune page derrière.

**Pourquoi V2, pas V1** : ces pages ne conditionnent aucun des parcours déjà livrés (soumission, vote, galerie, rôles, admin/super-admin). Leur contenu (texte légal réel : mentions légales, politique de confidentialité, conformité RGPD) doit venir de l'utilisateur/porteur du projet — un agent ne peut pas l'inventer sans risquer d'écrire des affirmations juridiques fausses.

**Portée quand elle sera reprise** : contenu réel fourni par l'utilisateur, 3 pages (ou une page à onglets), liens du footer branchés dessus.
