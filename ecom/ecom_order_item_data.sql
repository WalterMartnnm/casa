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
-- Table structure for table `order_item_data`
--

DROP TABLE IF EXISTS `order_item_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item_data` (
  `id` int NOT NULL,
  `created` datetime DEFAULT NULL,
  `customerId` int NOT NULL,
  `customerName` varchar(255) DEFAULT NULL,
  `lastUpdated` datetime DEFAULT NULL,
  `orderId` int NOT NULL,
  `price` double NOT NULL,
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
-- Dumping data for table `order_item_data`
--

LOCK TABLES `order_item_data` WRITE;
/*!40000 ALTER TABLE `order_item_data` DISABLE KEYS */;
INSERT INTO `order_item_data` VALUES (26,'2024-10-16 14:30:53',1,'Mary Grace','2024-10-16 14:30:53',1,2.2,'Milk','Best for dessert',1,'Milkmaid','MilkMaid',NULL,2,1),(27,'2024-10-16 14:33:29',1,'Mary Grace','2024-10-16 14:33:29',0,2.2,'Milk','Best for drink',1,'Milo','Milo','box',2,0),(28,'2024-10-16 14:57:38',2,'Antonette Foz','2024-10-16 14:57:38',0,2.2,'Milk','Best for drink',1,'Milo','Milo','box',2,1),(30,'2024-10-23 10:30:22',1,'Mary Grace','2024-10-23 10:30:22',1,3.2,'Milk','Best for drink',1,'Milo','Milo','box',2,0),(31,'2024-10-23 10:34:41',1,'Mary Grace','2024-10-23 10:34:41',1,3.2,'Milk','Best for drink',1,'Milo','Milo','box',2,0),(32,'2024-10-23 10:35:40',1,'Mary Grace','2024-10-23 10:35:40',1,3.2,'Milk','Best for drink',1,'Milo','Milo','box',2,0),(33,'2024-10-23 15:38:59',1,'Mary Grace','2024-10-23 15:38:59',1,3.2,'Milk','Best for drink',1,'Milo','Milo','box',2,0),(34,'2024-10-23 15:54:42',1,'','2024-10-23 15:54:42',0,10,'Snacks','This is a description of Cardbury',3,'cardbury','Cardbury','ounce',1,1),(35,'2024-10-23 15:57:30',1,'','2024-10-23 15:57:30',0,350,'AUdio','This is a description of another soundbar',1,'soundar2','soundar2','piece',1,0),(36,'2024-10-23 16:20:44',1,'','2024-10-23 16:20:44',0,10,'Snacks','This is a description of Cardbury',3,'cardbury','Cardbury','ounce',1,NULL),(37,'2024-10-23 16:23:18',1,'Mary Grace','2024-10-23 16:23:18',1,3.2,'Milk','Best for drink',1,'Milo','Milo','box',2,0),(38,'2024-10-23 16:28:25',1,'','2024-10-23 16:28:25',0,10,'Snacks','This is a description of Cardbury',3,'cardbury','Cardbury','ounce',1,0);
/*!40000 ALTER TABLE `order_item_data` ENABLE KEYS */;
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
