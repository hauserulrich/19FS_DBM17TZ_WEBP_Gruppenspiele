-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 01. Mai 2019 um 09:24
-- Server-Version: 10.1.30-MariaDB
-- PHP-Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `gruppenspiel`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung`
--

CREATE TABLE `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung` (
  `id` int(11) NOT NULL,
  `team1_id` int(11) NOT NULL,
  `team2_id` int(11) NOT NULL,
  `punkte_team1` int(11) NOT NULL,
  `punkte_team2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `19FS_DBM17TZ_WEBP_Gruppenspiele_team`
--

CREATE TABLE `19FS_DBM17TZ_WEBP_Gruppenspiele_team` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gruppen_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung`
--
ALTER TABLE `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `19FS_DBM17TZ_WEBP_Gruppenspiele_team`
--
ALTER TABLE `19FS_DBM17TZ_WEBP_Gruppenspiele_team`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung`
--
ALTER TABLE `19FS_DBM17TZ_WEBP_Gruppenspiele_begegnung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `19FS_DBM17TZ_WEBP_Gruppenspiele_team`
--
ALTER TABLE `19FS_DBM17TZ_WEBP_Gruppenspiele_team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
