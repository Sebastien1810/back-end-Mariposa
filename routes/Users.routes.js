const router = require("express").Router();
const GymSession = require("../models/GymSession.model");
const User = require("../models/User.model");

router.post("/User", (req, res) => {
  const newUser = req.body;

  User.create(newUser)
    .then((userFromdB) => {
      res.status(201).json(userFromdB);
    })
    .catch((error) => {
      console.log("Error to create a new User");
      console.log(error);
      res.status(500).json({ error: "Failed to create a new User" });
    });
});
module.exports = router;
