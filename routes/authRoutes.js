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
        // if (!req.user) {
        //     // The user is not logged in, send back an empty object
        //     // res.json({});
        //     res.redirect("/");
        // } else if (req.user.userSelection !== null) {
        //     // Otherwise send back the user's email and id
        //     // Sending back a password, even a hashed password, isn't a good idea
        //     res.redirect("/world");
        // } else {
        //     res.redirect("/character");
        // }
        if (!req.user) {
            res.json({});
        } else {
            res.json({
                userName: req.user.userName,
                userEmail: req.user.userEmail,
                userSelection: req.user.userSelection,
                userId: req.user.id
            });
        }
    });

    app.put("/api/userdata", function (req, res) {
        console.log(req.body);
        console.log(req.user.userName);
        debugger;
        db.User.update(req.body,
            {
                where: {
                    userSelection: req.user.userSelection
                }
            })
            .then(function (dbUser) {
                res.json(dbUser);
            });
    });
};