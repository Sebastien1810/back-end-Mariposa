// app.js
require("dotenv").config();
require("./db"); // Connection à la base de données

const express = require("express");
const app = express();
const cors = require("cors");

// Exécution de la configuration middleware (configurations supplémentaires dans ./config)
require("./config")(app);

// Configure CORS pour autoriser les requêtes depuis le front-end
app.use(cors({ origin: process.env.ORIGIN }));

// Analyse des requêtes JSON entrantes
app.use(express.json());

// Route de vérification de santé
app.get("/", (req, res) => {
  res.send("status: healthy");
});

// Import des routes existantes
const AuthRoutes = require("./routes/Auth.routes");
const GymSessionRoutes = require("./routes/GymSession.routes");
const UserRoutes = require("./routes/Users.routes");
const CommentRoutes = require("./routes/Comment.routes");
const mateFinderRoutes = require("./routes/MateFinder.routes");

// Utilisation des routes
app.use("/api/matefinder", mateFinderRoutes);
app.use("/", AuthRoutes);
app.use("/api", GymSessionRoutes);
app.use("/api", UserRoutes);
app.use("/api", CommentRoutes);

// Gestion globale des erreurs et routes non trouvées
require("./error-handling")(app);

module.exports = app;
