-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: ecom
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `product_data`
--

DROP TABLE IF EXISTS `product_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_data` (
  `id` int NOT NULL,
  `categoryName` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `imageFile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `unitOfMeasure` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `customerId` int NOT NULL,
  `customerName` varchar(255) DEFAULT NULL,
  `lastUpdated` datetime DEFAULT NULL,
  `orderId` int NOT NULL,
  `productCategoryName` varchar(255) DEFAULT NULL,
  `productDescription` varchar(255) DEFAULT NULL,
  `productId` int NOT NULL,
  `productImageFile` varchar(255) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `productUnitOfMeasure` varchar(255) DEFAULT NULL,
  `quantity` double NOT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_data`
--

LOCK TABLES `product_data` WRITE;
/*!40000 ALTER TABLE `product_data` DISABLE KEYS */;
INSERT INTO `product_data` VALUES (1,'AUdio','This is a description of another soundbar','soundar2','soundar2','350.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),(2,'Snack','This is a description of Alaska','Alaska','Alaska','30.00','can',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),(3,'Snacks','This is a description of Cardbury','cardbury','Cardbury','10.00','ounce',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),(4,'Snacks','This is a description of Milo','milo','Milo','120.00','can',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),(5,'Audio','This is a description of Denon receiver','denonreceiver','denonreceiver','1420.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),(6,'Audio','This is a description of Mango','mango','Mango','0.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),(7,'AUdio','This is a description of another soundbar','soundar2','soundar2','350.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),(8,'AUdio','This is a description of another soundbar','soundar2','soundar2','350.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),(9,'AUdio','This is a description of another soundbar','soundar2','soundar2','350.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `product_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-02  8:30:00
