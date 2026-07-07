# decisions.md — MarsAI

Journal des décisions, du plus ancien au plus récent. Ne jamais éditer une entrée passée ; si une décision est annulée, ajouter une nouvelle entrée qui référence l'ancienne.

---

## 2026-07-07 — Pivot du cycle PBI produit vers un chantier de dette technique

**Décision** : suspendre le cycle PBI produit en cours pour traiter en priorité deux dettes techniques : les erreurs TSC frontend et l'absence de RBAC backend.

**Pourquoi** : l'utilisateur a jugé ces deux dettes préoccupantes indépendamment de l'avancement produit, et a demandé un traitement séparé, audité avant modification, avec un commit dédié par sujet (jamais TSC et RBAC dans le même commit).

**Comment appliqué** : audit écrit avant toute modification (nombre d'erreurs, causes, code mort vs vrais types manquants pour le TSC ; état JWT/verifyToken/routes pour le RBAC), correction seulement après auto-validation de la simplicité/risque (déléguée explicitement par l'utilisateur pour le TSC), RBAC démarré seulement après validation explicite séparée.

---

## 2026-07-07 — CLAUDE.md contient des informations obsolètes sur l'état de la dette

**Décision** : ne pas corriger `CLAUDE.md` immédiatement malgré la découverte d'inexactitudes ; attendre une "phase de documentation globale" dédiée (demande explicite de l'utilisateur).

**Pourquoi** : l'audit de sécurité + TSC de cette session a prouvé que 4 des 6 points de la section "État connu (juillet 2026)" de `CLAUDE.md` sont faux ou obsolètes :
- *"`/rating` sans verifyToken"* → faux, déjà protégé depuis le début (vérifié dans le code source, jamais modifié).
- *"pas de garde de rôle sur `/jury`, `/admin`, `/superadmin`"* → faux, `ProtectedRoute` déjà implémenté côté frontend avec la logique de rôles attendue.
- *"`PUT /movies/:id` cassé (`updated_at` inexistant)"* → faux, déjà fonctionnel (`hasTimestamp: false` déjà géré dans `updateEntity`), vérifié par appel API réel.
- *"soumissions créées en `approved`"* → faux, le code crée bien en `status: 'pending'` ; seul un commentaire de code juste au-dessus ment encore (voir `TODO.md`).
- *"~88 erreurs `tsc --noEmit`"* → étaient en réalité 29 au début de cette session (déjà réduites lors d'un cycle précédent sans mise à jour de la doc), et sont maintenant à 0 après le chantier TSC de cette session.
- *"dashboards admin/super-admin décoratifs (aucun appel API)"* → partiellement vrai au début de cette session, corrigé pour `FestivalList`/`AdminSidebar`/`SuperAdminDashboard` lors du cycle précédent (commit `d92af8f`).

**Impact** : toute personne (humaine ou agent) qui lit `CLAUDE.md` aujourd'hui reçoit une image du produit plus pessimiste que la réalité. Ne pas se fier à cette section sans revérifier dans le code tant qu'elle n'a pas été corrigée.

---

## 2026-07-07 — RBAC : périmètre volontairement limité, pas de rôle deviné

**Décision** : `requireRole` n'a été appliqué qu'aux routes ayant un propriétaire de rôle "évident" via le frontend (`festival` mutations → super-admin ; `movie` modération + `/movies/stats` → admin/super-admin ; `rating` → jury/admin/super-admin ; `/users*` → admin/super-admin). `POST /movies`, `/collaborators`, `/directors` restent en authentification simple, sans rôle assigné.

**Pourquoi** : ces trois routes ne sont appelées par aucune UI frontend actuellement (le tunnel de soumission public passe par les modèles directement, pas par ces routes REST). Assigner un rôle sans donnée réelle sur qui devrait les appeler serait deviner, ce que l'utilisateur a explicitement demandé d'éviter ("ne pas ajouter de complexité inutile").

**Impact si reconsidéré** : si une UI vient un jour appeler une de ces routes, il faudra déterminer son rôle légitime avant d'y ajouter `requireRole`.
