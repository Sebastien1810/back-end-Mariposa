// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const UsersRoutes = require("./routes/Users.routes");
const AuthRoutes = require("./routes/Auth.routes");
const GymSessionRoutes = require("./routes/GymSession.routes");
const CommentRoutes = require("./routes/Comment.routes");

app.use("/api", AuthRoutes);
app.use("/api", UsersRoutes);
app.use("/api", GymSessionRoutes);
app.use("/api", CommentRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
