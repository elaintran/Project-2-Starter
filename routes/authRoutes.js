var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user.userName);
        console.log("signin as " + req.user.id);
        console.log(req.user);
    });

    app.post("/api/register", (req, res) => {
        db.User.create({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
        }).then(function () {
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            res.status(401).json(err);
        });
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/userdata", function (req, res) {
        if (!req.user) {
            res.json({});
        } else {
            res.json({
                userName: req.user.userName,
                userEmail: req.user.userEmail,
                userSelection: req.user.userSelection,
                userId: req.user.id,
                chapter: req.user.chapter
            });
        }
    });

<<<<<<< HEAD
    app.post("/api/userdata", function (req, res) {
        // console.log({
        //     userName: req.user.userName,
        //     userEmail: req.user.userEmail,
        //     userSelection: req.body.userSelection,
        //     userId: req.user.id,
        //     chapter: req.user.chapter
        // });
        res.json({
            userName: req.user.userName,
            userEmail: req.user.userEmail,
            userSelection: req.body.userSelection,
            userId: req.user.id,
            chapter: req.user.chapter
        });
        // console.log(req.body);
        // console.log(req.user.userName);
    //     debugger;
    //     db.User.update(req.body,
    //         {
    //             where: {
    //                 userSelection: req.user.userSelection
    //             }
    //         })
    //         .then(function (dbUser) {
    //             res.json(dbUser);
    //         });
=======
    app.put("/api/userdata", function (req, res) {
        console.log(req.body);
        console.log(req.user.userName);
        db.User.update(req.body,
            {
                where: {
                    userSelection: req.user.userSelection
                }
            })
            .then(function (dbUser) {
                res.json(dbUser);
            });
>>>>>>> eed964be197b64123c2502065209f35c16e97a8a
    });
};