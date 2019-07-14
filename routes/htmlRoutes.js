// var db = require("../models");

var path = require("path");


module.exports = function (app) {
  // app.get("/", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  })

  app.get("/register", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/register.html"));

  app.get("/character", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/character-select.html"));
  });

  app.get("/encounter", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/character-encounter.html"));
  });

  app.get("*", function (req, res) {
    res.render("404");
  });

  // Load index page
  // app.get("/", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });
};
