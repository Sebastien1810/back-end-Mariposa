// models/MateFinderProfile.model.js
const { Schema, model } = require("mongoose");

const mateFinderProfileSchema = new Schema(
  {
    // Référence vers l'utilisateur existant
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    location: { type: String },
    preferredWorkoutType: { type: String },
    availableTimes: { type: [String] },
    experienceLevel: { type: String },
  },
  { timestamps: true }
);

module.exports = model("MateFinderProfile", mateFinderProfileSchema);
