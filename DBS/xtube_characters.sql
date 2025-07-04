-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: xtube
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `deposito_id` int DEFAULT NULL,
  `tipo_id` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `level` int DEFAULT '1',
  `is_active` tinyint(1) DEFAULT '1',
  `is_unlocked` tinyint(1) DEFAULT '0',
  `is_alive` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `health_points` int DEFAULT '100',
  `Eexp_points` int DEFAULT '0',
  `exp_points` int DEFAULT '0',
  `attack_points` int DEFAULT '10',
  `defense_points` int DEFAULT '10',
  `crit_chance` decimal(5,2) DEFAULT '0.00',
  `crit_multiplier` float DEFAULT '0',
  `alien_id` int DEFAULT '1',
  `money` int DEFAULT '0',
  `DEPOSITO` text,
  `CAPA` int DEFAULT '0',
  `GUN` int DEFAULT '0',
  `TORSO` int DEFAULT '0',
  `BOOT` int DEFAULT '0',
  `GUN_SPELL` json DEFAULT NULL,
  `BOOT_SPELL` json DEFAULT NULL,
  `TORSO_SPELL` json DEFAULT NULL,
  `CAPA_SPELL` json DEFAULT NULL,
  `SCRAP` int DEFAULT '0',
  `EQUIPADOS` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (51,6,NULL,4,'Met4',1,1,0,1,'2025-06-13 11:43:33','2025-07-04 16:29:01',100,0,100,10,10,1.00,1,2,155462970,'[17,17,17,17,17,17,14,3,27]',27,17,35,59,'[98, 78, 66, \"19.00\", \"1.70\"]','[92, 0, 36, \"4.70\", \"1.40\"]','[300, 0, 180, \"7.00\", \"1.70\"]','[85, 0, 40, \"5.00\", \"1.30\"]',6454,'[17, 27, 35, 59]'),(52,21,NULL,6,'Valeria',1,1,0,1,'2025-07-03 16:34:40','2025-07-03 16:34:40',100,0,0,10,10,0.00,0,1,0,'[]',0,0,0,0,'[0, 0, 0, 0, 0]','[0, 0, 0, 0, 0]','[0, 0, 0, 0, 0]','[0, 0, 0, 0, 0]',0,'[0, 0, 0, 0]');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-04 17:19:16
