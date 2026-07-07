# AGENTS.md — MarsAI

## Contexte du projet

MarsAI est une plateforme web de festival de films réalisés avec ou autour de l’intelligence artificielle.

Le site ne doit pas être réduit à une simple landing page.

Le produit complet doit contenir au minimum :

* une page d’accueil
* une galerie de films / vidéos
* un tunnel de soumission de film
* un système d’authentification
* des rôles utilisateur
* un rôle user
* un rôle jury
* un rôle admin
* un rôle super admin si présent dans l’historique Git
* une logique de vote jury
* une interface d’administration
* une interface de super administration
* l’i18n FR / EN
* des contenus vidéo YouTube affichables
* une gestion des collaborateurs dans le formulaire de soumission

## Règle principale

Tu peux simplifier le code.

Tu ne dois jamais simplifier le produit.

Toute fonctionnalité présente dans une ancienne version fonctionnelle doit être conservée ou restaurée.

## Source de vérité

Git est la source de vérité principale.

Avant de supprimer, remplacer ou réécrire une fonctionnalité, vérifier l’historique Git.

Commandes utiles :

```bash
git log --oneline --graph --decorate --all
git diff ae4d2a5 HEAD
git show ae4d2a5:chemin/du/fichier
```

La commit `ae4d2a5` a été identifiée comme une version importante contenant les pages admin, superadmin et une partie du produit complet.

Cependant, si une fonctionnalité métier manque encore, chercher aussi dans les commits précédents.

Ne jamais inventer une fonctionnalité si elle existe déjà dans Git.

## Interdictions

Ne jamais :

* supprimer une page existante
* supprimer une route existante
* supprimer i18n
* supprimer les rôles user / jury / admin
* supprimer la logique de vote
* supprimer la logique de soumission de film
* supprimer l’ajout de collaborateurs
* remplacer une vraie fonctionnalité par un mock décoratif
* dire qu’une fonctionnalité marche seulement parce que le build passe
* ignorer les erreurs console
* masquer une erreur avec un simple try/catch silencieux
* utiliser `any` pour éviter de typer correctement
* laisser un bouton visible sans action réelle
* laisser une route visible qui mène vers une page vide ou une 404

## Règles de validation

Une fonctionnalité est considérée comme fonctionnelle uniquement si elle a été testée réellement.

Un build réussi ne prouve pas que le produit fonctionne.

Après chaque correction importante, vérifier :

```bash
npm run build
npm run lint
npm run typecheck
```

Si une commande n’existe pas, le signaler clairement.

## Vérifications navigateur obligatoires

Utiliser Playwright, Cypress ou une vérification navigateur équivalente.

Tester au minimum :

* ouverture de `/`
* clic sur Galerie
* affichage des vidéos
* affichage des miniatures YouTube
* fallback si `maxresdefault.jpg` retourne 404
* ouverture / lecture d’une vidéo
* clic sur Se connecter
* inscription
* connexion
* stockage du token
* redirection après login
* rôle user
* rôle jury
* vote jury
* rôle admin
* accès `/admin`
* accès `/superadmin`
* clic sur Soumettre mon film
* initialisation propre du formulaire
* réinitialisation du formulaire
* ajout d’un collaborateur
* suppression d’un collaborateur
* validation des champs
* submit final
* message succès / erreur
* changement de langue FR / EN

## i18n

L’i18n est obligatoire.

Vérifier :

* configuration i18next
* fichiers de traduction FR
* fichiers de traduction EN
* namespaces
* clés utilisées dans les composants
* sélecteur de langue
* textes restaurés dans les pages admin / superadmin / soumission / galerie

Ne jamais remplacer l’i18n par du texte codé en dur si une clé de traduction existe.

## Authentification

La connexion et l’inscription doivent être réelles.

Vérifier :

* `Login.tsx`
* `Register.tsx`
* `src/lib/api.ts`
* routes backend `/auth/login`
* routes backend `/auth/register`
* payload envoyé par le frontend
* champs attendus par le backend
* hash du mot de passe
* création utilisateur en base
* réponse backend
* token JWT
* stockage local du token
* récupération du profil
* rôle utilisateur

En cas d’erreur SQL du type :

```text
Bind parameters must not contain undefined
```

identifier exactement le champ `undefined`.

Ajouter temporairement des logs :

```ts
console.log('PAYLOAD RECEIVED:', req.body);
console.log('SQL PARAMS:', params);
```

Puis corriger la source du problème, pas seulement le message d’erreur.

## Soumission de film

Le tunnel de soumission doit fonctionner entièrement.

Il doit gérer :

* informations réalisateur
* informations film
* liens sociaux
* URL YouTube
* miniature
* galerie
* collaborateurs
* validation
* submit final
* nettoyage du localStorage
* redirection ou page de succès

Champs actuellement utilisés côté frontend :

```ts
firstName
lastName
civility
birthDate
email
mobile
address
postCode
city
country
job
youtube
instagram
linkedin
facebook
twitter
source
newsletter
title
titleEn
synopsis
synopsisEn
duration
language
youtubeUrl
hasSubtitles
techStack
methodology
deploymentType
semanticTags
thumbnail
gallery
```

Type recommandé :

```ts
export interface FilmSubmissionData {
  firstName: string;
  lastName: string;
  civility: string;
  birthDate: string;
  email: string;
  mobile: string;
  address: string;
  postCode: string;
  city: string;
  country: string;
  job: string;

  youtube: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  twitter: string;

  source: string;
  newsletter: boolean;

  title: string;
  titleEn: string;
  synopsis: string;
  synopsisEn: string;
  duration: string;
  language: string;
  youtubeUrl: string;
  hasSubtitles: boolean;

  techStack: string;
  methodology: string;
  deploymentType: string;
  semanticTags: string[];

  thumbnail: File | null;
  gallery: File[];
}
```

