var db = require("../models");

module.exports = function (app) {
    // Get all users
    app.get("/api/users", (req, res) =>
        db.User.findAll({}).then((dbUser) =>
            res.json(dbUser)
        ));

    app.get("/api/users/:id", (req, res) =>
        db.User.findOne({
            where: { id: req.params.id }
        }).then((dbUsers) => res.json(dbUsers))
    )

    app.post("/api/login", (req, res) =>
        db.User.findOne({
            where: {
                userEmail: req.body.userEmail
            }
        }).then((dbUser) =>
            (dbUser.userPassword === req.body.userPassword) ?
                res.json(dbUser) : res.send("nope")
        )
    );

    app.post("/api/register", (res, req) => {
        db.User.create({
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
        }).then((dbUsers) => res.json(dbUsers))
    })
    // app.post("/api/users", (req, res) =>
    //     db.User.create(req.body).then((dbUser => res.json(dbUser)))
    // )

    // app.get("/api/users", function (req, res) {
    //     db.User.findAll({}).then(function (dbUsers) {
    //         res.json(dbUsers);
    //     });
    // });

    // app.get("/api/users/:id", function (req, res) {
    //     db.User.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function (dbUsers) {
    //         res.json(dbUsers);
    //     });
    // });

    app.post("/api/users", function (req, res) {
        db.User.create(req.body).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });
};
