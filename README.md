# MarsAI Project

Projet de plateforme web pour un festival de courts-métrages réalisés avec l'IA.

## Structure du projet

- `marsai_frontend/` : Application React (TypeScript, Vite, Tailwind 4)
- `marsai_backend/` : API Node.js (Express, TypeScript, MySQL)

## Lancement rapide (Docker)

Pour lancer le backend et la base de données (avec toutes les données initiales) :

```bash
docker-compose up --build
```

Le backend sera accessible sur `http://localhost:3000`.
La base de données sera initialisée avec plus de 100 films, des réalisateurs, des membres du jury et des administrateurs.

## Lancement du Frontend (Local)

Le frontend est configuré pour se connecter au backend Docker par défaut.

```bash
cd marsai_frontend
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

## Identifiants de test (Mocks / DB)

Si vous utilisez le mode Mock (pas de backend lancé) ou la base de données initialisée :
- **Admin** : `jean.dupont@email.com` / (N'importe quel mot de passe en mode Mock)
- **Jury** : `marie.curie@email.com`

## Fonctionnalités incluses

- **Internationalisation** : Français et Anglais supportés.
- **Formulaire de soumission** : Tunnel de soumission complet en 5 étapes.
- **Interface Jury** : Dashboard d'évaluation des films.
- **Mode Mock** : Le front fonctionne même sans le backend pour les démonstrations.
