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
-- Table structure for table `armas`
--

DROP TABLE IF EXISTS `armas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `armas` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOME` varchar(50) DEFAULT NULL,
  `TIER` varchar(10) DEFAULT NULL,
  `CATEGORIA` varchar(30) DEFAULT NULL,
  `NIVEL` int DEFAULT NULL,
  `DANO` int DEFAULT NULL,
  `DEFESSA` int DEFAULT NULL,
  `VIDA` int DEFAULT NULL,
  `CRITICO` decimal(5,2) DEFAULT NULL,
  `MULTIPLO_CRITICO` decimal(5,2) DEFAULT NULL,
  `PRECO` int DEFAULT NULL,
  `PRECO_VENDA` int DEFAULT NULL,
  `TYPE` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armas`
--

LOCK TABLES `armas` WRITE;
/*!40000 ALTER TABLE `armas` DISABLE KEYS */;
INSERT INTO `armas` VALUES (1,'Dragunov SVD (Sniper)','S','Sniper',5,180,10,60,50.00,4.00,50000,25000,'Balístico'),(2,'Steyr Scout (Precisão)','S','Sniper',5,170,15,65,45.00,3.50,45000,22500,'Balístico'),(3,'FN SCAR','A','Rifle de Assalto',4,140,20,80,35.00,3.00,30000,15000,'Físico'),(4,'AK-47 (Kalashnikov)','A','Rifle de Assalto',4,150,22,85,37.00,3.20,28000,14000,'Físico'),(5,'M4 Carbine','A','Rifle de Assalto',4,135,25,90,33.00,2.80,25000,12500,'Físico'),(6,'FN FAL','B','Rifle de Batalha',3,120,35,75,30.00,2.50,18000,9000,'Físico'),(7,'Heckler & Koch G3','B','Rifle de Batalha',3,115,40,80,28.00,2.30,16500,8250,'Físico'),(8,'M16','B','Rifle de Assalto',3,110,42,85,27.00,2.00,15000,7500,'Físico'),(9,'SIG Sauer SG 550','B','Rifle de Assalto',3,105,45,88,26.00,1.90,14000,7000,'Físico'),(10,'Steyr AUG','C','Rifle Bullpup',2,90,55,100,22.00,1.80,9000,4500,'Físico'),(11,'CZ 805 BREN','C','Rifle de Assalto',2,95,50,97,24.00,2.00,8500,4250,'Físico'),(12,'Galil AR (Israel)','C','Rifle de Assalto',2,100,48,95,23.00,2.20,8000,4000,'Físico'),(13,'Ruger Mini-14','C','Rifle Semi-Automático',2,85,60,110,20.00,1.70,7500,3750,'Balístico'),(14,'Valmet RK 62 (Finlândia)','D','Rifle de Assalto',1,75,65,105,18.00,1.60,5000,2500,'Físico'),(15,'Tavor TAR-21','D','Rifle Bullpup',1,72,68,102,16.00,1.50,4500,2250,'Físico'),(16,'QBZ-95 (China)','D','Rifle Bullpup',1,70,70,105,15.00,1.50,4000,2000,'Físico'),(17,'L85A2 (Reino Unido)','D','Rifle Bullpup',1,78,66,98,19.00,1.70,3500,1750,'Físico'),(18,'Type 89 (Japão)','D','Rifle de Assalto',1,74,69,102,18.00,1.60,3000,1500,'Físico'),(19,'Vz. 58 (República Tcheca)','D','Rifle de Assalto',1,80,64,100,20.00,1.80,2500,1250,'Físico'),(20,'AR-15','D','Rifle Semi-Automático',1,65,75,110,14.00,1.50,2000,1000,'Balístico');
/*!40000 ALTER TABLE `armas` ENABLE KEYS */;
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
