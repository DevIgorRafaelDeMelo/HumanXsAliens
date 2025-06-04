-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: xtube
-- ------------------------------------------------------
-- Server version	9.3.0

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'igor','rafaelmelo765@gmail.com','$2b$10$ASRBGtINqxT6Fo3qEF44ROHMXyNIhEkgo7XesAbzcMyEZXTHHYRC2','2025-05-27 00:36:17'),(2,'igor','rafaelmelo766@gmail.com','$2b$10$ZfIq.95GT/coX3YXg3zoEe2vmWb1Yu6FMegd9ylwOhDPAuAkCwL7q','2025-05-31 16:17:25'),(3,'IGOR','rafaelmelo7625@gmail.com','$2b$10$yeKwEaupXRiJ/jTrwdKc4epqpjTrqBKr4aMTNqK5tIXMHFyfx0b2u','2025-06-03 02:53:00'),(4,'gmail','rafaelmelo2765@gmail.com','$2b$10$9u5ctb2olYkbKBFmEAYYGOKH4vZ5Y6jl1yUcdH0DHcNHDCiMufAai','2025-06-03 02:59:00'),(5,'lindo','rafaelmelo7652@gmail.com','$2b$10$m.9xN6TTNQQHCsXr0vr6L.jnIjmFS4cGAzFUA4w9xRwJdyGvnVUQi','2025-06-03 03:02:26'),(6,'loff','rafaelmelo9765@gmail.com','$2b$10$t0xBPmvigM9l8.ri2EdwW.nVoRn1HXEPwgmemEBUV8IA8PwTkz8Qe','2025-06-03 21:57:42'),(7,'kit','rafaelmelo65@gmail.com','$2b$10$7tWFQM5z8bul3FwGdD0ZTuotrlTZrlcM4Wz8PMuoJdvvmS3VpeIre','2025-06-03 22:01:32'),(8,'frer','rafaelmelo5@gmail.com','$2b$10$iskM.z4tPz.SlrINSZd7ZORNhIfq4OeDuC/.yj1aMP1wz2.88NlRq','2025-06-03 22:13:09'),(9,'kittaa','rafaelmelo@gmail.com','$2b$10$VVTg3RnuEJl/E033NtIOeesv91UUcoMt7/pq1jAjHRK2K05VstcEe','2025-06-03 22:30:08'),(10,'kioqwe','rafael@gmail.com','$2b$10$u/yFoLQLZLLVLcsgf2Kwr.pf1MPIHAPVOqU/qbbTJ5PQ6f1G6XM2m','2025-06-03 22:30:30'),(11,'qwdqwd','rafaelm@gmail.com','$2b$10$SPlSiGXLb4E0cJEfOAcCO.tGt2sKn2ZxzHW4N0m4Ho6JSh4sR7Fni','2025-06-03 22:43:52');
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

-- Dump completed on 2025-06-03 23:52:24
