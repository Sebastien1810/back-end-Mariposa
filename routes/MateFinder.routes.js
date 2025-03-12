// routes/MateFinder.routes.js
const router = require("express").Router();
const MateFinderProfile = require("../models/MateFinderProfile");

router.post("/matefinder/profile", (req, res) => {
  const {
    user,
    location,
    preferredWorkoutType,
    availableTimes,
    experienceLevel,
  } = req.body;

  MateFinderProfile.findOneAndUpdate(
    { user },
    { location, preferredWorkoutType, availableTimes, experienceLevel },
    { new: true, upsert: true }
  )
    .then((profile) => res.status(200).json(profile))
    .catch((error) => {
      console.error("Error creating/updating MateFinder profile:", error);
      res
        .status(500)
        .json({ error: "Failed to create or update MateFinder profile" });
    });
});

router.get("/matefinder", (req, res) => {
  const { location, preferredWorkoutType, availableTime, experienceLevel } =
    req.query;

  let filter = {};

  if (location) {
    filter.location = location;
  }
  if (preferredWorkoutType) {
    filter.preferredWorkoutType = preferredWorkoutType;
  }
  if (availableTime) {
    filter.availableTimes = availableTime;
  }
  if (experienceLevel) {
    filter.experienceLevel = experienceLevel;
  }

  MateFinderProfile.find(filter)
    .populate("user")
    .then((profiles) => res.json(profiles))
    .catch((error) => {
      console.error("Error fetching MateFinder profiles:", error);
      res.status(500).json({ error: "Error fetching MateFinder profiles" });
    });
});

module.exports = router;
