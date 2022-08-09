# ************************************************************
# Sequel Pro SQL dump
# Versão 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.22)
# Base de Dados: lambda
# Tempo de Geração: 2018-06-18 01:38:18 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump da tabela logs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `logs`;

CREATE TABLE `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` varchar(10) DEFAULT NULL,
  `client` varchar(50) DEFAULT NULL,
  `service` varchar(50) NOT NULL,
  `payload` json DEFAULT NULL,
  `duration` double DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_idx` (`client`),
  KEY `service_idx` (`service`),
  KEY `level_idx` (`level`),
  KEY `date_idx` (`created_at`),
  KEY `lv_client_idx` (`level`,`client`),
  KEY `client_service_idx` (`client`,`service`),
  KEY `lv_cl_srv_date` (`level`,`client`,`service`,`created_at`),
  KEY `lv_cl_date` (`level`,`client`,`created_at`),
  KEY `lv_srv_date` (`level`,`service`,`created_at`),
  KEY `cl_date` (`client`,`created_at`),
  KEY `cl_srv_date` (`client`,`service`,`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump da tabela services_tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `services_tokens`;

CREATE TABLE `services_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` varchar(50) DEFAULT NULL,
  `service` varchar(50) NOT NULL,
  `token` varchar(500) NOT NULL DEFAULT '',
  `expiration_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_idx` (`client`),
  KEY `service_idx` (`service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump da tabela moving_district_service
# ------------------------------------------------------------

DROP TABLE IF EXISTS `moving_district_services`;

CREATE TABLE `moving_district_services` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `state` CHAR(2) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `district` VARCHAR(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `state_idx` (`state`),
  KEY `city_idx` (`city`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

# Dump da tabela moving_district_service
# ------------------------------------------------------------

DROP TABLE IF EXISTS `porto_experience_products`;

CREATE TABLE `porto_experience_products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `codigo_produto` CHAR(10) NOT NULL,
  `desc_produto` VARCHAR(50) NOT NULL,
  `desc_grupo_produto` VARCHAR(50) NOT NULL,
  `codigo_loja` INT(10) NOT NULL,
  `desc_loja` VARCHAR(50) NOT NULL,
  `desc_regional` VARCHAR(50) NOT NULL,
  `susep` VARCHAR(10) NOT NULL,
  `data_inicio` VARCHAR(50) NOT NULL,
  `data_fim` VARCHAR(50) NOT NULL,
  `ano_veiculo` VARCHAR(50) NOT NULL,
  `tabela` INT(10) NOT NULL,
  `prazo` INT(10),
  `taxa_am` FLOAT,
  `carencia` INT(10),
  `tipo` VARCHAR(10),
  `valor_tc` FLOAT(10),
  `valor_min` FLOAT(10),
  `valor_max` FLOAT(10),
  `taxa_aa` FLOAT(10) NOT NULL,
  `cet_aa` FLOAT(10) NOT NULL,
  `coeficiente` FLOAT(10) NOT NULL,
  `aliq_prestamista` FLOAT(10),
  `score_min` FLOAT(10),
  `parcela_min` FLOAT(10),
  `nova_acao` FLOAT(10),
  `comprom_max_1` FLOAT(10),
  `comprom_max_2` FLOAT(10),
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `codigo_produto_idx` (`codigo_produto`),
  KEY `prazo_idx` (`prazo`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;


# Dump da tabela moving_district_service
# ------------------------------------------------------------

DROP TABLE IF EXISTS `europassistance_wo`;

CREATE TABLE `europassistance_wo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `agente` VARCHAR(50) NOT NULL,
  `wo` VARCHAR(50) NOT NULL,
  `fila` VARCHAR(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

# Dump da tabela porto_experience_position
# ------------------------------------------------------------

DROP TABLE IF EXISTS `porto_experience_positions`;

CREATE TABLE `porto_experience_positions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `position` CHAR(50) NOT NULL,
  `tempo_min` INT,
  `fator_salario` int,
  `desconto_imposto` FLOAT,
  `desconto_antecipacao` FLOAT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `position_idx` (`position`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

# Dump da tabela catraca_livre_posts
# ------------------------------------------------------------

CREATE TABLE `catraca_livre_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Dump da tabela catraca_livre_pushs
# ------------------------------------------------------------

CREATE TABLE `catraca_livre_pushs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_url` varchar(255) NOT NULL,
  `title` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `expiration_date` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `feed_url_idx` (`feed_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump da tabela credz_clients
# ------------------------------------------------------------
DROP TABLE IF EXISTS `credz_clients`;

CREATE TABLE `credz_clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identificacao` VARCHAR(200),
  `rg` CHAR(32),
  `dia_nascimento` CHAR(32),
  `mes_nascimento` CHAR(32),
  `ano_nascimento` CHAR(32),
  `cep` CHAR(32),
  `residencial` CHAR(32),
  `celular` CHAR(32),
  `email` CHAR(32),
  `nome_mae` CHAR(32),
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `identificacao_idx` (`identificacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Dump da tabela user_tokens
# ------------------------------------------------------------
DROP TABLE IF EXISTS `user_tokens`;

CREATE TABLE `user_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` VARCHAR(50),
  `service` VARCHAR(50),
  `user_id` VARCHAR(255),
  `token` VARCHAR(255),
  `expiration_date` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `token_idx` (`token`),
  KEY `client_idx` (`client`),
  KEY `service_idx` (`service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Dump da tabela semparar_sms_token
# ------------------------------------------------------------
DROP TABLE IF EXISTS `semparar_sms_tokens`;

CREATE TABLE `semparar_sms_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(255),
  `token` VARCHAR(255),
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `token_idx` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#------------------------------------------------------------
DROP TABLE IF EXISTS `resumo_transbordos`;
CREATE TABLE `resumo_transbordos` 
  ( 
     `id`              INT(11) NOT NULL auto_increment, 
     `conversation_id` VARCHAR(255) NOT NULL, 
     `resumo`          VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE 
     utf8mb4_unicode_ci DEFAULT 
     NULL, 
     `created_at`      DATETIME NOT NULL, 
     `updated_at`      DATETIME DEFAULT NULL, 
     PRIMARY KEY (`id`) 
  ) engine=innodb DEFAULT charset=utf8; 

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
