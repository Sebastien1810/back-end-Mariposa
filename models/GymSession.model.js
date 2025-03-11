const { Schema, model } = require("mongoose");

const gymSessionSchema = new Schema({
  location: {
    type: String,
    required: [true, "Location is required."],
  },
  typeOfWorkout: {
    type: String,
    enum: [
      // Cardio//
      "Treadmill (Intervals, Incline Walking, Endurance Run)",
      "Elliptical (Steady State, Interval Training)",
      "Stationary Bike (Spin Class, Steady Pedal)",
      "Rowing Machine (Interval Rowing, Continuous Endurance)",
      "Stair Climber (Consistent Pace, HIIT)",
      "HIIT Classes (Burpees, Jumping Jacks, Sprints)",
      // Strength//
      "Free Weight Training (Bench Press, Squats, Deadlifts, Overhead Press)",
      "Machine Workouts (Leg Press, Chest Press, Lat Pulldown)",
      "Kettlebell Workouts (Swings, Cleans, Goblet Squats)",
      "Bodyweight Circuits (Push-ups, Pull-ups, Dips, Lunges, Planks)",
      "TRX Suspension Training (Suspension Exercises, Core Strengthening)",
      "Resistance Band Sessions (Band Rows, Curls, Leg Workouts)",
      // Flexibility//
      "Yoga Classes (Hatha, Vinyasa)",
      "Pilates Classes (Core Strengthening, Stretching)",
      "Dynamic Stretching (Movement-Based Warm-Up)",
      "Static Stretching (Cool-Down Routines, Major Muscle Groups)",
      "Foam Rolling/Mobility (Self-Myofascial Release, Mobility Exercises)",
      // Balance//
      "Stability Ball Workouts (Ball Squats, Planks, Core Drills)",
      "BOSU Ball Training (Squats, Push-ups, Lunges)",
      "Balance Board Exercises (Single-Leg Balance, Proprioception Drills)",
      "Single-Leg Drills (Unilateral Strength, Stability Exercises)",
      "Agility Ladder Drills (Quick Feet, Coordination Exercises)",
    ],
    required: [true, "Type of workout is required."],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required."],
    },
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required."],
  },
});

const GymSession = model("GymSession", gymSessionSchema);

module.exports = GymSession;
