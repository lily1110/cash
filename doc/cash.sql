# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.10)
# Database: xydd
# Generation Time: 2016-08-23 03:20:44 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table c_exception
# ------------------------------------------------------------

DROP TABLE IF EXISTS `c_exception`;

CREATE TABLE `c_exception` (
  `exception_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `operator` varchar(100) NOT NULL DEFAULT '',
  `oper_date` date DEFAULT NULL,
  `table_no` int(11) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `amount_actual` int(11) DEFAULT NULL,
  `discount_amount` int(11) DEFAULT NULL,
  `discount_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `c_exception` WRITE;
/*!40000 ALTER TABLE `c_exception` DISABLE KEYS */;

INSERT INTO `c_exception` (`exception_id`, `order_id`, `operator`, `oper_date`, `table_no`, `payment_type`, `amount_actual`, `discount_amount`, `discount_type`)
VALUES
	(1,100001,'AAA','2016-06-03',1,'现金',133,50,'赠送'),
	(3,100002,'AAA','2016-06-03',2,'现金',43,20,'打折'),
	(4,100003,'BBB','2016-06-03',3,'现金',56,35,'赠送'),
	(2,100004,'BBB','2016-06-03',4,'现金',124,23,'退菜');

/*!40000 ALTER TABLE `c_exception` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table c_main
# ------------------------------------------------------------

DROP TABLE IF EXISTS `c_main`;

CREATE TABLE `c_main` (
  `date` date NOT NULL,
  `hour` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `amount_actual` int(11) DEFAULT NULL,
  `order_qty` int(11) DEFAULT NULL,
  `number_back` int(11) DEFAULT NULL,
  `is_paid` int(11) DEFAULT NULL,
  `ppl_num` int(11) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `discount_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `c_main` WRITE;
/*!40000 ALTER TABLE `c_main` DISABLE KEYS */;

INSERT INTO `c_main` (`date`, `hour`, `amount`, `discount`, `amount_actual`, `order_qty`, `number_back`, `is_paid`, `ppl_num`, `payment_type`, `discount_type`)
VALUES
	('2016-06-02',17,137,0,137,3,1,0,12,'优惠券','退菜'),
	('2016-06-02',10,25,0,25,1,1,1,4,'刷卡','退菜'),
	('2016-06-02',11,578,0,578,18,1,1,72,'现金','退菜'),
	('2016-06-02',12,517,0,517,16,NULL,1,64,'第三方',''),
	('2016-06-02',13,373,0,373,9,2,1,36,'优惠券','退菜'),
	('2016-06-02',14,208,0,208,3,3,1,12,'刷卡','退菜'),
	('2016-06-02',16,307,0,307,5,1,1,20,'现金','退菜'),
	('2016-06-01',13,37,0,37,3,NULL,1,12,'第三方',''),
	('2016-06-01',20,385,0,385,6,NULL,1,24,'优惠券',''),
	('2016-06-01',12,687,0,687,16,NULL,1,64,'刷卡',''),
	('2016-06-01',19,262,0,262,10,NULL,1,40,'现金',''),
	('2016-06-01',11,828,0,828,25,2,1,100,'第三方','退菜'),
	('2016-06-01',18,913,0,913,21,NULL,1,84,'优惠券',''),
	('2016-06-01',10,112,0,112,4,NULL,1,16,'刷卡',''),
	('2016-06-01',17,672,0,672,16,3,1,64,'现金','退菜'),
	('2016-06-01',16,41,0,41,1,NULL,1,4,'第三方',''),
	('2016-05-31',16,34,0,34,1,NULL,1,4,'优惠券',''),
	('2016-05-31',17,295,0,295,6,NULL,1,24,'刷卡',''),
	('2016-05-31',20,155,0,155,4,1,1,16,'现金','退菜'),
	('2016-05-31',12,806,0,806,20,1,1,80,'第三方','退菜'),
	('2016-05-31',13,255,0,255,10,1,1,40,'优惠券','退菜'),
	('2016-05-31',18,690,0,690,10,1,1,40,'刷卡','退菜'),
	('2016-05-31',10,98,0,98,3,NULL,1,12,'现金',''),
	('2016-05-31',19,1187,0,1187,22,2,1,88,'第三方','退菜'),
	('2016-05-31',11,713,0,713,18,3,1,72,'优惠券','退菜'),
	('2016-05-30',20,368,0,368,7,1,1,28,'刷卡','退菜'),
	('2016-05-30',12,846,58,788,22,NULL,1,88,'现金','打折'),
	('2016-05-30',19,528,0,528,11,NULL,1,44,'第三方',''),
	('2016-05-30',11,485,0,485,17,NULL,1,68,'优惠券',''),
	('2016-05-30',18,372,0,372,8,NULL,1,32,'刷卡',''),
	('2016-05-30',17,204,68,136,6,2,1,24,'现金','赠送'),
	('2016-05-30',16,233,233,0,2,NULL,1,8,'第三方','打折'),
	('2016-05-30',22,391,0,391,3,NULL,1,12,'优惠券','赠送'),
	('2016-05-30',13,428,213,215,10,3,1,40,'刷卡','赠送'),
	('2016-05-29',20,373,0,373,3,NULL,1,12,'现金','赠送'),
	('2016-05-29',12,877,181,696,19,NULL,1,76,'第三方','打折'),
	('2016-05-29',19,452,0,452,11,NULL,1,44,'优惠券','赠送'),
	('2016-05-29',11,721,77,644,28,1,1,112,'刷卡','赠送'),
	('2016-05-29',18,662,95,567,11,1,1,44,'现金','打折'),
	('2016-05-29',10,82,58,24,2,1,1,8,'第三方','赠送'),
	('2016-05-29',17,562,82,480,9,1,1,36,'优惠券','打折'),
	('2016-05-29',16,281,0,281,7,NULL,1,28,'刷卡',''),
	('2016-05-29',15,72,0,72,3,2,1,12,'现金','退菜'),
	('2016-05-29',14,81,0,81,2,3,1,8,'第三方','退菜'),
	('2016-05-29',13,617,0,617,10,1,1,40,'优惠券','退菜'),
	('2016-05-28',15,51,0,51,2,NULL,1,8,'刷卡',''),
	('2016-05-28',16,204,124,80,3,NULL,1,12,'现金','赠送'),
	('2016-05-28',14,208,0,208,4,NULL,1,16,'第三方',''),
	('2016-05-28',21,34,10,24,2,NULL,1,8,'优惠券','打折'),
	('2016-05-28',12,954,216,738,18,2,1,72,'刷卡','退菜'),
	('2016-05-28',19,409,0,409,7,NULL,1,28,'现金',''),
	('2016-05-28',13,324,117,207,10,NULL,1,40,'第三方','打折'),
	('2016-05-28',20,383,0,383,5,3,1,20,'优惠券','退菜'),
	('2016-05-28',10,121,0,121,4,NULL,1,16,'刷卡',''),
	('2016-05-28',17,358,10,348,11,NULL,1,44,'现金','赠送'),
	('2016-05-28',11,696,165,531,18,NULL,1,72,'第三方','打折'),
	('2016-05-28',18,539,76,463,11,1,1,44,'优惠券','赠送'),
	('2016-05-27',19,883,235,648,14,1,1,56,'刷卡','打折'),
	('2016-05-27',11,1068,157,911,35,1,1,140,'现金','赠送'),
	('2016-05-27',10,184,0,184,1,1,1,4,'第三方','退菜'),
	('2016-05-27',18,356,84,272,11,NULL,1,44,'优惠券','打折'),
	('2016-05-27',13,173,0,173,7,2,1,28,'刷卡','退菜'),
	('2016-05-27',20,100,0,100,1,3,1,4,'现金','退菜'),
	('2016-05-27',12,674,65,609,25,1,1,100,'第三方','赠送'),
	('2016-05-27',15,15,0,15,1,NULL,1,4,'优惠券',''),
	('2016-05-27',22,239,0,239,2,NULL,1,8,'刷卡',''),
	('2016-05-27',17,105,0,105,4,NULL,1,16,'现金',''),
	('2016-05-27',16,110,0,110,5,NULL,1,20,'第三方',''),
	('2016-05-26',17,508,0,508,7,2,1,28,'优惠券','退菜'),
	('2016-05-26',18,665,0,665,19,NULL,1,76,'刷卡',''),
	('2016-05-26',16,47,0,47,2,NULL,1,8,'现金',''),
	('2016-05-26',13,561,0,561,16,3,1,64,'第三方','退菜'),
	('2016-05-26',14,78,78,0,1,NULL,1,4,'优惠券','打折'),
	('2016-05-26',19,458,0,458,11,NULL,1,44,'刷卡',''),
	('2016-05-26',11,506,133,373,18,NULL,1,72,'现金','赠送'),
	('2016-05-26',20,329,0,329,8,1,1,32,'第三方','退菜'),
	('2016-05-26',12,757,120,637,23,1,1,92,'现金','打折'),
	('2016-05-25',20,170,35,135,6,1,1,24,'优惠券','赠送'),
	('2016-05-25',13,370,0,370,8,1,1,32,'刷卡','退菜'),
	('2016-05-25',19,531,0,531,11,NULL,1,44,'现金',''),
	('2016-05-25',12,773,365,408,20,2,1,80,'第三方','打折'),
	('2016-05-25',21,26,0,26,1,3,1,4,'优惠券','退菜'),
	('2016-05-25',14,22,0,22,1,1,1,4,'刷卡','退菜'),
	('2016-05-25',16,19,0,19,1,NULL,1,4,'现金',''),
	('2016-05-25',18,608,94,514,13,NULL,1,52,'第三方','赠送'),
	('2016-05-25',11,430,44,386,16,NULL,1,64,'优惠券','打折'),
	('2016-05-25',17,557,0,557,15,NULL,1,60,'刷卡',''),
	('2016-05-24',10,138,0,138,4,2,1,16,'现金','退菜'),
	('2016-05-24',21,84,0,84,1,NULL,1,4,'第三方',''),
	('2016-05-24',20,234,0,234,5,NULL,1,20,'优惠券',''),
	('2016-05-24',11,583,105,478,22,3,1,88,'刷卡','赠送'),
	('2016-05-24',19,518,0,518,10,NULL,1,40,'现金',''),
	('2016-05-24',12,568,192,376,18,NULL,1,72,'第三方','打折'),
	('2016-05-24',18,854,0,854,14,NULL,1,56,'优惠券',''),
	('2016-05-24',13,360,123,237,9,1,1,36,'刷卡','赠送'),
	('2016-05-24',17,428,0,428,7,NULL,1,28,'现金',''),
	('2016-05-24',14,37,0,37,2,NULL,1,8,'第三方',''),
	('2016-05-24',16,131,0,131,3,3,1,12,'优惠券','退菜'),
	('2016-05-23',11,469,0,469,17,NULL,1,68,'刷卡',''),
	('2016-05-23',18,521,0,521,15,NULL,1,60,'现金',''),
	('2016-05-23',12,511,0,511,21,NULL,1,84,'第三方',NULL);

/*!40000 ALTER TABLE `c_main` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
