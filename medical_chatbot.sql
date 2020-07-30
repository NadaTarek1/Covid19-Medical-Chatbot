-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 30, 2020 at 09:42 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medical_chatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `patient_symptoms`
--

CREATE TABLE `patient_symptoms` (
  `patient_name` varchar(200) NOT NULL,
  `symptom_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `patient_symptoms`
--

INSERT INTO `patient_symptoms` (`patient_name`, `symptom_name`) VALUES
('Ahmed', 'aches'),
('Nada', 'aches'),
('Nada', 'conjunctivitis'),
('Ahmed', 'diarrhoea'),
('Nada', 'diarrhoea'),
('Nada', 'dry_cough'),
('Ahmed', 'headache'),
('Ahmed', 'loss_of_taste_or_smell'),
('Nada', 'loss_of_taste_or_smell'),
('Ahmed', 'skin_rash'),
('Nada', 'skin_rash'),
('Ahmed', 'sore_throat'),
('Nada', 'sore_throat'),
('Nada', 'tiredness');

-- --------------------------------------------------------

--
-- Table structure for table `symptoms`
--

CREATE TABLE `symptoms` (
  `name` varchar(200) NOT NULL,
  `descriptive_name` text NOT NULL,
  `description` text NOT NULL,
  `type` enum('common','uncommon') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'uncommon'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `symptoms`
--

INSERT INTO `symptoms` (`name`, `descriptive_name`, `description`, `type`) VALUES
('aches', 'Aches and pains', 'Felling pain in your body', 'uncommon'),
('conjunctivitis', 'Conjunctivitis', 'Pink eye (conjunctivitis) is an inflammation or infection of the transparent membrane (conjunctiva) that lines your eyelid and covers the white part of your eyeball. When small blood vessels in the conjunctiva become inflamed, they\'re more visible. This is what causes the whites of your eyes to appear reddish or pink.', 'uncommon'),
('diarrhoea', 'Diarrhoea', 'Diarrhoea is loose, watery stools (bowel movements). You have diarrhea if you have loose stools three or more times in one day. Acute diarrhea is diarrhea that lasts a short time. It is a common problem. It usually lasts about one or two days, but it may last longer.', 'uncommon'),
('dry_cough', 'Dry cough', 'A dry cough is a cough that doesn’t bring up mucus. It may feel like you have a tickle in the back of your throat triggering your cough reflex, giving you hacking coughs.', 'common'),
('fever', 'Fever', 'A fever is a body temperature that is higher than normal. A normal temperature can vary from person to person, but it is usually around 98.6 F. A fever is not a disease. It is usually a sign that your body is trying to fight an illness or infection.', 'common'),
('headache', 'Headache', 'The main symptom of a headache is a pain in your head or face. This can be throbbing, constant, sharp or dull.', 'uncommon'),
('loss_of_taste_or_smell', 'Loss of taste or smell', 'Being unable to taste food that you used to taste or smelling things you used to smell', 'uncommon'),
('skin_rash', 'Skin rash', 'A rash is an area of irritated or swollen skin. Many rashes are itchy, red, painful, and irritated. Some rashes can also lead to blisters or patches of raw skin.', 'uncommon'),
('sore_throat', 'Sore throat', 'A condition marked by pain in the throat, typically caused by inflammation due to a cold or other virus', 'uncommon'),
('tiredness', 'Fatigue/Tiredness', 'Tiredness is a feeling of constant tiredness or weakness and can be physical, mental or a combination of both. It can affect anyone, and most adults will experience fatigue at some point in their life.', 'common');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` text NOT NULL,
  `address` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `password`, `address`) VALUES
('Ahmed', '123456', '53 Ibn Al Nafeis'),
('Nada', '123456\r\n', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patient_symptoms`
--
ALTER TABLE `patient_symptoms`
  ADD UNIQUE KEY `patient_name` (`patient_name`,`symptom_name`),
  ADD KEY `symtom_owned` (`symptom_name`);

--
-- Indexes for table `symptoms`
--
ALTER TABLE `symptoms`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `patient_symptoms`
--
ALTER TABLE `patient_symptoms`
  ADD CONSTRAINT `symptom_owner` FOREIGN KEY (`patient_name`) REFERENCES `user` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `symtom_owned` FOREIGN KEY (`symptom_name`) REFERENCES `symptoms` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
