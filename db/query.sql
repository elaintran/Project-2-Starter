-- a query to select the users requested character
SELECT users.user_selection, character_main.id, character_main.main_name FROM users
LEFT JOIN character_main ON users.user_selection=character_main.id

-- a query to display highscores of users
SELECT user_name, user_score FROM users ORDER BY user_score DESC