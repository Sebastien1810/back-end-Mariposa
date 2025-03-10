const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

const router = express.Router();
const saltRounds = 10;

router.post("/auth/signup", (req, res, next) => {
  const { name, email, password, level, favoriteTimeforWorkout } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Provide name, email, and password" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Provide a valid email address." });
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        // On rejette la promesse pour stopper la chaîne si l'utilisateur existe déjà
        return Promise.reject({ status: 400, message: "User already exists" });
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = {
        name,
        email,
        password: hashedPassword,
        level,
        favoriteTimeforWorkout,
      };

      return User.create(newUser);
    })
    .then((createdUser) => {
      // Si l'utilisateur a été créé, on envoie la réponse
      res.status(201).json({
        user: {
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          level: createdUser.level,
          favoriteTimeforWorkout: createdUser.favoriteTimeforWorkout,
        },
      });
    })
    .catch((err) => {
      if (err.status) {
        // Erreur prévue, on renvoie la réponse correspondante
        return res.status(err.status).json({ message: err.message });
      }
      console.error("Error trying to create an account", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/auth/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Provide email and password" });
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(400).json({ message: "User not found" });
      }
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (passwordCorrect) {
        const { _id, name, email } = foundUser;
        const payload = { _id, name, email };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        return res.json({ authToken });
      } else {
        return res
          .status(401)
          .json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => {
      console.error("Error trying to login", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// Route de vérification
router.get("/auth/verify", isAuthenticated, (req, res, next) => {
  console.log("req.payload", req.payload);
  res.json(req.payload);
});

module.exports = router;
