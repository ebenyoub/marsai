-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : sam. 28 fév. 2026 à 22:59
-- Version du serveur : 8.0.40
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `marsai`
--

-- --------------------------------------------------------

--
-- Structure de la table `books`
--

CREATE TABLE `books` (
  `participant_id` int NOT NULL,
  `event_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `books`
--

INSERT INTO `books` (`participant_id`, `event_id`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Structure de la table `collaborator`
--

CREATE TABLE `collaborator` (
  `id` int NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `gender` enum('Mr','Mme') NOT NULL,
  `email` varchar(100) NOT NULL,
  `job` text NOT NULL,
  `movie_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `collaborator`
--

INSERT INTO `collaborator` (`id`, `firstname`, `lastname`, `gender`, `email`, `job`, `movie_id`) VALUES
(1, 'Alex', 'Rider', 'Mr', 'alex.r@actor.com', 'Acteur Principal', NULL),
(2, 'Sarah', 'Connor', 'Mme', 'sarah.c@actor.com', 'Actrice Secondaire', NULL),
(3, 'John', 'Doe', 'Mr', 'j.doe@sound.com', 'Compositeur de musique originale', NULL),
(4, 'Greenwood', 'Jones', 'Mr', 'g.jones@actor.com', 'Acteur principal', NULL),
(5, 'Elena', 'Varela', 'Mme', 'e.varela@actor.com', 'Actrice principale', NULL),
(6, 'Alan', 'Turing', 'Mr', 'alan.t@animator.com', 'Animateur 3D', NULL),
(7, 'Grace', 'Hopper', 'Mme', 'grace.h@vfx.com', 'Artiste VFX', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `director`
--

CREATE TABLE `director` (
  `id` int NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `gender` enum('M.','Mme') NOT NULL,
  `birthday` datetime NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `job` varchar(100) NOT NULL,
  `youtube_url` varchar(255) DEFAULT NULL,
  `instagram_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `facebook_url` varchar(255) DEFAULT NULL,
  `twitter_url` varchar(255) DEFAULT NULL,
  `question_about` enum('Réseaux sociaux','Moteur de recherche','Bouche-à-oreille','Presse / Média','Autre festival','Partenaire','Autre') DEFAULT NULL,
  `newsletter` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  `capacity` int NOT NULL,
  `remaining_seats` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('Ouvert','Fermer') NOT NULL,
  `festival_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `title`, `start_at`, `end_at`, `capacity`, `remaining_seats`, `location`, `description`, `status`, `festival_id`) VALUES
(1, 'Projection des films Sci-Fi', '2024-10-16 14:00:00', '2024-10-16 16:00:00', 150, 150, 'Salle 1', 'Séance dédiée aux films de science-fiction en compétition.', 'Ouvert', 1),
(2, 'Masterclass Animation & IA', '2024-10-17 10:00:00', '2024-10-17 12:00:00', 50, 50, 'Salle 2', 'Rencontre avec des réalisateurs sur les nouvelles techniques d\'animation assistées par IA.', 'Ouvert', 1),
(3, 'Table Ronde: Futur du Cinéma', '2024-10-17 15:00:00', '2024-10-17 17:00:00', 100, 100, 'Amphithéâtre', 'Discussion avec des experts sur l\'impact de l\'IA sur l\'industrie cinématographique.', 'Ouvert', 1);

-- --------------------------------------------------------

--
-- Structure de la table `festival`
--

CREATE TABLE `festival` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  `status` enum('Actif','Inactif') NOT NULL,
  `booking_total` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `festival`
--

INSERT INTO `festival` (`id`, `name`, `description`, `created_at`, `start_at`, `end_at`, `status`, `booking_total`) VALUES
(1, 'Mars AI Film Festival 2024', 'Le premier festival de films générés ou assistés par intelligence artificielle. Un événement dédié à l\'innovation cinématographique.', '2026-02-23 10:22:13', '2024-10-15 09:00:00', '2024-10-18 23:00:00', 'Actif', 500);

-- --------------------------------------------------------

--
-- Structure de la table `have`
--

CREATE TABLE `have` (
  `role_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `have`
--

INSERT INTO `have` (`role_id`, `user_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `id` int NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `movie_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id`, `url`, `created_at`, `movie_id`) VALUES
(1, 'https://via.placeholder.com/1920x1080.png?text=La+Machine+Scene+1', '2026-02-23 10:22:13', NULL),
(2, 'https://via.placeholder.com/1920x1080.png?text=La+Machine+Scene+2', '2026-02-23 10:22:13', NULL),
(3, 'https://via.placeholder.com/1920x1080.png?text=Le+Begue+Scene+1', '2026-02-23 10:22:13', NULL),
(4, 'https://via.placeholder.com/1920x1080.png?text=Parapluie+Scene+1', '2026-02-23 10:22:13', NULL),
(5, 'https://via.placeholder.com/1920x1080.png?text=ForgottenStar+Poster', '2026-02-23 10:22:13', NULL),
(6, 'https://via.placeholder.com/1920x1080.png?text=ForgottenStar+Scene', '2026-02-23 10:22:13', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `movie`
--

CREATE TABLE `movie` (
  `id` int NOT NULL,
  `title` text NOT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `synopsis_fr` text,
  `synopsis_en` text,
  `duration` int DEFAULT NULL,
  `main_language` varchar(50) DEFAULT NULL,
  `yt_url` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `subtitles` varchar(255) DEFAULT NULL,
  `stack` text,
  `methodology` text,
  `ia_type` enum('100% IA','Hybride') DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `director_id` int NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ai_tools` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `movie_tag`
--

CREATE TABLE `movie_tag` (
  `movie_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `participant`
--

CREATE TABLE `participant` (
  `id` int NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `job` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `participant`
--

INSERT INTO `participant` (`id`, `firstname`, `lastname`, `email`, `mobile`, `job`, `created_at`) VALUES
(1, 'Chris', 'Nolan', 'chris.nolan@participant.com', '0712345678', 'Cinéphile', '2026-02-23 10:22:13'),
(2, 'Denis', 'Villeneuve', 'denis.v@participant.com', '0787654321', 'Etudiant en cinéma', '2026-02-23 10:22:13'),
(3, 'Kathryn', 'Bigelow', 'kathryn.b@participant.com', '0798765432', 'Journaliste cinéma', '2026-02-23 10:22:13');

-- --------------------------------------------------------

--
-- Structure de la table `rating`
--

CREATE TABLE `rating` (
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `score_creativity` int NOT NULL,
  `score_technical` int NOT NULL,
  `score_message` int NOT NULL,
  `comment` text NOT NULL,
  `score_total` float NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Administrateur'),
(2, 'Jury'),
(4, 'Organisateur'),
(3, 'Spectateur');

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(3, 'Animation'),
(6, 'Comédie'),
(2, 'Drame'),
(5, 'Expérimental'),
(1, 'Science-Fiction'),
(4, 'Thriller');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('user','jury','admin','super-admin') DEFAULT 'user',
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `festival_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `role`, `password`, `created_at`, `updated_at`, `festival_id`) VALUES
(1, 'Jean', 'Dupont', 'jean.dupont@email.com', 'user', '$2b$10$fakePasswordHash123456', '2026-02-23 10:22:13', '2026-02-23 10:22:13', 1),
(2, 'Marie', 'Curie', 'marie.curie@email.com', 'admin', '$2b$10$anotherFakeHash789012', '2026-02-23 10:22:13', '2026-02-23 10:22:13', 1),
(3, 'Albert', 'Einstein', 'albert.einstein@email.com', 'jury', '$2b$10$superFakeHash555666', '2026-02-23 10:22:13', '2026-02-23 10:22:13', 1),
(4, 'Ada', 'Lovelace', 'ada.lovelace@email.com', 'super-admin', '$2b$10$moreFakeHash777888', '2026-02-23 10:22:13', '2026-02-23 10:22:13', 1),
(5, 'Alice', 'Varda', 'alice.varda@jury.com', 'jury', '$2b$10$fakePasswordHash123456', '2026-02-27 21:20:44', '2026-02-27 21:20:44', 1),
(6, 'Benoit', 'Magimel', 'benoit.m@jury.com', 'jury', '$2b$10$fakePasswordHash123456', '2026-02-27 21:20:44', '2026-02-27 21:20:44', 1),
(7, 'Catherine', 'Deneuve', 'catherine.d@jury.com', 'jury', '$2b$10$fakePasswordHash123456', '2026-02-27 21:20:44', '2026-02-27 21:20:44', 1),
(8, 'David', 'Lynch', 'david.lynch@jury.com', 'jury', '$2b$10$fakePasswordHash123456', '2026-02-27 21:20:44', '2026-02-27 21:20:44', 1),
(9, 'Eva', 'Green', 'eva.green@jury.com', 'jury', '$2b$10$fakePasswordHash123456', '2026-02-27 21:20:44', '2026-02-27 21:20:44', 1),
(10, 'Francis', 'Ford', 'francis.f@jury.com', 'jury', '$2b$10$fakePasswordHash123456', '2026-02-27 21:20:44', '2026-02-27 21:20:44', 1),
(11, 'Elyas', 'Benyoub', 'ebenyoub@me.com', 'user', '$2b$10$EksnKoy2icKSH9d0wiORs./B7WpWXjYj5VgwUHP0hzPOWjmjyRvXq', '2026-02-28 09:03:55', '2026-02-28 09:03:55', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`participant_id`,`event_id`),
  ADD KEY `fk_books_event_id` (`event_id`);

--
-- Index pour la table `collaborator`
--
ALTER TABLE `collaborator`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_collaborator_movie_id` (`movie_id`);

--
-- Index pour la table `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_event_festival_id` (`festival_id`);

--
-- Index pour la table `festival`
--
ALTER TABLE `festival`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `have`
--
ALTER TABLE `have`
  ADD PRIMARY KEY (`role_id`,`user_id`),
  ADD KEY `fk_have_user_id` (`user_id`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_image_movie_id` (`movie_id`);

--
-- Index pour la table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title_en` (`title_en`),
  ADD KEY `fk_movie_director_id` (`director_id`);

--
-- Index pour la table `movie_tag`
--
ALTER TABLE `movie_tag`
  ADD PRIMARY KEY (`movie_id`,`tag_id`),
  ADD KEY `fk_movie_tag_tag_id` (`tag_id`);

--
-- Index pour la table `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`user_id`,`movie_id`),
  ADD KEY `fk_rating_movie_id` (`movie_id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_user_festival_id` (`festival_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `collaborator`
--
ALTER TABLE `collaborator`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT pour la table `director`
--
ALTER TABLE `director`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `festival`
--
ALTER TABLE `festival`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `participant`
--
ALTER TABLE `participant`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_books_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_books_participant_id` FOREIGN KEY (`participant_id`) REFERENCES `participant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `collaborator`
--
ALTER TABLE `collaborator`
  ADD CONSTRAINT `fk_collaborator_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_event_festival_id` FOREIGN KEY (`festival_id`) REFERENCES `festival` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `have`
--
ALTER TABLE `have`
  ADD CONSTRAINT `fk_have_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_have_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `fk_image_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `fk_movie_director_id` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `movie_tag`
--
ALTER TABLE `movie_tag`
  ADD CONSTRAINT `fk_movie_tag_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_movie_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `fk_rating_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rating_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_festival_id` FOREIGN KEY (`festival_id`) REFERENCES `festival` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
