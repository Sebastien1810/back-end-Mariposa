const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    level: {
      enum: ["beginner", "intermediate", "expert"],
    },
    favoriteTimeforWorkout: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
    },
    gymSessionPreference: {
      type: Schema.Types.ObjectId,
      ref: "GymSession",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
