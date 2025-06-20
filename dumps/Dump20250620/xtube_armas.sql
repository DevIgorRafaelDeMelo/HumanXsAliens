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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armas`
--

LOCK TABLES `armas` WRITE;
/*!40000 ALTER TABLE `armas` DISABLE KEYS */;
INSERT INTO `armas` VALUES (1,'Dragunov SVD ','S','Sniper',5,180,10,60,50.00,4.00,50000,25000,'Balístico'),(2,'Steyr Scout  ','S','Sniper',5,170,15,65,45.00,3.50,45000,22500,'Balístico'),(3,'FN SCAR','A','Rifle de Assalto',4,140,20,80,35.00,3.00,30000,15000,'Físico'),(4,'AK-47  ','A','Rifle de Assalto',4,150,22,85,37.00,3.20,28000,14000,'Físico'),(5,'M4 Carbine','A','Rifle de Assalto',4,135,25,90,33.00,2.80,25000,12500,'Físico'),(6,'FN FAL','B','Rifle de Batalha',3,120,35,75,30.00,2.50,18000,9000,'Físico'),(7,'Heckler & Koch G3','B','Rifle de Batalha',3,115,40,80,28.00,2.30,16500,8250,'Físico'),(8,'M16','B','Rifle de Assalto',3,110,42,85,27.00,2.00,15000,7500,'Físico'),(9,'SIG Sauer SG 550','B','Rifle de Assalto',3,105,45,88,26.00,1.90,14000,7000,'Físico'),(10,'Steyr AUG','C','Rifle Bullpup',2,90,55,100,22.00,1.80,9000,4500,'Físico'),(11,'CZ 805 BREN','C','Rifle de Assalto',2,95,50,97,24.00,2.00,8500,4250,'Físico'),(12,'Galil AR (Israel)','C','Rifle de Assalto',2,100,48,95,23.00,2.20,8000,4000,'Físico'),(13,'Ruger Mini-14','C','Rifle Semi-Automático',2,85,60,110,20.00,1.70,7500,3750,'Balístico'),(14,'Valmet RK 62 ','D','Rifle de Assalto',1,75,65,105,18.00,1.60,5000,2500,'Físico'),(15,'Tavor TAR-21','D','Rifle Bullpup',1,72,68,102,16.00,1.50,4500,2250,'Físico'),(16,'QBZ-95 ','D','Rifle Bullpup',1,70,70,105,15.00,1.50,4000,2000,'Físico'),(17,'L85A2  ','D','Rifle Bullpup',1,78,66,98,19.00,1.70,3500,1750,'Físico'),(18,'Type 89  ','D','Rifle de Assalto',1,74,69,102,18.00,1.60,3000,1500,'Físico'),(19,'Vz. 58','D','Rifle de Assalto',1,80,64,100,20.00,1.80,2500,1250,'Físico'),(20,'AR-15','D','Rifle Semi-Automático',1,65,75,110,14.00,1.50,2000,1000,'Balístico'),(21,'M1 Helmet','2','Defensivo',5,0,50,100,5.00,1.50,150,75,'Aço'),(22,'PASGT','3','Defensivo',6,0,65,120,6.50,1.60,200,100,'Kevlar'),(23,'MICH/ACH','4','Defensivo',7,0,75,130,7.00,1.70,250,125,'Kevlar Avançado'),(24,'Fast Helmet','5','Defensivo',8,0,85,140,7.50,1.80,300,150,'Composto Modular'),(25,'Stahlhelm','3','Defensivo',6,0,55,110,6.00,1.50,180,90,'Aço'),(26,'Brodie Helmet','2','Defensivo',5,0,45,90,5.50,1.40,130,65,'Aço'),(27,'Adrian Helmet','2','Defensivo',5,0,40,85,5.00,1.30,120,60,'Aço'),(28,'SSh-40','3','Defensivo',6,0,60,115,6.00,1.50,190,95,'Aço'),(29,'TK-3','2','Defensivo',5,0,50,100,5.50,1.40,140,70,'Aço'),(30,'Type 88 Helmet','4','Defensivo',7,0,80,135,7.20,1.70,260,130,'Composto Resistente'),(31,'Colete PASGT','B','Defensivo',5,0,100,200,4.00,1.30,500,250,'Kevlar'),(32,'Interceptor Body Armor','A','Defensivo',6,0,120,220,5.50,1.40,700,350,'Kevlar Avançado'),(33,'Modular Tactical Vest','S','Defensivo',7,0,140,250,6.00,1.50,900,450,'Composto Tático'),(34,'Improved Outer Tactical Vest','S','Defensivo',8,0,160,280,6.50,1.60,1100,550,'Cerâmica Reforçada'),(35,'Colete Dragon Skin','A','Defensivo',9,0,180,300,7.00,1.70,1300,650,'Escamas Balísticas'),(36,'Colete Flak','C','Defensivo',4,0,80,160,3.50,1.20,400,200,'Fibra Sintética'),(37,'Colete M69','B','Defensivo',5,0,90,180,4.50,1.30,550,275,'Polímero Resistente'),(38,'Colete Crye Precision JPC','S','Defensivo',7,0,150,270,6.20,1.50,1000,500,'Composto Leve'),(39,'Colete SPCS','A','Defensivo',6,0,130,240,5.80,1.40,800,400,'Kevlar Reforçado'),(40,'Colete RBAV-AF','B','Defensivo',5,0,110,200,5.00,1.30,600,300,'Materiais Compostos'),(41,'Luvas Táticas Mechanix','B','Defensivo',5,0,20,50,2.00,1.20,100,50,'Sintético'),(42,'Luvas Oakley SI Assault','A','Defensivo',6,0,25,55,2.50,1.30,150,75,'Polímero'),(43,'Luvas Nomex Pilot','C','Defensivo',4,0,18,45,1.80,1.10,80,40,'Kevlar'),(44,'Luvas Wiley X TAG-1','S','Defensivo',7,0,30,60,3.00,1.40,200,100,'Composto Resistente'),(45,'Luvas 5.11 Tactical','A','Defensivo',6,0,28,58,2.80,1.30,170,85,'Fibra de Carbono'),(46,'Luvas Blackhawk Fury','B','Defensivo',5,0,22,52,2.20,1.20,120,60,'Couro Reforçado'),(47,'Luvas PIG FDT Alpha','S','Defensivo',8,0,35,65,3.50,1.50,250,125,'Material Avançado'),(48,'Luvas Hard Knuckle','A','Defensivo',6,0,26,56,2.60,1.30,160,80,'Plástico Balístico'),(49,'Luvas Tactical Fast Rope','B','Defensivo',5,0,24,54,2.40,1.20,130,65,'Kevlar'),(50,'Luvas Combat Pro','C','Defensivo',4,0,20,50,2.00,1.10,90,45,'Tecido Resistente'),(51,'Bota Bates GX-8','A','Defensivo',6,0,40,100,5.00,1.50,300,150,'Couro/Kevlar'),(52,'Bota Magnum Elite Spider','B','Defensivo',5,0,35,90,4.50,1.40,250,125,'Polímero'),(53,'Bota Danner Tachyon','S','Defensivo',7,0,45,110,6.00,1.60,400,200,'Composto Avançado'),(54,'Bota Oakley SI Light Assault','C','Defensivo',4,0,30,80,4.00,1.30,200,100,'Fibra Sintética'),(55,'Bota Belleville Tactical','A','Defensivo',6,0,42,105,5.20,1.50,320,160,'Couro'),(56,'Bota Under Armour Valsetz RTS','B','Defensivo',5,0,38,95,4.80,1.40,280,140,'Poliéster Reforçado'),(57,'Bota 5.11 ATAC Storm','S','Defensivo',8,0,50,120,6.50,1.70,450,225,'Material Avançado'),(58,'Bota Rocky S2V','A','Defensivo',7,0,44,108,5.50,1.60,350,175,'Fibra de Carbono'),(59,'Bota Tactical Research Khyber','B','Defensivo',5,0,36,92,4.70,1.40,260,130,'Nylon Reforçado'),(60,'Bota Combat Pro','C','Defensivo',4,0,33,85,4.20,1.30,220,110,'Tecido Resistente');
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

-- Dump completed on 2025-06-20 15:43:50
