# MarsAI - Festival de Courts-Métrages IA

MarsAI est une plateforme web dédiée à un festival de courts-métrages réalisés avec l'intelligence artificielle sur le thème "Imaginer des futurs souhaitables".

## Stack Technique

- **Frontend** : React 19, TypeScript, Vite
- **Styling** : Tailwind CSS 4
- **Formulaires** : React Hook Form + Zod
- **Internationalisation** : i18next (Français & Anglais)
- **Animations** : Motion (Framer Motion)
- **Icônes** : Lucide React

## Installation

```bash
cd marsai_frontend
npm install
```

## Lancement

```bash
npm run dev
```

## Fonctionnalités Principales

- **Accueil** : Présentation du festival, statistiques et programme.
- **Soumission de Film** : Formulaire multi-étapes (Identité, Données du film, Déclaration IA, Médias, Équipe).
- **Interface Jury** : Tableau de bord pour évaluer les films soumis (simulé avec des données mockées).
- **Authentification** : Connexion et Inscription (simulées si le backend est absent).
- **i18n** : Support complet du français et de l'anglais avec sélecteur de langue.

## Architecture Simplifiée

Le projet a été restructuré pour être plus lisible et maintenable :

- `src/components` : Composants réutilisables et UI.
- `src/pages` : Pages principales de l'application.
- `src/lib` : Utilitaires centraux (API, mock data).
- `src/schemas` : Schémas de validation Zod.
- `src/i18n` : Fichiers de traduction.
- `src/data` : Données statiques et mocks.

## Mode Mock (Démo)

Si aucune API n'est configurée via `VITE_API_URL` dans le fichier `.env`, l'application bascule automatiquement en mode **Mock**. Les appels API (Login, Inscription, Récupération de films) sont simulés localement pour permettre une démonstration fluide sans backend.

## Pistes d'Amélioration

- Connexion réelle au backend (Node.js/Express inclus dans le repo).
- Gestion réelle de l'upload de fichiers (S3/Cloudinary).
- Système de notation détaillé pour le jury.
- Galerie publique des films finalistes.
