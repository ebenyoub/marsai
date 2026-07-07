---
name: fix-docker
description: Diagnostiquer et réparer un environnement Docker/docker-compose qui ne démarre pas ou se comporte mal (ports, volumes, healthchecks, réseau, init DB).
---

# Réparer Docker

## Objectif

Tous les conteneurs du projet démarrent, passent leurs healthchecks et les services répondent sur leurs ports publiés.

## Méthode

1. État des lieux : `docker compose ps`, `docker compose logs <service> --tail 50`, `docker ps -a` (conteneurs d'autres projets en conflit ?).
2. Conflits de ports : `lsof -nP -iTCP:<port> -sTCP:LISTEN` — si le port est pris par un autre projet ou un tunnel, **déplacer le port de ce projet-ci**, ne jamais tuer le processus tiers.
3. Volumes et init : les scripts d'init DB ne rejouent que sur un volume vierge — un changement de seed exige la recréation ; l'encodage des fichiers SQL doit être déclaré (`SET NAMES utf8mb4`).
4. Après correction : `docker compose down && docker compose up -d --build` pour valider un démarrage from scratch.

## Autorisé à modifier

docker-compose.yml, Dockerfiles, fichiers d'environnement d'infrastructure, mappings de ports (en propageant le changement aux configs clientes qui pointent dessus).

## Interdit

- Arrêter/supprimer des conteneurs ou volumes d'autres projets.
- `docker system prune` ou toute purge globale sans accord explicite.
- Modifier le code applicatif (si le bug est applicatif, le signaler et passer la main).
- Casser la parité port interne/variables d'environnement des services dépendants.

## Vérifications obligatoires avant de terminer

1. `docker compose config` valide.
2. Démarrage complet from scratch : tous les services up/healthy.
3. Un appel réel par service exposé (curl HTTP, ping SQL) répond.
4. Rapport : cause, fichiers modifiés, nouveaux ports le cas échéant, configs clientes mises à jour.
