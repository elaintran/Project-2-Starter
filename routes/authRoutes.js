var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.userName);
    });

    app.post("/api/register", (req, res) => {
        db.User.create({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", function (req, res) {
        if (!req.userName) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                userEmail: req.userName.userEmail,
                id: req.userName.id
            });
        }
    });
};