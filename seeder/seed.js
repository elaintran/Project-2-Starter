var mainSeed = require("../db/characters_main.json");
var enemySeed = require("../db/characters_enemy.json");
var chapterSeed = require("../db/chapter.json");
var db = require("../models");
var syncOptions = { force: false };


db.sequelize.sync(syncOptions).then(function () {
    db.Main.bulkCreate(mainSeed).then(function (dbMain) {
        console.log(dbMain);
    });
    db.Enemy.bulkCreate(enemySeed).then(function (dbEnemy) {
        console.log(dbEnemy);
    });
    db.Chapter.bulkCreate(chapterSeed).then(function (dbChapter) {
        console.log(dbChapter);
    });
});