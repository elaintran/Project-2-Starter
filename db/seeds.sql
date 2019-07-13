INSERT INTO character_main (main_name , main_class, main_hp, main_str, main_mag, main_def, main_spd, main_lvl, main_exp)
VALUES  ("knight_name", "knight", 9, 7, 4, 8, 5, 1, 1), 
        ("fight_name", "fighter", 8, 9, 2, 6, 6, 1, 1),
        ("mage_name", "mage", 6, 3, 9, 5, 7, 1, 1),
        ("rouge_name", "rouge", 7, 8, 3, 6, 8, 1, 1);
        
INSERT INTO character_enemy (enemy_name , enemy_class, enemy_hp, enemy_str, enemy_mag, enemy_def, enemy_spd, enemy_lvl)
VALUES  ("knight_name", "knight", 9, 7, 4, 8, 5, 1), 
        ("fight_name", "fighter", 8, 9, 2, 6, 6, 1),
        ("mage_name", "mage", 6, 3, 9, 5, 7, 1),
        ("rouge_name", "rouge", 7, 8, 3, 6, 8, 1);

INSERT INTO inventory (item_name, item_class, item_potency)
VALUES  ("potion", "healing", 10),
        ("bomb", "attack", 2),
        ("shield", "defence", 2),
        ("speed_shoes", "support", 2);

INSERT INTO users (user_name, user_password, user_selection)
VALUES  ('name_01', "pw1", 1), 
        ("name_02", "pw2", 1), 
        ("name_03", "pw3", 1),
        ("name_04", "pw4", 1);