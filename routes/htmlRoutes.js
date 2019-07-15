// var db = require("../models");

var path = require("path");


module.exports = function (app) {
  app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/landing.html"))
  );

  app.get("/login", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/login.html"))
  );

  app.get("/register", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/registration.html"))
  );

  app.post("/register", (req, res) => {
    // const { userName, userEmail, userPassword, userPassword2 } = req.body;
    // let errors = [];
    // // check required field
    // if (!userName || !userEmail || !userPassword) {
    //   errors.push({ msg: 'Please fill in all fields' });
    // }
    // // check passwrods match
    // if (userPassWord !== userPassword2) {
    //   errors.push({ msg: "password/email is incorrect" })
    // }
    // // check pass length
    // if (userPassword.length < 6) {
    //   errors.push({ msg: "Password must be six characters or greater" })
    // }

    // if (errors.length > 0) {
    //   res.render("register", {
    //     errors,
    //     userName,
    //     userEmail,
    //     userPassWord,
    //     userPassword2
    //   })
    // } else {
    //   res.send("pass")
    // }
  })

  app.get("/character", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/character-select.html"))
  );

  //post data about character selection
  app.post("")

  app.get("/encounter", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/encounter.html"))
  );

  app.get("*", (req, res) =>
    res.render("404")
  );

  // app.get("/", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });

  // app.get("/character", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../public/character-select.html"));
  // });

  // app.get("/encounter", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../public/character-encounter.html"));
  // });

  // app.get("*", function (req, res) {
  //   res.render("404");
  // });

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
