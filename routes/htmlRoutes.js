// var db = require("../models");

var path = require("path");
var isAuthenticated = require("../config/middleware/isAuth");


module.exports = function (app) {
  app.get("/", (req, res) => {
    if (req.userName) {
      // this redirects if userName is discovered
      res.redirect("/character");
    }
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });

  app.get("/login", (req, res) => {
    if (req.userName) {
      res.redirect("/character");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/register", (req, res) => {
    if (req.userName) {
      res.redirect("/character");
    }
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

  app.get("/character", isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, "../public/character-select.html"))
  );

  app.get("/world", isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, "../public/story-select.html"))
  );

  //potental route structure
  // /world/chapter/:id/enounter

  // /world/armory/

  app.get("/encounter", isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, "../public/character-encounter.html"))
  );

  app.get("*", (req, res) =>
    res.render("404")
  );

  // app.post("/register", (req, res) => {
  //   // const { userName, userEmail, userPassword, userPassword2 } = req.body;
  //   // let errors = [];
  //   // // check required field
  //   // if (!userName || !userEmail || !userPassword) {
  //   //   errors.push({ msg: 'Please fill in all fields' });
  //   // }
  //   // // check passwrods match
  //   // if (userPassWord !== userPassword2) {
  //   //   errors.push({ msg: "password/email is incorrect" })
  //   // }
  //   // // check pass length
  //   // if (userPassword.length < 6) {
  //   //   errors.push({ msg: "Password must be six characters or greater" })
  //   // }

  //   // if (errors.length > 0) {
  //   //   res.render("register", {
  //   //     errors,
  //   //     userName,
  //   //     userEmail,
  //   //     userPassWord,
  //   //     userPassword2
  //   //   })
  //   // } else {
  //   //   res.send("pass")
  //   // }
  // })



  //post data about character selection



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
