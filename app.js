// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
const cors = require("cors");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
app.use(cors({ origin: process.env.ORIGIN }));

app.get("/", (req, res) => {
  res.send("status: healthy");
});

// 👇 Start handling routes here
const AuthRoutes = require("./routes/Auth.routes");
const GymSessionRoutes = require("./routes/GymSession.routes");
const User = require("./routes/Users.routes");
const Comment = require("./routes/Comment.routes");
const MateFinderRoutes = require("./routes/MateFinder.routes");

app.use("/api", MateFinderRoutes);
app.use("/api", AuthRoutes);
app.use("/api", GymSessionRoutes);
app.use("/api", User);
app.use("/api", Comment);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
