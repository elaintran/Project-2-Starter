var db = require("../models");
// var passport = require("../config/passport");

module.exports = function (app) {

    // Get all users
    app.get("/api/users", (req, res) =>
        db.User.findAll({}).then((dbUser) =>
            res.json(dbUser)
        ));

    app.put("/api/users/:id", (req, res) => {
        db.User.update(req.body,
            {
                where: {
                    userSelection: req.user.userSelection
                }
            }).then(function (dbUser) {
                res.json(dbUser);
            });
    });

    app.get("/api/character", (req, res) =>
        db.Main.findAll({}).then((dbMain) =>
            res.json(dbMain)
        )
    );

    app.post("/api/character", (req, res) => {
        console.log(req.body);
        db.Main.create({
            mainName: req.body.mainName,
            mainClass: req.body.mainClass,
            mainPortrait: req.body.mainPortrait,
            mainChibi: req.body.mainChibi,
            mainHp: req.body.mainHp,
            mainStr: req.body.mainStr,
            mainDef: req.body.mainDef,
            mainSpd: req.body.mainSpd,
            colorDark: req.body.colorDark,
            colorLight: req.body.colorLight
        }).then(
            (dbMain) => res.json(dbMain));
    });

    app.get("/api/enemy", (req, res) =>
        db.Enemy.findAll({}).then((dbEnemy) =>
            res.json(dbEnemy)
        )
    );

    app.post("/api/enemy", (req, res) => {
        console.log(req.body);
        db.Enemy.create({
            enemyName: req.body.enemyName,
            enemyClass: req.body.enemyClass,
            enemyPortrait: req.body.enemyPortrait,
            enemyChibi: req.body.enemyChibi,
            enemyHp: req.body.enemyHp,
            enemyStr: req.body.enemyStr,
            enemyDef: req.body.enemyDef,
            enemySpd: req.body.enemySpd,
            colorDark: req.body.colorDark,
            colorLight: req.body.colorLight
        }).then((dbEnemy) => res.json(dbEnemy));
    });

    app.get("/api/chapter", (req, res) =>
        db.Chapter.findAll({}).then((dbChapter) =>
            res.json(dbChapter)
        )
    );

    app.post("/api/chapter", (req, res) => {
        console.log(req.body);
        db.Chapter.create({
            chapterNum: req.body.chapterNum,
            chapterSubtitle: req.body.chapterSubtitle,
            chapterDescription: req.body.chapterDescription,
            chapterImg: req.body.chapterImg,
        }).then((dbChapter) => res.json(dbChapter));
    });
};
