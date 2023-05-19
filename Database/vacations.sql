-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2023 at 03:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`usersId`, `firstName`, `lastName`, `email`, `password`, `authLevel`) VALUES
(1, 'Ding', 'Liren', 'dingliren@gmail.com', 'Dl123456', 'user'),
(2, 'Richard', 'Rapport', 'richardrapport@gmail.com', 'Rr123456', 'user'),
(3, 'Hikaru', 'Nakamura', 'hikarunakamura@gmail.com', 'Hn123456', 'user'),
(4, 'Admin', 'Adminovich', 'admin@gmail.com', 'Aa123456', 'admin');

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
(1, 'Budapest', 'Experience the beauty of Budapest, known as the \"Paris of the East.\" Admire the stunning architecture, soak in the thermal baths, and take a scenic cruise on the Danube River.', '2023-09-02', '2023-09-09', 1543.00, '073bf718-4d8e-4c85-99de-fe045c3d665e.jpg'),
(2, 'Rome', 'Immerse yourself in the rich history of Rome, the \"Eternal City.\" Marvel at the Colosseum and ancient ruins, toss a coin in the Trevi Fountain, and savor the delicious Italian cuisine.', '2023-11-12', '2023-11-19', 1879.00, 'b8acfe6b-b7cc-41fc-a6d0-8fb5620a3168.jpg'),
(3, 'Florence', 'Discover the art and culture of Florence, the birthplace of the Renaissance. Visit the Uffizi Gallery, climb to the top of the Duomo, and indulge in a traditional Tuscan meal.', '2023-05-04', '2023-05-07', 1522.00, 'c5b57076-f46d-4644-a718-a88ca5b24afb.jpg'),
(4, 'Venice', 'Explore the magical city of Venice, built on a network of canals. Take a gondola ride, visit the stunning St. Mark\'s Basilica, and sample the local seafood.', '2023-08-15', '2023-08-22', 2350.00, 'f036075a-b620-46ad-aca6-56bcfff2d74a.jpg'),
(5, 'Buenos Aires', 'Experience the vibrant culture of Buenos Aires. Tango the night away, stroll through colorful neighborhoods, and savor the delicious Argentine cuisine.', '2023-12-19', '2023-12-29', 3525.00, '06f0ceb2-82dd-4c51-900e-3c102efcf87e.jpg'),
(6, 'London', 'Discover the historic landmarks and modern culture of London. Visit the Tower of London, take a ride on the London Eye, and enjoy a traditional afternoon tea.', '2023-07-10', '2023-07-15', 2200.00, '2397a82a-78c0-4c81-85d0-12b9f49b2352 .jpg'),
(7, 'Huacachina', 'Escape to the tranquil oasis of Huacachina, surrounded by sand dunes. Go sandboarding, take a relaxing spa day, and watch the sunset over the desert.', '2023-11-13', '2023-11-19', 3600.00, '21a09e93-a316-4b63-947f-ec44156049f4.jpg'),
(8, 'Madrid', 'Experience the lively spirit of Madrid, the capital of Spain. Admire the art at the Prado Museum, taste the delicious tapas, and dance the night away at a flamenco show.', '2023-06-14', '2023-06-26', 2960.00, '115d9361-ffca-4000-9b0f-3b5f57df5773.jpg'),
(9, 'Norway', 'Embark on a breathtaking journey through the natural beauty of Norway. Cruise through the fjords, hike through the mountains, and see the Northern Lights.', '2023-10-10', '2023-10-17', 3756.00, '3c6220cc-6a80-434d-b4b5-9b7b6f237d14 .jpg'),
(10, 'Paris', 'Fall in love with the enchanting city of Paris, known as the \"City of Love.\" Visit the Eiffel Tower, stroll along the Champs-Élysées, and indulge in the delicious French cuisine.', '2023-08-01', '2023-08-06', 2009.00, '9bbfde53-1e29-4677-a9af-7b34d19994de.jpg'),
(11, 'Tbilisi', 'Discover the unique culture and history of Tbilisi, the capital of Georgia. Visit the Narikala Fortress, taste the traditional Georgian cuisine, and relax in the sulfur baths.', '2024-04-16', '2024-04-21', 2789.00, '7870c267-b882-4df1-be4e-f2024c0881b7.jpg'),
(12, 'Tokyo', 'Experience the dynamic energy of Tokyo, the bustling capital of Japan. Explore the futuristic architecture, indulge in the delicious sushi, and immerse yourself in the vibrant nightlife.', '2023-09-03', '2023-09-13', 5260.00, '34e24f74-7bfa-4c7f-bff0-40c3cd487663.jpg'),
(13, 'SIT Office', 'The real meaning of progress', '2023-05-17', '2023-05-25', 2500.00, '2f963e53-65db-476b-a93a-6eea7cb5c763.jpg');

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
  MODIFY `usersId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
