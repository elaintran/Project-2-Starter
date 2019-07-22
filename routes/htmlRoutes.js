// var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuth");

module.exports = function (app) {
    app.get("/", (req, res) => {
        //if user is logged in
        if (req.user) {
            res.redirect("/world");
        //if user is not logged in
        } else {
            res.sendFile(path.join(__dirname, "../public/login.html"));
        }
    });

    app.get("/register", (req, res) => {
        //if user is logged in
        if (req.user) {
            res.redirect("/character");
        //user is not logged in
        } else {
            res.sendFile(path.join(__dirname, "../public/registration.html"));
        }
    });

    app.get("/character", isAuthenticated, (req, res) => {
        //if user is logged in
        if (req.user) {
            //user is allowed to change their character any time
            res.sendFile(path.join(__dirname, "../public/character-select.html"));
        //if not logged in, go to login
        } else {
            res.redirect("/");
        }
    });

    app.get("/world", isAuthenticated, (req, res) => {
        //if user is logged in, redirect to world
        if (req.user && req.user.userSelection !== null) {
            res.sendFile(path.join(__dirname, "../public/story-select.html"));
        //if user is not logged in, redirect to login
        } else if (req.user && req.user.userSelection === null) {
            res.redirect("/character");
        } else {
            res.redirect("/");
        }
    });

    app.get("/encounter", isAuthenticated, (req, res) => {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/character-encounter.html"));
        } else {
            res.redirect("/");
        }
    });

    app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "../public/404.html"))
    );
};