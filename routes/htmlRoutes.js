// var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuth");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // if (req.user) {
    //   return res.redirect("/character");
    // }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/register", (req, res) => {
    // if (req.user) {
    //   return res.redirect("/character");
    // }
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

  app.get("/character", isAuthenticated, (req, res) => {
    // if (req.user.userSelection !== null) {
    //   console.log("res user exists rerouting");
    //   return res.redirect("/world");
    // }
    res.sendFile(path.join(__dirname, "../public/character-select.html"));
  });

  app.get("/world", isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, "../public/story-select.html"))
  );

  app.get("/encounter", isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, "../public/character-encounter.html"))
  );

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/404.html"))
  );
};
