var db = require("../models");

module.exports = function (app) {
    // Get all users
    app.get("/api/users", function (req, res) {
        db.User.findAll({}).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });

    app.get("/api/users/:id", function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });

    app.post("/api/users", function (req, res) {
        db.User.create(req.body).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });
};
