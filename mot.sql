-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versi server:                 10.1.22-MariaDB - mariadb.org binary distribution
-- OS Server:                    Win64
-- HeidiSQL Versi:               9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for mot
DROP DATABASE IF EXISTS `mot`;
CREATE DATABASE IF NOT EXISTS `mot` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mot`;


-- Dumping structure for table mot.members
DROP TABLE IF EXISTS `members`;
CREATE TABLE IF NOT EXISTS `members` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(250) COLLATE latin1_general_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `alamat` varchar(250) COLLATE latin1_general_ci DEFAULT NULL,
  `email` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `telepon` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Dumping data for table mot.members: ~0 rows (approximately)
DELETE FROM `members`;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` (`id`, `nama`, `tanggal_lahir`, `alamat`, `email`, `telepon`) VALUES
	(1, 'Trest Amar', '2017-06-22', 'yk', 'trest@yahoo.com', '08889000766'),
	(2, 'Mimi', '2015-06-02', 'Bantul', 'mimi@gmail.com', '0274-3569970');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;


-- Dumping structure for table mot.system_menu
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE IF NOT EXISTS `system_menu` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(20) unsigned NOT NULL DEFAULT '0',
  `href` varchar(50) CHARACTER SET latin1 DEFAULT '#',
  `code` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `url` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `name` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `order_number` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Dumping data for table mot.system_menu: ~7 rows (approximately)
DELETE FROM `system_menu`;
/*!40000 ALTER TABLE `system_menu` DISABLE KEYS */;
INSERT INTO `system_menu` (`id`, `parent_id`, `href`, `code`, `url`, `name`, `order_number`) VALUES
	(1, 0, '#', 'VIEW_DASHBOARD', 'dashboard.html', 'Dashboard', 0),
	(2, 0, '#', 'VIEW_MENU', 'Menu', 'Menu', 2),
	(3, 0, '#', 'VIEW_SETTING', 'Setting', 'Setting', 3),
	(4, 3, '#', 'VIEW_HAK_AKSES', 'hak-akses.html', 'Hak Akses', 0),
	(5, 3, '#', 'VIEW_USER_MANAGEMENT', 'user-management.html', 'User', 2),
	(6, 0, '#', 'VIEW_MASTER', 'Master', 'Master', 1),
	(7, 6, '#', 'VIEW_MASTER_MEMBERS', 'members.html', 'Master Member', 1);
/*!40000 ALTER TABLE `system_menu` ENABLE KEYS */;


-- Dumping structure for table mot.system_role
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE IF NOT EXISTS `system_role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Dumping data for table mot.system_role: ~2 rows (approximately)
DELETE FROM `system_role`;
/*!40000 ALTER TABLE `system_role` DISABLE KEYS */;
INSERT INTO `system_role` (`id`, `nama`) VALUES
	(1, 'ADMIN'),
	(2, 'USER');
/*!40000 ALTER TABLE `system_role` ENABLE KEYS */;


-- Dumping structure for table mot.system_role_menu
DROP TABLE IF EXISTS `system_role_menu`;
CREATE TABLE IF NOT EXISTS `system_role_menu` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  `can_read` tinyint(4) DEFAULT '0',
  `can_edit` tinyint(4) DEFAULT '0',
  `can_save` tinyint(4) DEFAULT '0',
  `can_delete` tinyint(4) DEFAULT '0',
  `can_print` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Dumping data for table mot.system_role_menu: ~14 rows (approximately)
DELETE FROM `system_role_menu`;
/*!40000 ALTER TABLE `system_role_menu` DISABLE KEYS */;
INSERT INTO `system_role_menu` (`id`, `menu_id`, `role_id`, `can_read`, `can_edit`, `can_save`, `can_delete`, `can_print`) VALUES
	(1, 1, 1, 1, 0, 0, 0, 0),
	(2, 2, 1, 0, 0, 0, 0, 0),
	(3, 3, 1, 1, 0, 0, 0, 0),
	(4, 4, 1, 1, 0, 0, 0, 0),
	(5, 5, 1, 1, 0, 0, 0, 0),
	(6, 6, 1, 1, 0, 0, 0, 0),
	(7, 7, 1, 1, 0, 0, 0, 0),
	(37, 1, 2, 0, 0, 0, 0, 0),
	(38, 6, 2, 1, 0, 0, 0, 0),
	(39, 2, 2, 0, 0, 0, 0, 0),
	(40, 3, 2, 0, 0, 0, 0, 0),
	(41, 7, 2, 1, 0, 0, 0, 0),
	(42, 4, 2, 0, 0, 0, 0, 0),
	(43, 5, 2, 0, 0, 0, 0, 0);
/*!40000 ALTER TABLE `system_role_menu` ENABLE KEYS */;


-- Dumping structure for table mot.system_role_user
DROP TABLE IF EXISTS `system_role_user`;
CREATE TABLE IF NOT EXISTS `system_role_user` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(10) NOT NULL,
  `role_id` bigint(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Dumping data for table mot.system_role_user: ~5 rows (approximately)
DELETE FROM `system_role_user`;
/*!40000 ALTER TABLE `system_role_user` DISABLE KEYS */;
INSERT INTO `system_role_user` (`id`, `user_id`, `role_id`) VALUES
	(1, 1, 1),
	(2, 2, 2),
	(3, 3, 1),
	(4, 4, 2),
	(5, 5, 1);
/*!40000 ALTER TABLE `system_role_user` ENABLE KEYS */;


-- Dumping structure for table mot.system_users
DROP TABLE IF EXISTS `system_users`;
CREATE TABLE IF NOT EXISTS `system_users` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `realname` varchar(255) CHARACTER SET latin1 NOT NULL,
  `username` varchar(255) CHARACTER SET latin1 NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 NOT NULL,
  `email` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `is_delete` enum('Y','N') CHARACTER SET latin1 NOT NULL DEFAULT 'N',
  `delete_by` bigint(20) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Dumping data for table mot.system_users: ~4 rows (approximately)
DELETE FROM `system_users`;
/*!40000 ALTER TABLE `system_users` DISABLE KEYS */;
INSERT INTO `system_users` (`id`, `realname`, `username`, `password`, `email`, `is_delete`, `delete_by`, `delete_time`, `role_id`) VALUES
	(1, 'ADMIN', 'ADMIN', 'PASSWORD', '-', 'N', NULL, NULL, 1),
	(2, 'user', 'username', 'nvkLHE+McjkP2ZNC9QVkPYB8ncArUuL+vScnUck4UqNuxJsVIX9X0apDmcpqqAud', 'user@gmail.com', 'N', NULL, NULL, 2),
	(3, 'ceki', 'cek', '/V3MxMVIb5KUTMAhhF1kgvjHKIISQGq0qCAyEe8CZQv6mBciXlYZdDUMuK9+lyU0', 'cek@cek.com', 'N', NULL, NULL, 1),
	(4, 'user', 'user', 'k6qNDXiCBn7wl5GGtaOXeW/0X83+9WrRFAUqWEeYfWGPC5TkXsn0xpXBjNR5nS9/', 'user@gmail.com', 'N', NULL, NULL, 2);
/*!40000 ALTER TABLE `system_users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
