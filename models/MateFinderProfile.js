// models/MateFinderProfile.js
const { Schema, model } = require("mongoose");

const mateFinderProfileSchema = new Schema(
  {
    firstName: { type: String, required: true },
    location: { type: String, required: true },
    workoutType: { type: String, required: true },
    availableTime: { type: String, required: true },
    level: { type: String, required: true },
  },
  { timestamps: true }
);

const MateFinderProfile = model("MateFinderProfile", mateFinderProfileSchema);
module.exports = MateFinderProfile;