Type collaborateur :

```ts
export interface CollaboratorType {
  id: string;
  firstname: string;
  lastname: string;
  job: string;
  email: string;
  gender?: string;
  movie_id?: number;
}
```

Le hook de soumission ne doit pas avoir de paramètre non typé :

```ts
export const useFilmSubmission = (
  masterData: FilmSubmissionData,
  members: CollaboratorType[]
) => {
  // ...
};
```

## FormData / API submission

Quand le frontend envoie un `FormData`, ne pas ajouter manuellement :

```ts
Content-Type: application/json
```

Le navigateur doit définir automatiquement le `multipart/form-data`.

Code de debug recommandé :

```ts
const response = await fetch(`${API_URL}/api/submissions`, {
  method: 'POST',
  body: formData,
});

const responseText = await response.text();

console.log('API_URL:', API_URL);
console.log('STATUS:', response.status);
console.log('RESPONSE:', responseText);
console.log('FORMDATA DATA:', formData.get('data'));
console.log('THUMBNAIL:', formData.get('thumbnail'));
console.log('GALLERY:', formData.getAll('gallery'));

if (!response.ok) {
  throw new Error(`Submission failed: ${response.status} - ${responseText}`);
}
```

Côté backend, vérifier :

* route `POST /api/submissions`
* middleware `multer`
* lecture de `req.body.data`
* `JSON.parse(req.body.data)`
* fichiers `thumbnail`
* fichiers `gallery`
* insertion SQL
* absence de valeurs `undefined`

## Vidéos YouTube

Les vidéos doivent fonctionner côté user, jury et admin.

Problème connu :

```text
GET https://img.youtube.com/vi/.../maxresdefault.jpg 404
```

Corriger proprement.

Règles :

* extraire correctement le `videoId`
* vérifier les données mockées ou API
* ne pas utiliser de faux IDs YouTube cassés
* prévoir un fallback d’image
* si `maxresdefault.jpg` échoue, tenter `hqdefault.jpg`
* si `hqdefault.jpg` échoue, afficher une image locale fallback
* ne jamais laisser une image cassée visible

Tester :

* affichage des cartes vidéo
* ouverture d’une vidéo
* lecture ou modal vidéo
* affichage selon rôle user / jury / admin

## Rôles

Les rôles doivent être restaurés depuis Git.

Rôles attendus :

* user : visualise les films / vidéos
* jury : visualise et vote
* admin : gère les films, votes, contenus
* superadmin : gère les festivals / administration globale si présent

Vérifier :

* guards de routes
* protected routes
* lecture du rôle utilisateur
* affichage conditionnel
* redirections non autorisées
* navigation selon rôle

## Vote jury

Le vote jury doit être réel.

Restaurer depuis Git :

* composants de vote
* appels API
* payload vote
* association film / jury
* affichage de l’état voté / non voté
* messages succès / erreur

Ne pas remplacer par un bouton décoratif.

## Admin / Super Admin

Les pages suivantes ont déjà été restaurées partiellement depuis `ae4d2a5` :

* `/admin`
* `/superadmin`
* `src/pages/admin/`
* `src/pages/super-admin/`

Vérifier que ces pages ne sont pas seulement visuelles.

Tester :

* accès
* tabs
* dialogs
* selects
* boutons
* formulaires
* actions CRUD si présentes
* navigation interne

## Boutons et liens

Chaque bouton visible doit avoir un comportement réel.

Vérifier :

* `onClick`
* `Link`
* `NavLink`
* `navigate`
* `type="button"` ou `type="submit"`
* handlers
* formulaires
* modales
* menus
* z-index
* overlay invisible
* `pointer-events`
* `disabled`

Boutons connus à vérifier :

* Galerie
* Se connecter
* FR / EN
* Soumettre mon film
* Submit final
* Ajouter collaborateur
* Supprimer collaborateur
* Vote jury
* boutons admin
* boutons superadmin

## Qualité TypeScript

Ne pas contourner les erreurs avec `any`.

Créer des interfaces propres pour :

* utilisateur
* rôle
* film
* vidéo
* vote
* soumission
* collaborateur
* réponse API
* erreur API

Préférer :

```ts
unknown
```

à `any` si le type n’est pas encore connu, puis affiner.

## Rapport avant modification

Avant une grosse correction, fournir :

* fichiers analysés
* fonctionnalité cassée
* ancienne version Git utilisée
* différence constatée
* stratégie de correction

## Rapport final obligatoire

À la fin de chaque mission, fournir :

* fichiers corrigés
* fonctionnalités restaurées
* cause exacte de chaque bug
* commits utilisés comme référence
* routes testées
* boutons testés
* commandes lancées
* résultat du build
* résultat du lint
* résultat du typecheck
* résultat des tests navigateur
* erreurs restantes s’il y en a

## Priorité

Ordre de priorité :

1. restaurer le comportement produit
2. conserver i18n
3. corriger auth / rôles
4. corriger soumission
5. corriger vidéos
6. corriger votes
7. corriger admin / superadmin
8. améliorer le code
9. refactoriser uniquement si le comportement est déjà sécurisé

## Phrase à respecter

Simplifier le code : oui.

Simplifier MarsAI : non.
