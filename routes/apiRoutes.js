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
    );

    app.get("/api/login", (req, res) =>
        db.User.findOne({
            where: {
                userEmail: req.body.userEmail
            }
        }).then((dbUsers) =>
            (dbUsers.userPassword === req.body.userPassword) ?
                res.json(dbUsers) : res.send("not found")
        )
    );

    app.post("/api/register", (req, res) => {
        console.log("\n\n\n/API/REGISTER\n\n\n");
        console.log(req.body);
        // use bcrypt to hash pw before sending to db
        db.User.create({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
            // logic if not unique then return a msg - flash
        }).then(
            // if(check if unique)
            (dbUser) => res.json(dbUser));
    });
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
