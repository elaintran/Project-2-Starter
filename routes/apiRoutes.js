var db = require("../models");

// var path = require("path");


module.exports = function (app) {
    // Get all users
    app.get("/api/users", function (req, res) {
        db.User.findAll({}).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });
    app.post("/api/users", function (req, res) {
        db.User.create(req.body).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });
};
