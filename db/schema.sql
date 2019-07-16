DROP DATABASE IF EXISTS fire_emblem_db;
CREATE DATABASE fire_emblem_db;
USE fire_emblem_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_password TEXT NOT NULL,
    user_selection TINYINT NOT NULL DEFAULT 1,
    user_score INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);


CREATE TABLE character_main (
    id INT AUTO_INCREMENT NOT NULL,
    main_name VARCHAR(100) NOT NULL,
    main_class VARCHAR(100) NOT NULL,
    main_hp INT(11) NOT NULL,
    main_str INT(11) NOT NULL,
    main_mag INT(11) NOT NULL,
    main_def INT(11) NOT NULL,
    main_spd INT(11) NOT NULL,
    main_lvl INT(11) NOT NULL,
    main_exp INT(11) NOT NULL
    PRIMARY KEY (id)
);

CREATE TABLE character_enemy (
    id INT AUTO_INCREMENT NOT NULL,
    enemy_name VARCHAR(100) NOT NULL,
    enemy_class VARCHAR(100) NOT NULL,
    enemy_hp INT(11) NOT NULL,
    enemy_str INT(11) NOT NULL,
    enemy_mag INT(11) NOT NULL,
    enemy_def INT(11) NOT NULL,
    enemy_spd INT(11) NOT NULL,
    enemy_lvl INT(11) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE inventory (
    id INT AUTO_INCREMENT NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    item_class VARCHAR(100) NOT NULL,
    item_potency TINYINT NOT NULL
);


DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
