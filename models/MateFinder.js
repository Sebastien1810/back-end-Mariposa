const { Schema, model } = require("mongoose");

const mateFinderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // un seul MateFinder par user
    },
    location: {
      type: String,
      default: "",
    },
    preferredWorkout: {
      type: String,
      default: "",
    },
    preferredTime: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("MateFinder", mateFinderSchema);
