require("dotenv").config();
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");

var PORT = process.env.PORT || 3000;
var db = require("./models");

// Middleware
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Passport configuration
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/apiRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Starting the server, syncing our models ------------------------------------/
// a variable goes where force: true is called syncOptions
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log("Server started on http://localhost:" + PORT);
  });
});

// module.exports = app;
