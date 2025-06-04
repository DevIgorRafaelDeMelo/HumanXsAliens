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
-- Table structure for table `andares`
--

DROP TABLE IF EXISTS `andares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `andares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `aliens_ids` json NOT NULL,
  `finish` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `andares`
--

LOCK TABLES `andares` WRITE;
/*!40000 ALTER TABLE `andares` DISABLE KEYS */;
INSERT INTO `andares` VALUES (1,'Sala 1 - Zona Inicial','[1, 2, 3, 4, 5]',1),(2,'Sala 2 - Pátio Abandonado','[2, 3, 4, 5, 6]',0),(3,'Sala 3 - Entrada Sombria','[3, 4, 5, 6, 7]',0),(4,'Sala 4 - Passagem Perdida','[4, 5, 6, 7, 8]',0),(5,'Sala 5 - Corredor Nebuloso','[5, 6, 7, 8, 9]',0),(6,'Sala 6 - Câmara de Energia','[6, 7, 8, 9, 10]',0),(7,'Sala 7 - Refúgio Esquecido','[7, 8, 9, 10, 11]',0),(8,'Sala 8 - Fortaleza Xyrox','[8, 9, 10, 11, 12]',0),(9,'Sala 9 - Vórtice de Plasma','[9, 10, 11, 12, 13]',0),(10,'Sala 10 - Arena dos Caídos','[10, 11, 12, 13, 14]',0),(11,'Sala 11 - Fronteira da Perdição','[11, 12, 13, 14, 15]',0),(12,'Sala 12 - Santuário Nebular','[12, 13, 14, 15, 16]',0),(13,'Sala 13 - Desfiladeiro Cósmico','[13, 14, 15, 16, 17]',0),(14,'Sala 14 - Abismo Xytron','[14, 15, 16, 17, 18]',0),(15,'Sala 15 - Dimensão Perdida','[15, 16, 17, 18, 19]',0),(16,'Sala 16 - Caverna de Kragnar','[16, 17, 18, 19, 20]',0),(17,'Sala 17 - Núcleo Estelar','[17, 18, 19, 20, 21]',0),(18,'Sala 18 - Torre Celestial','[18, 19, 20, 21, 22]',0),(19,'Sala 19 - Terra dos Imortais','[19, 20, 21, 22, 23]',0),(20,'Sala 20 - Fenda do Destino','[20, 21, 22, 23, 24]',0),(21,'Sala 21 - Base dos Místicos','[21, 22, 23, 24, 25]',0);
/*!40000 ALTER TABLE `andares` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-04 17:41:21
