-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 20, 2023 at 01:57 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `duaphinbd`
--

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `id_user` int(11) NOT NULL,
  `id_item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`id_user`, `id_item`) VALUES
(6, 2),
(6, 4),
(6, 8),
(6, 12),
(6, 13),
(6, 14),
(6, 20),
(6, 27),
(6, 29),
(6, 35),
(6, 36),
(6, 37),
(6, 46),
(6, 48),
(6, 50);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(8) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(500) NOT NULL,
  `rarity` varchar(30) NOT NULL,
  `path` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `description`, `rarity`, `path`) VALUES
(1, 'Poussin', 'Poussin avec un couteau.', 'epic', '1_poussin.png'),
(2, 'Champignon', 'Champignon en colère.', 'rare', '2_champignon.png'),
(3, 'Lion', 'Fierce predator of the savannah', 'rare', '3_lion.png'),
(4, 'Tiger', 'Striped predator of the jungle', 'rare', '4_tiger.png'),
(5, 'Bear', 'Powerful omnivore of the forest', 'rare', '5_bear.png'),
(6, 'Wolf', 'Social predator of the wilderness', 'uncommon', '6_wolf.png'),
(7, 'Eagle', 'Majestic bird of prey', 'uncommon', '7_eagle.png'),
(8, 'Penguin', 'Flightless bird of the Antarctic', 'common', '8_penguin.png'),
(9, 'Giraffe', 'Tall herbivore of the savannah', 'rare', '9_giraffe.png'),
(10, 'Elephant', 'Gentle giant of the jungle', 'rare', '10_elephant.png'),
(11, 'Hippo', 'Large semi-aquatic herbivore', 'rare', '11_hippo.png'),
(12, 'Zebra', 'Striped herbivore of the savannah', 'uncommon', '12_zebra.png'),
(13, 'Kangaroo', 'Marsupial of the Australian outback', 'uncommon', '13_kangaroo.png'),
(14, 'Koala', 'Cute arboreal marsupial of Australia', 'common', '14_koala.png'),
(15, 'Squirrel', 'Small arboreal rodent', 'common', '15_squirrel.png'),
(16, 'Rabbit', 'Small burrowing herbivore', 'common', '16_rabbit.png'),
(17, 'Deer', 'Graceful herbivore of the forest', 'rare', '17_deer.png'),
(18, 'Moose', 'Large herbivore with impressive antlers', 'rare', '18_moose.png'),
(19, 'Fox', 'Cunning predator of the wilderness', 'uncommon', '19_fox.png'),
(20, 'Raccoon', 'Nocturnal omnivore with a distinctive mask', 'common', '20_raccoon.png'),
(21, 'Owl', 'Nocturnal bird of prey with silent flight', 'uncommon', '21_owl.png'),
(22, 'Hawk', 'Daytime bird of prey with sharp talons', 'uncommon', '22_hawk.png'),
(23, 'Falcon', 'Fastest bird in the world', 'epic', '23_falcon.png'),
(24, 'Peacock', 'Colorful bird with an impressive display', 'rare', '24_peacock.png'),
(25, 'Parrot', 'Colorful bird with a distinctive beak', 'common', '25_parrot.png'),
(26, 'Hummingbird', 'Small bird with rapid wing beats', 'uncommon', '26_hummingbird.png'),
(27, 'Butterfly', 'Colorful insect with delicate wings', 'common', '27_butterfly.png'),
(28, 'Dragonfly', 'Insect with a long slender body and two pairs of wings', 'uncommon', '28_dragonfly.png'),
(29, 'Ladybug', 'Small brightly colored beetle with black spots', 'common', '29_ladybug.png'),
(30, 'Caterpillar', 'Larval form of a butterfly or moth', 'common', '30_caterpillar.png'),
(31, 'Spider', 'Arachnid with eight legs and a silk-producing organ', 'uncommon', '31_spider.png'),
(32, 'Scorpion', 'Arachnid with a venomous tail', 'rare', '32_scorpion.png'),
(33, 'Snake', 'Legless reptile with a distinctive shape', 'rare', '33_snake.png'),
(34, 'Lizard', 'Reptile with a long tail and four legs', 'uncommon', '34_lizard.png'),
(35, 'Turtle', 'Reptile with a hard bony shell', 'rare', '35_turtle.png'),
(36, 'Frog', 'Amphibian with smooth moist skin and long hind legs', 'common', '36_frog.png'),
(37, 'Toad', 'Short-legged amphibian with a dry warty skin', 'common', '37_toad.png'),
(38, 'Fish', 'Aquatic animal with fins and gills', 'common', '38_fish.png'),
(39, 'Dolphin', 'Marine mammal with a friendly disposition', 'rare', '39_dolphin.png'),
(40, 'Whale', 'Largest mammal on Earth', 'epic', '40_whale.png'),
(41, 'Shark', 'Predatory fish with sharp teeth', 'rare', '41_shark.png'),
(42, 'Octopus', 'Aquatic mollusk with eight arms', 'rare', '42_octopus.png'),
(43, 'Starfish', 'Aquatic echinoderm with five arms', 'common', '43_starfish.png'),
(44, 'Seahorse', 'Fish with a distinctive upright posture', 'uncommon', '44_seahorse.png'),
(45, 'Jellyfish', 'Aquatic animal with a gelatinous umbrella-shaped bell', 'uncommon', '45_jellyfish.png'),
(46, 'Crab', 'Crustacean with a hard exoskeleton and two claws', 'uncommon', '46_crab.png'),
(47, 'Lobster', 'Crustacean with a large pincer claw and a smaller crusher claw', 'rare', '47_lobster.png'),
(48, 'Shrimp', 'Small crustacean with a curved body and long antennae', 'common', '48_shrimp.png'),
(49, 'Star', 'Luminous celestial body', 'legendary', '49_star.png'),
(50, 'Moon', 'Natural satellite of the Earth', 'epic', '50_moon.png');

-- --------------------------------------------------------

--
-- Table structure for table `rarity`
--

CREATE TABLE `rarity` (
  `value` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rarity`
--

INSERT INTO `rarity` (`value`) VALUES
('common'),
('epic'),
('legendary'),
('rare'),
('uncommon');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `id` int(8) NOT NULL,
  `goldQty` int(10) NOT NULL,
  `lastChestOpened` datetime DEFAULT NULL,
  `signUpDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`id`, `goldQty`, `lastChestOpened`, `signUpDate`) VALUES
(6, 5000, '2023-05-20 11:55:21', '2023-05-15 21:55:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `isAdmin`) VALUES
(6, 'castor', '$2a$10$8f8zNPC9C1A9koD3guRQy.hTfFT9hEz4Xyrkg4ddYMfgLygQ6gGO2', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id_user`,`id_item`),
  ADD KEY `fk_idItem` (`id_item`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rarity` (`rarity`);

--
-- Indexes for table `rarity`
--
ALTER TABLE `rarity`
  ADD PRIMARY KEY (`value`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `fk_idItem` FOREIGN KEY (`id_item`) REFERENCES `items` (`id`),
  ADD CONSTRAINT `foreignIdUser` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `fk_rarity` FOREIGN KEY (`rarity`) REFERENCES `rarity` (`value`);

--
-- Constraints for table `stats`
--
ALTER TABLE `stats`
  ADD CONSTRAINT `fk_idUser` FOREIGN KEY (`id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
