---
name: deploy-vps
description: Déployer ou mettre à jour le projet sur un VPS (Docker, Nginx, SSL, DNS). À invoquer pour une mise en production ou une mise à jour d'un déploiement existant.
---

# Déployer sur VPS

## Objectif

Le projet accessible publiquement, en HTTPS, avec un chemin de rollback connu.

## Méthode

1. Pré-vol local : builds verts, `docker compose up` from scratch fonctionnel en local. Ne jamais déployer un état non vérifié.
2. Inventaire distant avant toute action : ce qui tourne déjà sur le VPS (autres sites, Nginx existant, certificats) — un déploiement ne doit jamais casser un service voisin.
3. Secrets : jamais de secrets de production en clair dans les fichiers versionnés ; `.env` distant créé sur place, jamais copié depuis le dépôt.
4. Ordre : DNS → services Docker → reverse proxy Nginx → SSL (certbot) → healthcheck public.
5. Conserver l'artefact précédent (image/tag ou dossier) jusqu'à validation du nouveau.

## Autorisé à modifier

Configs d'infrastructure (compose de prod, Nginx, systemd, scripts de déploiement), `.env` distants.

## Interdit

- Toute action destructive distante (rm, écrasement de config Nginx existante, révocation de certificat) sans confirmation explicite de l'utilisateur.
- Modifier le code applicatif pendant un déploiement (si un bug bloque, arrêter et repasser en développement).
- Déployer une base de données sans stratégie de persistance (volume) et de sauvegarde.
- Exposer des ports de base de données publiquement.

## Vérifications obligatoires avant de terminer

1. `curl -I https://<domaine>` → 200 et certificat valide.
2. Les flux critiques de l'application exercés sur l'URL publique.
3. Les services voisins du VPS répondent toujours.
4. Rapport : URL, fichiers de config posés, commandes exactes de rollback.
