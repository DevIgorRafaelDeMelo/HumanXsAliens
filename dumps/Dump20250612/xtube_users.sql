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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'igor','rafaelmelo765@gmail.com','$2b$10$ASRBGtINqxT6Fo3qEF44ROHMXyNIhEkgo7XesAbzcMyEZXTHHYRC2','2025-05-27 00:36:17'),(2,'igor','rafaelmelo766@gmail.com','$2b$10$ZfIq.95GT/coX3YXg3zoEe2vmWb1Yu6FMegd9ylwOhDPAuAkCwL7q','2025-05-31 16:17:25'),(3,'IGOR','rafaelmelo7625@gmail.com','$2b$10$yeKwEaupXRiJ/jTrwdKc4epqpjTrqBKr4aMTNqK5tIXMHFyfx0b2u','2025-06-03 02:53:00'),(4,'gmail','rafaelmelo2765@gmail.com','$2b$10$9u5ctb2olYkbKBFmEAYYGOKH4vZ5Y6jl1yUcdH0DHcNHDCiMufAai','2025-06-03 02:59:00'),(5,'lindo','rafaelmelo7652@gmail.com','$2b$10$m.9xN6TTNQQHCsXr0vr6L.jnIjmFS4cGAzFUA4w9xRwJdyGvnVUQi','2025-06-03 03:02:26'),(6,'Met44','rafaelmelo8765@gmail.com','$2b$10$FeyxpXzUAWZZkOGZzvbYP.sAWgZExxxRELM.Y9cKj7NsiEJOpyH/y','2025-06-03 20:45:15'),(7,'Valeria','rafaelmelo1765@gmail.com','$2b$10$2ROu0.0J5U7/qUQPmY8G0.UPHvIrfXNajOhIFyGvrXESHIbsMmIrS','2025-06-05 11:36:46'),(8,'igor','igor@gmail.com','$2b$10$H325sI5Ri5ol9JXAt7HQ6uJbGf.HPUMU7o5CB7fCWLUz41NTtQJd.','2025-06-05 15:12:27'),(9,'123','bruno@gmail.com','$2b$10$wdpdO/suDVsUiweEVOqmDelCN.XcEKuYfWtNina7byAMmG8DmPV1W','2025-06-05 15:15:02'),(10,'MET4','MET@HORQW','$2b$10$tQW2uq0QCBHe0V.5TDyViuVAH8VUO5G/4l/pH7nWj7.KME5k0s4hi','2025-06-05 15:19:27'),(11,'kit','kit@gmail.com','$2b$10$7fRhniemYAcpPTQGHmQQEuSNOOhoQ5BOFWV.E12lLZXO0K4eUwfK2','2025-06-05 15:25:39'),(12,'kits','kit@qw','$2b$10$qEdxXaqyCbxQcFMAsoQZGO/WP37jeAuq7S1sYcKspLKnIcIgAfnYa','2025-06-05 15:29:27'),(13,'grae','wrwe@efw','$2b$10$QHZJr2TEIgaL3sBl/.fvEuoDJAVC7JJN6xr.dn3q7AfFoWnUQwTxm','2025-06-05 15:36:14'),(14,'21','wrwe@efw3','$2b$10$C2lUCDCffZWc52lQQZ2JY.BWWNNAoqn.VEVY3o3Z1W.5cBSFEbE2G','2025-06-05 15:41:14'),(15,'212','rafaelmelo72132265@gmail.com','$2b$10$26AMAyZia.idjmFcwyPb8O.CHd80L7uH510KG3kQ7cZXjsMYxjiIC','2025-06-06 19:08:43'),(16,'Valeria','rafaelmelo725265@gmail.com','$2b$10$Zn7JOgU44lVGsFugXqsAje5e.FPLl2RW5h03T.Ma7CfXNXmJDfnnS','2025-06-10 14:40:21'),(17,'Valeria1','rafaelmelo76665@gmail.com','$2b$10$01tTxcyRDecTsJuFcTFSNurBjEHRDoWyQiQ1NvxHB4sSWFZJcJo/K','2025-06-12 11:57:04'),(18,'valeria','valeria@krafti.com.br','$2b$10$x7fOFJi46zSnpSq9DBkjMu8vmhuHe/KTy0ixcTgO5m1MAQAabbwym','2025-06-12 12:40:31'),(19,'Teste','bruno2@gmail.com','$2b$10$1Apqr.u6ysPRbqxJx/3LiOhs6sjen1sJB2v4xWJE5TQvII4D/8cc2','2025-06-12 12:58:10'),(20,'loki','qedwq@wsfWE','$2b$10$Dp9KVmExpYVvY9ABfFWiEO8QIpLI4eWOMW/TGw59ve7e.ZFkfOaha','2025-06-12 14:45:05');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
