-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2023 at 06:46 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `usersId` int(11) NOT NULL,
  `vacationsId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `usersId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `authLevel` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationsId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `imageName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationsId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Seychelles', 'Immerse yourself in a real paradise of green and blue and explore the little islands set in the Indian Ocean and their tropical flowers. At the heart of the Seychelles archipelago and a protected national marine park, the island of Saint Anne is home to a single and unique hotel: the Club Med Seychelles Resort. Adults and children will awaken their inner Robinson Crusoe on a holiday in total harmony with nature and where many of the activities are directly connected to the Indian Ocean and its sublimely beautiful scenery. Trekking, free diving and glass-bottomed kayaks are just some of the pleasures that can be shared, all designed to promote well-being and induce happiness in every member of the family. Turquoise waters, white sandy beaches edged with rocks, hills covered in lush vegetation - looks like you\'ve found the backdrop to your next holiday.', '2023-09-02', '2023-09-09', '1543.00', ''),
(2, 'The Alps', 'The highest and most extensive mountains in Europe, the Alps are, without a doubt, the ideal location for memorable skiing holidays. But not only! Beyond winter sports, the Alps offer a spectacular backdrop for summer activities, Alpine villages with traditional woodworking, cheesemaking and strong cultural identity.', '2023-11-12', '2023-11-19', '1879.00', ''),
(3, 'Sicily - Cefalù', 'Welcome to our first Exclusive Collection resort in Europe. Nestled atop picturesque sea cliffs, this luxury all-inclusive resort in Sicily enjoys breath-taking views overlooking Cefalù Bay. Step into a world of pure luxury, with activities and excursions specially designed to rejuvenate your spirit and dive into the Sicilian art de vivre. Stand-up paddle board across the ocean, relax with yoga on the sea, or explore seaside towns on a rented vespa. Return in the evening to enjoy our Sicily-inspired menu and watch the sunset with a glass of champagne.', '2023-05-04', '2023-05-07', '1522.00', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `usersId` (`usersId`),
  ADD KEY `vacationsId` (`vacationsId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`usersId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationsId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `usersId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`usersId`) REFERENCES `users` (`usersId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationsId`) REFERENCES `vacations` (`vacationsId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
