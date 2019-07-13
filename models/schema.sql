DROP DATABASE IF EXISTS fire_emblem_db;
CREATE DATABASE fire_emblem_db;

USE fire_emblem_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_password TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE character_main (
    id INT AUTO_INCREMENT NOT NULL,
    character_name VARCHAR(100) NOT NULL,
    character_class VARCHAR(100) NOT NULL,
    character_hp INT(11) NOT NULL,
    character_str INT(11) NOT NULL,
    character_def INT(11) NOT NULL,
    character_spd INT(11) NOT NULL
    PRIMARY KEY (id)
)

CREATE TABLE character_enemy (
        id INT AUTO_INCREMENT NOT NULL,
    character_name VARCHAR(100) NOT NULL,
    character_class VARCHAR(100) NOT NULL,
    character_hp INT(11) NOT NULL,
    character_str INT(11) NOT NULL,
    character_def INT(11) NOT NULL,
    character_spd INT(11) NOT NULL
    PRIMARY KEY (id)
)

CREATE TABLE inventory ()




DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
