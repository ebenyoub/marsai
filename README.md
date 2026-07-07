# MarsAI Project

Projet de plateforme web pour un festival de courts-métrages réalisés avec l'IA.

## Structure du projet

- `marsai_frontend/` : Application React (TypeScript, Vite, Tailwind 4)
- `marsai_backend/` : API Node.js (Express, TypeScript, MySQL)
- `.github/workflows/` : CI et déploiement VPS du monorepo
- `docker-compose.yml` : environnement local
- `docker-compose.prod.yml` : environnement de production VPS

## Lancement rapide (Docker)

Pour lancer le backend et la base de données en local (avec toutes les données initiales) :

```bash
docker-compose up --build
```

Le backend sera accessible sur `http://localhost:3002`.
La base de données sera initialisée avec plus de 100 films, des réalisateurs, des membres du jury et des administrateurs.

## Lancement du Frontend (Local)

Le frontend est configuré pour se connecter au backend Docker par défaut.

```bash
cd marsai_frontend
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

## Commandes CI locales

Frontend :

```bash
cd marsai_frontend
npm ci
npm run lint
npm run build
```

Backend :

```bash
cd marsai_backend
npm ci
npm run lint
npm run build
```

Docker production :

```bash
docker compose -f docker-compose.prod.yml config
docker compose -f docker-compose.prod.yml build
```

## Variables d'environnement de production

Créer un fichier `.env` sur le VPS à la racine du projet, à partir de `.env.production.example` :

```bash
DB_NAME=marsai
DB_USER=marsai_user
DB_PASSWORD=change-me
DB_ROOT_PASSWORD=change-me
JWT_SECRET=change-me
CORS_ORIGIN=https://marsai.elyasbenyoub.dev
VITE_API_URL=https://marsai.elyasbenyoub.dev
```

## Déploiement VPS

Le workflow `.github/workflows/deploy.yml` synchronise le monorepo vers `/srv/apps/marsai/`, puis exécute :

```bash
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d
docker exec nginx nginx -t
docker exec nginx nginx -s reload
```

Secrets GitHub requis :

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`

## Identifiants de test (Mocks / DB)

Si vous utilisez le mode Mock (pas de backend lancé) ou la base de données initialisée :
- **Admin** : `jean.dupont@email.com` / (N'importe quel mot de passe en mode Mock)
- **Jury** : `marie.curie@email.com`

## Fonctionnalités incluses

- **Internationalisation** : Français et Anglais supportés.
- **Formulaire de soumission** : Tunnel de soumission complet en 5 étapes.
- **Interface Jury** : Dashboard d'évaluation des films.
- **Mode Mock** : Le front fonctionne même sans le backend pour les démonstrations.
