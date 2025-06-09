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
-- Table structure for table `aliens`
--

DROP TABLE IF EXISTS `aliens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aliens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `nv` int NOT NULL,
  `vida` int NOT NULL,
  `defesa` int NOT NULL,
  `ataque` int NOT NULL,
  `chance_critico` float NOT NULL,
  `tier` enum('Comum','Raro','Épico','Lendário','Mítico') NOT NULL,
  `boss` tinyint(1) DEFAULT '0',
  `img_principal` varchar(255) NOT NULL,
  `max_health` int DEFAULT NULL,
  `live` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aliens`
--

LOCK TABLES `aliens` WRITE;
/*!40000 ALTER TABLE `aliens` DISABLE KEYS */;
INSERT INTO `aliens` VALUES (1,'Xytrax',3,120,5,15,5,'Comum',0,'Alien1',120,0),(2,'Blorph',5,180,8,25,7.5,'Comum',0,' ./Img/alien1.jpeg',180,0),(3,'Gruxon',4,140,9,22,6,'Comum',0,' ../Img/alien1.jpeg',140,0),(4,'Zilnax',2,100,15,12,3.5,'Comum',0,' alien.jpeg',100,0),(5,'Vorbok',6,200,40,30,9,'Comum',0,' ',200,0),(6,'Nytheron',7,350,70,60,12.5,'Raro',0,'img/aliens/nytheron.png',350,0),(7,'Kragmos',8,400,75,65,15,'Raro',0,'img/aliens/kragmos.png',400,0),(8,'Voltrex',9,450,80,70,17.5,'Raro',0,'img/aliens/voltrex.png',450,0),(9,'Blazir',10,500,85,75,20,'Raro',0,'img/aliens/blazir.png',500,0),(10,'Zyphor',11,520,90,80,22.5,'Raro',0,'img/aliens/zyphor.png',520,0),(11,'Omnitor',12,700,120,500,25,'Épico',0,'img/aliens/omnitor.png',700,1),(12,'Drakonis',13,750,130,100,27.5,'Épico',0,'img/aliens/drakonis.png',750,1),(13,'Tyrnex',14,800,140,110,30,'Épico',0,'img/aliens/tyrnex.png',800,1),(14,'Xyrox',15,850,150,115,32.5,'Épico',0,'img/aliens/xyrox.png',850,1),(15,'Nebulon',16,900,160,120,35,'Épico',0,'img/aliens/nebulon.png',900,1),(16,'Kragnar',18,1200,200,160,40,'Lendário',1,'img/aliens/kragnar.png',1200,1),(17,'Zephyros',19,1300,220,170,42.5,'Lendário',1,'img/aliens/zephyros.png',1300,1),(18,'Azorth',20,1400,240,180,45,'Lendário',1,'img/aliens/azorth.png',1400,1),(19,'Valtrak',21,1500,260,190,47.5,'Lendário',1,'img/aliens/valtrak.png',1500,1),(20,'Droxal',22,1600,280,200,50,'Lendário',1,'img/aliens/droxal.png',1600,1),(21,'Oblivion',25,2000,350,250,60,'Mítico',1,'img/aliens/oblivion.png',2000,1),(22,'Zornax',26,2200,380,270,62.5,'Mítico',1,'img/aliens/zornax.png',2200,1),(23,'Celestior',27,2400,400,290,65,'Mítico',1,'img/aliens/celestior.png',2400,1),(24,'Voidborn',28,2600,450,320,70,'Mítico',1,'img/aliens/voidborn.png',2600,1),(25,'Endurion',30,3000,500,350,75,'Mítico',1,'img/aliens/endurion.png',3000,1);
/*!40000 ALTER TABLE `aliens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 16:10:33
