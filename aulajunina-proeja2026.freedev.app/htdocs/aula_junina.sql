-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 13/06/2026 às 15:16
-- Versão do servidor: 8.4.7
-- Versão do PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `aula junina`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `candidatos`
--

DROP TABLE IF EXISTS `candidatos`;
CREATE TABLE IF NOT EXISTS `candidatos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_social` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricula` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoria` enum('Mister','Miss') COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `votos` int DEFAULT '0',
  PRIMARY KEY (`matricula`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `candidatos`
--

INSERT INTO `candidatos` (`id`, `nome_social`, `matricula`, `categoria`, `foto`, `votos`) VALUES
(1, 'Agenor Andrade', '4567654', 'Mister', 'foto_6a2c3418a66ea5.76435819.jpg', 0),
(2, 'Maria Dulce', '3300987', 'Miss', 'foto_6a2c36c0139ac8.89609492.jpg', 0),
(3, 'Sandro Costa', '5467997', 'Mister', 'foto_6a2c38f1aa9472.18096392.jpg', 0),
(4, 'Maria Eugenia', '2333219', 'Miss', 'foto_6a2c395475f224.68708489.jpg', 0),
(5, 'Jefrey Chiquini', '2424244', 'Miss', 'foto_6a2c3b2b76dcb9.77741666.jpg', 0),
(6, 'Daniel Dantas', '6789765', 'Mister', 'foto_6a2c3e697c6089.39637770.jpg', 0),
(7, 'Maria Cecilia', '1010987', 'Miss', 'foto_6a2c40a56c6dc2.04255209.jpg', 0),
(8, 'André Marsiglia', '6689098', 'Mister', 'uploads/foto_6a2c4a728c030.png', 0),
(9, 'Vivian Madalena', '2276921', 'Miss', 'uploads/foto_6a2c61f712054.jpg', 0),
(10, 'Zé do caixão', '3030300', 'Mister', 'uploads/foto_6a2c6499d20ff.jpg', 0),
(11, 'Andrade Gutierrez', '2209098', 'Mister', 'uploads/foto_6a2c6645db939.jpg', 0),
(12, 'Matusalem Araujo', '0098780', 'Mister', 'uploads/foto_6a2c6a2cb6647.jpg', 0),
(13, 'Roberto Carlos', '9009876', 'Mister', 'uploads/foto_6a2c6d93142ca.jpg', 0),
(14, 'Elisângela Lima', '4565343', 'Miss', 'uploads/foto_6a2c94a061f0f.jpg', 0),
(15, 'Ivaldo Alves', '2020987', 'Mister', 'uploads/foto_6a2c9e4f5da6a.jpg', 0),
(16, 'Paloma Edurda', '24681001', 'Miss', 'uploads/foto_6a2c9fc0466d6.jpg', 0),
(17, 'Maria José Castro', '09090909', 'Miss', 'uploads/foto_6a2d721ebef48.jpg', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
