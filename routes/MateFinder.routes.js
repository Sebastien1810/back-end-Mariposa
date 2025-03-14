// routes/MateFinder.routes.js
const express = require("express");
const router = express.Router();
const MateFinderProfile = require("../models/MateFinderProfile");

// POST route to create a new MateFinder profile
router.post("/profile", (req, res) => {
  const { firstName, location, workoutType, availableTime, level } = req.body;

  if (!firstName || !location || !workoutType || !availableTime || !level) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  MateFinderProfile.create({
    firstName,
    location,
    workoutType,
    availableTime,
    level,
  })
    .then((newProfile) => res.status(201).json(newProfile))
    .catch((err) => {
      console.error("Error creating MateFinder profile:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// GET route to find matching profiles
router.get("/", (req, res) => {
  const { location, workoutType, availableTime, level } = req.query;
  const filter = {};

  if (location) filter.location = location;
  if (workoutType) filter.workoutType = workoutType;
  if (availableTime) filter.availableTime = availableTime;
  if (level) filter.level = level;

  MateFinderProfile.find(filter)
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      console.error("Error fetching MateFinder profiles:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
