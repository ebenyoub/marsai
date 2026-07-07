-- =============================================================================
-- MIGRATION : AJOUT DES COLONNES SLUG ET CITY À LA TABLE FESTIVAL
-- =============================================================================
--
-- DESCRIPTION :
-- Ce script permet de migrer une base de données existante sans perte de données.
-- 1. Il ajoute la colonne `city` avec 'Marseille' par défaut.
-- 2. Il ajoute la colonne `slug` sous forme temporairement nullable.
-- 3. Il génère un slug unique automatique pour chaque ligne existante à base de son ID.
-- 4. Il enforce la contrainte NOT NULL et la contrainte UNIQUE sur le slug.
--
-- COMMENT APPLIQUER CETTE MIGRATION :
--
-- Option A : Depuis le conteneur Docker (recommandé pour le MVP)
-- Lancez la commande suivante depuis votre terminal hôte :
--   docker exec -i marsai_db mysql -uuser -ppassword marsai < marsai_backend/src/config/sql/migration_add_festival_slug_city.sql
--
-- Option B : Manuellement via un client SQL (DBeaver, phpMyAdmin...)
-- Connectez-vous à votre base de données `marsai` et exécutez le script ci-dessous.
-- =============================================================================

USE `marsai`;

-- 1. Ajout de la colonne `city` avec une valeur par défaut 'Marseille'
-- Si la colonne existe déjà, cette commande lèvera une erreur sans gravité.
ALTER TABLE `festival` ADD COLUMN `city` VARCHAR(255) NOT NULL DEFAULT 'Marseille';

-- 2. Ajout de la colonne `slug` temporairement nullable pour éviter les conflits d'unicité pendant la migration
ALTER TABLE `festival` ADD COLUMN `slug` VARCHAR(255) NULL;

-- 3. Remplissage automatique des slugs uniques pour les lignes existantes
-- Exemple : un festival avec l'id 1 aura le slug 'festival-1'
UPDATE `festival` SET `slug` = CONCAT('festival-', `id`) WHERE `slug` IS NULL;

-- 4. Application des contraintes d'intégrité (NOT NULL et UNIQUE)
ALTER TABLE `festival` MODIFY COLUMN `slug` VARCHAR(255) NOT NULL;
ALTER TABLE `festival` ADD UNIQUE KEY `slug_unique` (`slug`);

-- 5. Confirmation de la structure finale
DESCRIBE `festival`;
