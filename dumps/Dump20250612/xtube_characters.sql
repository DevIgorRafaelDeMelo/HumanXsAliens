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
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,1,NULL,7,'Destroyer',1,1,0,1,'2025-05-31 20:50:52','2025-06-12 14:18:42',100,0,4600,50,10,100.00,1.4,17,5960500,'[4,1,1,2,1,1,2,2,1,1,1,2,1,1,1,4,1,3,3,1,1,1,1,3,8,8,7,5,8,7,6,3]',5,2,8,7,'[45, 5, \"25.00\", \"3.00\", 0]','[100, 60, \"1.0\", \"1.10\", 120]','[10, 30, \"1.00\", \"1.50\", 70]','[0, 50, \"5.00\", \"1.20\", 100]'),(39,9,NULL,2,'teste',1,1,0,1,'2025-06-05 15:24:19','2025-06-05 15:24:19',100,0,0,10,10,0.00,0,NULL,0,NULL,0,0,0,0,NULL,NULL,NULL,NULL),(40,11,NULL,6,'Kit',1,1,0,1,'2025-06-05 15:26:58','2025-06-05 15:26:58',100,0,0,10,10,0.00,0,1,0,NULL,0,0,0,0,NULL,NULL,NULL,NULL),(41,12,NULL,6,'liiit',1,1,0,1,'2025-06-05 15:29:33','2025-06-05 15:29:33',100,0,0,10,10,0.00,0,1,0,'',0,0,0,0,NULL,NULL,NULL,NULL),(42,13,NULL,6,'Lonlk',1,1,0,1,'2025-06-05 15:36:27','2025-06-05 15:36:27',100,0,0,10,10,0.00,0,1,0,'[]',0,0,0,0,NULL,NULL,NULL,NULL),(43,14,NULL,5,'wqd',1,1,0,1,'2025-06-05 15:41:18','2025-06-05 15:41:18',100,0,0,10,10,0.00,0,1,0,'[]',0,0,0,0,NULL,NULL,NULL,NULL),(44,6,NULL,2,'1515',1,1,0,1,'2025-06-05 15:59:36','2025-06-05 15:59:36',100,0,0,10,10,0.00,0,1,0,'[]',0,0,0,0,NULL,NULL,NULL,NULL),(45,15,NULL,7,'lok',1,1,0,1,'2025-06-06 19:08:49','2025-06-06 19:08:49',100,0,0,10,10,0.00,0,1,0,'[]',0,0,0,0,NULL,NULL,NULL,NULL),(46,16,NULL,5,'Valeria',1,1,0,1,'2025-06-10 14:40:33','2025-06-12 13:13:34',100,0,4400,50,10,0.00,0,1,18500,'[1,2,5,3,1,2,3,8,7,2]',5,3,8,7,'[90, 8, \"10.00\", \"2.00\", 0]','[0, 60, \"3.00\", \"1.10\", 120]','[0, 30, \"10.00\", \"1.50\", 70]','[0, 50, \"5.00\", \"1.20\", 100]'),(47,17,NULL,7,'kila',1,1,0,1,'2025-06-12 12:01:49','2025-06-12 12:38:18',100,0,400,10,10,0.00,0,1,3000,'[1,5]',5,1,0,0,'[75, 10, \"15.00\", \"2.50\", 0]','[0, 0, 0, 0, 0]','[0, 0, 0, 0, 0]','[0, 50, \"5.00\", \"1.20\", 100]'),(48,18,NULL,4,'valeria',1,1,0,1,'2025-06-12 12:40:48','2025-06-12 12:47:33',100,0,1700,10,10,0.00,0,1,6000,'[2,4,5,1,6]',5,2,0,0,'[45, 5, \"25.00\", \"3.00\", 0]','[0, 0, 0, 0, 0]','[0, 0, 0, 0, 0]','[0, 50, \"5.00\", \"1.20\", 100]'),(49,19,NULL,6,'Teste',1,1,0,1,'2025-06-12 12:58:25','2025-06-12 13:57:31',100,0,1200,10,10,0.00,0,2,219500,'[2,5,4,2,8,7,7,6,5,4]',5,4,8,7,'[60, 6, \"30.00\", \"3.50\", 0]','[0, 60, \"3.00\", \"1.10\", 120]','[0, 30, \"10.00\", \"1.50\", 70]','[0, 50, \"5.00\", \"1.20\", 100]'),(50,20,NULL,3,'LOKI',1,1,0,1,'2025-06-12 14:45:11','2025-06-12 14:48:06',100,0,1000,10,10,0.00,0,6,0,'[1,5,8]',5,1,8,0,'[75, 10, \"15.00\", \"2.50\", 0]','[0, 0, 0, 0, 0]','[0, 30, \"10.00\", \"1.50\", 70]','[0, 50, \"5.00\", \"1.20\", 100]');
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

-- Dump completed on 2025-06-12 16:51:27
