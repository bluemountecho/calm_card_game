/*
 Navicat Premium Data Transfer

 Source Server         : localhost(mysql)
 Source Server Type    : MySQL
 Source Server Version : 100417
 Source Host           : localhost:3306
 Source Schema         : db_angel_and_demon

 Target Server Type    : MySQL
 Target Server Version : 100417
 File Encoding         : 65001

 Date: 03/04/2022 03:50:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_abilities
-- ----------------------------
DROP TABLE IF EXISTS `tbl_abilities`;
CREATE TABLE `tbl_abilities`  (
  `ability_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manaCost` float NULL DEFAULT 0,
  `targetType` tinyint(2) NULL DEFAULT 0,
  `targetCount` int(11) NULL DEFAULT 0,
  `targetQuery` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  PRIMARY KEY (`ability_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_abilities
-- ----------------------------
INSERT INTO `tbl_abilities` VALUES (1, 'Speed Up', 'All friendly monsters have +1 speed.', '/images/deck/speed.png', '+1', 1, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (2, 'Speed Down', 'All enemy monsters have -1 speed.', '/images/deck/speed.png', '-1', 1, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (3, 'Health Up', 'All friendly monsters have +1 health.', '/images/deck/health.png', '+1', 2, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (4, 'Health Down', 'All enemy monsters have -1 health.', '/images/deck/health.png', '-1', 2, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (5, 'Defense Up', 'All friendly monsters have +1 defense.', '/images/deck/defense.png', '+1', 2, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (6, 'Defense Down', 'All enemy monsters have -1 defense.', '/images/deck/defense.png', '-1', 2, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (7, 'Magic Attack Up', 'All friendly monsters have +1 magic attack.', '/images/deck/magic-attack.png', '+1', 4, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (8, 'Magic Attack Down', 'All enemy monsters have -1 magic attack.', '/images/deck/magic-attack.png', '-1', 4, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (9, 'Melee Attack Up', 'All friendly monsters have +1 melee attack.', '/images/deck/melee-attack.png', '+1', 3, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (10, 'Melee Attack Down', 'All enemy monsters have -1 melee attack.', '/images/deck/melee-attack.png', '-1', 3, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (11, 'Ranged Attack Up', 'All friendly monsters have +1 ranged attack.', '/images/deck/ranged-attack.png', '+1', 4, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (12, 'Ranged Attack Down', 'All enemy monsters have -1 ranged attack.', '/images/deck/ranged-attack.png', '-1', 4, 1, 1, '');
INSERT INTO `tbl_abilities` VALUES (13, 'Killer', 'Monsters have Killer ability can attack at any position and will target enemy monsters with lowest health point.', '/images/abilities/killer.png', 'KL', 2.5, 2, 5, 'health <= 3');
INSERT INTO `tbl_abilities` VALUES (14, 'Ranged Melee', 'Monsters have Ranged Melee ability can attack at the second position.', '/images/abilities/ranged_melee.png', 'RM', 1, 2, 3, '');
INSERT INTO `tbl_abilities` VALUES (15, 'Sniper', 'Monsters have Sniper ability attack Ranged and Magic monsters that are not in first position.', '/images/abilities/sniper.png', 'SN', 2.5, 3, 3, 'health <= 2');
INSERT INTO `tbl_abilities` VALUES (16, 'Cleaner', 'Monsters have Cleaner ability remove all negative effects of friendly monster at the first position.', '/images/abilities/cleaner.png', 'CL', 0.5, 4, 5, '');
INSERT INTO `tbl_abilities` VALUES (17, 'Shield', 'Monsters have Shield ability get reduced damage from melee and ranged monsters.', '/images/abilities/shield.png', 'SH', 1, 0, 6, '');
INSERT INTO `tbl_abilities` VALUES (18, 'Battle Attack', 'Monsters have Battle Attack ability attack monsters near the target monster.', '/images/abilities/battle.png', 'BA', 1.5, 0, 3, 'attack <= 2');
INSERT INTO `tbl_abilities` VALUES (19, 'Last Attack', 'Monsters have Last Attack ability attack monsters at the last position.', '/images/abilities/last_attack.png', 'LA', 1, 0, 2, '');
INSERT INTO `tbl_abilities` VALUES (20, 'Evasion', 'Monsters have Evasion ability get increased chance of evading.', '/images/abilities/evasion.png', 'EV', 1, 0, 5, 'health <= 5');
INSERT INTO `tbl_abilities` VALUES (21, 'Tank Heal', 'Monsters have Tank Heal ability restores health point of monster at the first position.', '/images/abilities/tank_helper.png', 'TH', 4, 4, 3, 'health <= 3');
INSERT INTO `tbl_abilities` VALUES (22, 'Double Attack', 'Monsters have Double Attack ability attacks and kill the target, they can attack next monster once more.', '/images/abilities/double_attack.png', 'DA', 2, 0, 2, '');
INSERT INTO `tbl_abilities` VALUES (23, 'Magic Shield', 'Monsters have Magic Shield ability get reduced damage from magic monsters.', '/images/abilities/magic_shield.png', 'MD', 1, 0, 3, '');
INSERT INTO `tbl_abilities` VALUES (24, 'Targeted', 'All enemy monsters will attack this monster.', '/images/abilities/targeted.png', 'TR', 4, 2, 3, 'health >= 6');
INSERT INTO `tbl_abilities` VALUES (25, 'Protect', 'All friendly monsters gain +1 defense in each round.', '/images/abilities/protect.png', 'PR', 4, 4, 1, 'health <= 3');
INSERT INTO `tbl_abilities` VALUES (26, 'Slow', 'Reduces all enemy monsters speed by -1 in every 2 rounds.', '/images/abilities/slow.png', 'SL', 1.5, 4, 1, 'health <= 3');
INSERT INTO `tbl_abilities` VALUES (27, 'Random Attack', 'Monsters have Random Attack ability will attack random monsters.', '/images/abilities/random_attack.png', 'RA', 2.5, 0, 3, '');
INSERT INTO `tbl_abilities` VALUES (28, 'Death Gainer', 'Monsters have Death Gainer will get 1 health point when enemy monster dies.', '/images/abilities/death_gainer.png', 'DG', 1, 0, 3, '');
INSERT INTO `tbl_abilities` VALUES (29, 'Reflect', 'When enemy melee and ranged monsters hit this monster, some damage will be reflected.', '', 'RF', 1, 0, 4, 'health >= 4');
INSERT INTO `tbl_abilities` VALUES (30, 'Magic Reflect', 'When enemy magic monsters hit this monster, some damage will be reflected.', '', 'MR', 1, 0, 4, 'health >= 4');
INSERT INTO `tbl_abilities` VALUES (32, 'Dispel', 'This monster clears all positive status effects on first enemy.', '/images/abilities/dispel.png', 'DS', 1.5, 4, 2, 'health <= 3');
INSERT INTO `tbl_abilities` VALUES (33, 'True Strike', 'This monster\'s attack never miss.', '/images/abilities/true_strike.png', 'TS', 1.5, 0, 3, 'attack >= 2');
INSERT INTO `tbl_abilities` VALUES (34, 'Pure Attack', 'This monster\'s damage is pure damage.', '', 'PA', 1.5, 0, 3, 'attack >= 2');
INSERT INTO `tbl_abilities` VALUES (35, 'Reflects', 'This monster makes friendly monsters to reflect melee and ranged damage.', '', 'RS', 3, 4, 1, 'health <= 3');
INSERT INTO `tbl_abilities` VALUES (36, 'Magic Reflects', 'This monster makes friendly monsters to reflect magic damage.', '', 'MS', 3, 4, 1, 'health <= 3');

-- ----------------------------
-- Table structure for tbl_battle_history
-- ----------------------------
DROP TABLE IF EXISTS `tbl_battle_history`;
CREATE TABLE `tbl_battle_history`  (
  `history_id` int(11) NOT NULL AUTO_INCREMENT,
  `player1Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `player2Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `player1Deck` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `player2Deck` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `battleLog` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `stateLog` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `winner` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0x0000000000000000000000000000000000000000',
  `finishedAt` datetime(0) NULL DEFAULT NULL,
  `battle_id` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`history_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 110 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_battle_history
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_battles
-- ----------------------------
DROP TABLE IF EXISTS `tbl_battles`;
CREATE TABLE `tbl_battles`  (
  `battle_id` int(11) NOT NULL AUTO_INCREMENT,
  `player1Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `player2Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `player1Deck` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `player2Deck` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `isAccepted` tinyint(2) NULL DEFAULT 0,
  `isStarted` tinyint(2) NULL DEFAULT 0,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `acceptedAt` datetime(0) NULL DEFAULT NULL,
  `startedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`battle_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 311 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_battles
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_default_cards
-- ----------------------------
DROP TABLE IF EXISTS `tbl_default_cards`;
CREATE TABLE `tbl_default_cards`  (
  `card_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `type` tinyint(2) NULL DEFAULT 0,
  `health` int(11) NULL DEFAULT 0,
  `attack` int(11) NULL DEFAULT 0,
  `defense` int(11) NULL DEFAULT 0,
  `speed` int(11) NULL DEFAULT 0,
  `ability` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '[]',
  `mana` float NULL DEFAULT 0,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`card_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 480 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_default_cards
-- ----------------------------
INSERT INTO `tbl_default_cards` VALUES (390, 'ABAIA', NULL, 3, 6, 3, 0, 5, '[34]', 7, '/images/cards/abaia.png');
INSERT INTO `tbl_default_cards` VALUES (391, 'AETHON', NULL, 2, 10, 2, 3, 2, '[14]', 9, '/images/cards/aethon.png');
INSERT INTO `tbl_default_cards` VALUES (392, 'AION', NULL, 2, 4, 2, 0, 3, '[14]', 4, '/images/cards/aion.png');
INSERT INTO `tbl_default_cards` VALUES (393, 'ARTIO', NULL, 4, 5, 1, 3, 1, '[28]', 5, '/images/cards/artio.png');
INSERT INTO `tbl_default_cards` VALUES (394, 'ASAZEL', NULL, 1, 0, 0, 0, 0, '[1,3]', 3, '/images/cards/asazel.png');
INSERT INTO `tbl_default_cards` VALUES (395, 'AZAZEL', NULL, 1, 0, 0, 0, 0, '[2,6]', 3, '/images/cards/azazel.png');
INSERT INTO `tbl_default_cards` VALUES (396, 'AZRAEL', NULL, 3, 4, 2, 0, 2, '[]', 3, '/images/cards/azrael.png');
INSERT INTO `tbl_default_cards` VALUES (397, 'BAEL', NULL, 1, 0, 0, 0, 0, '[8]', 4, '/images/cards/bael.png');
INSERT INTO `tbl_default_cards` VALUES (398, 'BANSHEE', NULL, 2, 6, 2, 0, 3, '[24]', 9, '/images/cards/banshee.png');
INSERT INTO `tbl_default_cards` VALUES (399, 'BEELZEBUB', NULL, 1, 0, 0, 0, 0, '[7]', 4, '/images/cards/beelzebub.png');
INSERT INTO `tbl_default_cards` VALUES (400, 'BLACK HORSE', NULL, 4, 2, 1, 3, 3, '[16]', 3, '/images/cards/black_horse.png');
INSERT INTO `tbl_default_cards` VALUES (401, 'CARCINUS', NULL, 3, 5, 1, 1, 1, '[20,23]', 6, '/images/cards/carcinus.png');
INSERT INTO `tbl_default_cards` VALUES (402, 'CELTIC HARP', NULL, 4, 4, 3, 1, 1, '[29]', 5, '/images/cards/celtic_harp.png');
INSERT INTO `tbl_default_cards` VALUES (403, 'CENTAUR', NULL, 2, 8, 3, 0, 5, '[29]', 7, '/images/cards/centaur.png');
INSERT INTO `tbl_default_cards` VALUES (404, 'CERBERUS', NULL, 3, 1, 3, 2, 1, '[22]', 4, '/images/cards/cerberus.png');
INSERT INTO `tbl_default_cards` VALUES (405, 'CERNUNNOS', NULL, 2, 4, 1, 1, 5, '[30]', 5, '/images/cards/cernunnos.png');
INSERT INTO `tbl_default_cards` VALUES (406, 'COLCHIS BULL', NULL, 3, 1, 2, 0, 1, '[15]', 4, '/images/cards/colchis_bull.png');
INSERT INTO `tbl_default_cards` VALUES (407, 'CYCLOPS', NULL, 2, 4, 2, 0, 2, '[27]', 6, '/images/cards/cyclops.png');
INSERT INTO `tbl_default_cards` VALUES (408, 'DARK SPIRIT', NULL, 4, 5, 3, 1, 3, '[19]', 6, '/images/cards/dark_spirit.png');
INSERT INTO `tbl_default_cards` VALUES (409, 'DEATH', NULL, 4, 1, 2, 0, 4, '[32]', 3, '/images/cards/death.png');
INSERT INTO `tbl_default_cards` VALUES (410, 'DRAGON', NULL, 2, 3, 2, 3, 2, '[13]', 6, '/images/cards/dragon.png');
INSERT INTO `tbl_default_cards` VALUES (411, 'DRUID', NULL, 3, 3, 2, 0, 5, '[]', 3, '/images/cards/druid.png');
INSERT INTO `tbl_default_cards` VALUES (412, 'DRYAD', NULL, 2, 7, 1, 1, 5, '[27]', 8, '/images/cards/dryad.png');
INSERT INTO `tbl_default_cards` VALUES (413, 'EARTH SPIRIT', NULL, 3, 1, 2, 3, 1, '[27]', 5, '/images/cards/earth_spirit.png');
INSERT INTO `tbl_default_cards` VALUES (414, 'FENRIR', NULL, 4, 1, 2, 1, 3, '[16]', 2, '/images/cards/fenrir.png');
INSERT INTO `tbl_default_cards` VALUES (415, 'FIRE SPIRIT', NULL, 3, 3, 2, 2, 5, '[34]', 5, '/images/cards/fire_spirit.png');
INSERT INTO `tbl_default_cards` VALUES (416, 'GABRIEL', NULL, 2, 3, 3, 1, 2, '[13]', 6, '/images/cards/gabriel.png');
INSERT INTO `tbl_default_cards` VALUES (417, 'GARGOYLE', NULL, 2, 7, 2, 2, 1, '[24]', 10, '/images/cards/gargoyle.png');
INSERT INTO `tbl_default_cards` VALUES (418, 'GARUDA', NULL, 3, 3, 3, 2, 3, '[]', 4, '/images/cards/garuda.png');
INSERT INTO `tbl_default_cards` VALUES (419, 'GENASI', NULL, 4, 2, 1, 3, 3, '[17]', 4, '/images/cards/genasi.png');
INSERT INTO `tbl_default_cards` VALUES (420, 'GIANT BOAR', NULL, 3, 5, 1, 0, 4, '[]', 4, '/images/cards/giant_boar.png');
INSERT INTO `tbl_default_cards` VALUES (421, 'GOLEM', NULL, 3, 2, 3, 2, 3, '[15]', 6, '/images/cards/golem.png');
INSERT INTO `tbl_default_cards` VALUES (422, 'GRIMOIRE', NULL, 3, 4, 2, 1, 1, '[20]', 4, '/images/cards/grimoire.png');
INSERT INTO `tbl_default_cards` VALUES (423, 'GRYPHON', NULL, 2, 4, 1, 3, 2, '[]', 4, '/images/cards/gryphon.png');
INSERT INTO `tbl_default_cards` VALUES (424, 'HARPY', NULL, 4, 1, 2, 2, 3, '[18,15]', 5, '/images/cards/harpy.png');
INSERT INTO `tbl_default_cards` VALUES (425, 'HELLHOUND', NULL, 3, 4, 2, 2, 2, '[17]', 5, '/images/cards/hellhound.png');
INSERT INTO `tbl_default_cards` VALUES (426, 'HYDRA', NULL, 4, 1, 3, 1, 4, '[21]', 6, '/images/cards/hydra.png');
INSERT INTO `tbl_default_cards` VALUES (427, 'IBIS', NULL, 4, 4, 2, 2, 1, '[16]', 4, '/images/cards/ibis.png');
INSERT INTO `tbl_default_cards` VALUES (428, 'JENTIL', NULL, 2, 6, 1, 0, 3, '[29]', 5, '/images/cards/jentil.png');
INSERT INTO `tbl_default_cards` VALUES (429, 'KHNUM', NULL, 2, 4, 1, 2, 5, '[17]', 5, '/images/cards/khnum.png');
INSERT INTO `tbl_default_cards` VALUES (430, 'KRAKEN', NULL, 4, 4, 2, 2, 1, '[17]', 5, '/images/cards/kraken.png');
INSERT INTO `tbl_default_cards` VALUES (431, 'LILITH', NULL, 1, 0, 0, 0, 0, '[4,10]', 5, '/images/cards/lilith.png');
INSERT INTO `tbl_default_cards` VALUES (432, 'LUCIFER', NULL, 1, 0, 0, 0, 0, '[11]', 4, '/images/cards/lucifer.png');
INSERT INTO `tbl_default_cards` VALUES (433, 'MAN-EATER', NULL, 3, 3, 3, 2, 4, '[23]', 5, '/images/cards/man-eater.png');
INSERT INTO `tbl_default_cards` VALUES (434, 'MANTICORE', NULL, 2, 6, 1, 2, 2, '[19]', 6, '/images/cards/manticore.png');
INSERT INTO `tbl_default_cards` VALUES (435, 'MAROOL', NULL, 2, 6, 3, 2, 1, '[24]', 9, '/images/cards/marool.png');
INSERT INTO `tbl_default_cards` VALUES (436, 'MARS', NULL, 2, 6, 2, 3, 4, '[17]', 7, '/images/cards/mars.png');
INSERT INTO `tbl_default_cards` VALUES (437, 'MEDUSA', NULL, 3, 3, 3, 1, 2, '[]', 3, '/images/cards/medusa.png');
INSERT INTO `tbl_default_cards` VALUES (438, 'MERCURY', NULL, 4, 3, 2, 1, 2, '[26]', 4, '/images/cards/mercury.png');
INSERT INTO `tbl_default_cards` VALUES (439, 'MERMAID', NULL, 4, 3, 3, 1, 3, '[25]', 7, '/images/cards/mermaid.png');
INSERT INTO `tbl_default_cards` VALUES (440, 'MICHAEL', NULL, 2, 3, 3, 0, 5, '[13]', 6, '/images/cards/michael.png');
INSERT INTO `tbl_default_cards` VALUES (441, 'MINERVA', NULL, 4, 1, 1, 0, 1, '[21]', 5, '/images/cards/minerva.png');
INSERT INTO `tbl_default_cards` VALUES (442, 'MINOTAUR', NULL, 3, 3, 1, 2, 5, '[]', 3, '/images/cards/minotaur.png');
INSERT INTO `tbl_default_cards` VALUES (443, 'MUT', NULL, 2, 4, 1, 0, 2, '[30]', 4, '/images/cards/mut.png');
INSERT INTO `tbl_default_cards` VALUES (444, 'NEKHBET', NULL, 3, 2, 2, 0, 5, '[33]', 4, '/images/cards/nekhbet.png');
INSERT INTO `tbl_default_cards` VALUES (445, 'NEMEAN LION', NULL, 2, 5, 1, 2, 2, '[30]', 5, '/images/cards/nemean_lion.png');
INSERT INTO `tbl_default_cards` VALUES (446, 'NIXIE', NULL, 4, 1, 1, 3, 1, '[16]', 2, '/images/cards/nixie.png');
INSERT INTO `tbl_default_cards` VALUES (447, 'NYMPH', NULL, 2, 5, 2, 2, 1, '[18]', 6, '/images/cards/nymph.png');
INSERT INTO `tbl_default_cards` VALUES (448, 'OBSIDIAN', NULL, 3, 2, 1, 3, 4, '[15,20]', 6, '/images/cards/obsidian.png');
INSERT INTO `tbl_default_cards` VALUES (449, 'PEGASUS', NULL, 3, 2, 3, 1, 3, '[]', 3, '/images/cards/pegasus.png');
INSERT INTO `tbl_default_cards` VALUES (450, 'PHOENIX', NULL, 2, 9, 2, 0, 5, '[14]', 7, '/images/cards/phoenix.png');
INSERT INTO `tbl_default_cards` VALUES (451, 'PSYCHE', NULL, 3, 3, 2, 3, 4, '[]', 4, '/images/cards/psyche.png');
INSERT INTO `tbl_default_cards` VALUES (452, 'RAGEUL', NULL, 4, 3, 2, 3, 4, '[20]', 5, '/images/cards/rageul.png');
INSERT INTO `tbl_default_cards` VALUES (453, 'RAMIEL', NULL, 4, 1, 1, 2, 5, '[32]', 4, '/images/cards/ramiel.png');
INSERT INTO `tbl_default_cards` VALUES (454, 'RAPHAEL', NULL, 2, 3, 2, 2, 1, '[13]', 6, '/images/cards/raphael.png');
INSERT INTO `tbl_default_cards` VALUES (455, 'SAMAEL', NULL, 4, 2, 1, 0, 3, '[]', 2, '/images/cards/samael.png');
INSERT INTO `tbl_default_cards` VALUES (456, 'SATAN', NULL, 1, 0, 0, 0, 0, '[12]', 4, '/images/cards/satan.png');
INSERT INTO `tbl_default_cards` VALUES (457, 'SATYR', NULL, 2, 7, 1, 1, 1, '[18,13]', 6, '/images/cards/satyr.png');
INSERT INTO `tbl_default_cards` VALUES (458, 'SEAHORSE', NULL, 4, 3, 3, 3, 4, '[21]', 8, '/images/cards/seahorse.png');
INSERT INTO `tbl_default_cards` VALUES (459, 'SENU MATE', NULL, 2, 9, 3, 2, 4, '[22]', 9, '/images/cards/senu_mate.png');
INSERT INTO `tbl_default_cards` VALUES (460, 'SERAPH', NULL, 3, 3, 2, 3, 2, '[]', 4, '/images/cards/seraph.png');
INSERT INTO `tbl_default_cards` VALUES (461, 'SHIKA', NULL, 3, 3, 1, 0, 1, '[]', 2, '/images/cards/shika.png');
INSERT INTO `tbl_default_cards` VALUES (462, 'SOL', NULL, 2, 4, 3, 2, 5, '[30]', 5, '/images/cards/sol.png');
INSERT INTO `tbl_default_cards` VALUES (463, 'SOMA', NULL, 2, 7, 2, 2, 2, '[29]', 7, '/images/cards/soma.png');
INSERT INTO `tbl_default_cards` VALUES (464, 'SORCERESS', NULL, 3, 3, 3, 1, 1, '[34]', 5, '/images/cards/sorceress.png');
INSERT INTO `tbl_default_cards` VALUES (465, 'SPHINX', NULL, 4, 1, 3, 0, 1, '[20,35]', 6, '/images/cards/sphinx.png');
INSERT INTO `tbl_default_cards` VALUES (466, 'SPIRIT BIRD', NULL, 3, 2, 1, 0, 5, '[]', 2, '/images/cards/spirit_bird.png');
INSERT INTO `tbl_default_cards` VALUES (467, 'SPRITE', NULL, 4, 1, 1, 1, 3, '[36]', 5, '/images/cards/sprite.png');
INSERT INTO `tbl_default_cards` VALUES (468, 'SUCCUBUS', NULL, 1, 0, 0, 0, 0, '[5,9]', 5, '/images/cards/succubus.png');
INSERT INTO `tbl_default_cards` VALUES (469, 'TRENT', NULL, 2, 4, 2, 3, 2, '[28]', 5, '/images/cards/trent.png');
INSERT INTO `tbl_default_cards` VALUES (470, 'UNDEAD', NULL, 4, 2, 2, 1, 3, '[23]', 3, '/images/cards/undead.png');
INSERT INTO `tbl_default_cards` VALUES (471, 'URIEL', NULL, 3, 3, 3, 1, 5, '[33]', 5, '/images/cards/uriel.png');
INSERT INTO `tbl_default_cards` VALUES (472, 'VESTA', NULL, 4, 2, 3, 2, 4, '[28]', 4, '/images/cards/vesta.png');
INSERT INTO `tbl_default_cards` VALUES (473, 'WARLOCK', NULL, 4, 3, 2, 2, 1, '[]', 3, '/images/cards/warlock.png');
INSERT INTO `tbl_default_cards` VALUES (474, 'WATER SPIRIT', NULL, 4, 1, 1, 2, 4, '[17]', 3, '/images/cards/water_spirit.png');
INSERT INTO `tbl_default_cards` VALUES (475, 'WEEVER', NULL, 3, 2, 3, 2, 3, '[]', 3, '/images/cards/weever.png');
INSERT INTO `tbl_default_cards` VALUES (476, 'WHIRO', NULL, 2, 3, 1, 3, 3, '[13]', 6, '/images/cards/whiro.png');
INSERT INTO `tbl_default_cards` VALUES (477, 'WIND SPIRIT', NULL, 3, 1, 3, 1, 1, '[33]', 3, '/images/cards/wind_spirit.png');
INSERT INTO `tbl_default_cards` VALUES (478, 'WING SERPENT', NULL, 4, 1, 1, 0, 4, '[]', 1, '/images/cards/wing_serpent.png');
INSERT INTO `tbl_default_cards` VALUES (479, 'ZEPHYR', NULL, 4, 2, 2, 0, 1, '[16]', 2, '/images/cards/zephyr.png');

-- ----------------------------
-- Table structure for tbl_mana_units
-- ----------------------------
DROP TABLE IF EXISTS `tbl_mana_units`;
CREATE TABLE `tbl_mana_units`  (
  `field` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mana_unit` float NULL DEFAULT NULL,
  PRIMARY KEY (`field`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_mana_units
-- ----------------------------
INSERT INTO `tbl_mana_units` VALUES ('attack', 0.3);
INSERT INTO `tbl_mana_units` VALUES ('defense', 0.3);
INSERT INTO `tbl_mana_units` VALUES ('health', 0.6);
INSERT INTO `tbl_mana_units` VALUES ('speed', 0.1);

-- ----------------------------
-- Table structure for tbl_users
-- ----------------------------
DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users`  (
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `decks` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`address`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_users
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
