require("dotenv").config();
var express = require("express");
// var passport = require("./config/passport");


var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Passport configuration
// app.use(require("express-session")({
//   secert: "rusty",
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/authRoutes")(app);

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
