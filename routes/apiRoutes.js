// var db = require("../models");

// var path = require("path");


module.exports = function (app) {
    // Get all users
    app.get("/api/users", function (req, res) {
        db.User.findALL({}).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });
};
