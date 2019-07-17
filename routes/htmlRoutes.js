// var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuth");

module.exports = function (app) {
  app.get("/", (req, res) => {
    if (req.user) {
      return res.redirect("/character");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/register", (req, res) => {
    if (req.user) {
      return res.redirect("/character");
    }
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

  app.get("/character", isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, "../public/character-select.html"))
  );

  app.get("/world", isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, "../public/story-select.html"))
  );

  app.get("/encounter", isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, "../public/character-encounter.html"))
  );

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/404.html"))
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
};
