const router = require("express").Router();
const GymSession = require("../models/GymSession.model");

router.post("/GymSession", (req, res) => {
  const newGymSession = req.body;

  GymSession.create(newGymSession)
    .then((gymsessionFromDB) => {
      res.status(201).json(gymsessionFromDB);
    })
    .catch((error) => {
      console.log("Error to create a new Gym session");
      console.log(error);
      res.status(500).json({ error: "Failed to create a new Gym session" });
    });
});
module.exports = router;
