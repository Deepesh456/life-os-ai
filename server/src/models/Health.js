const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    weight: {
      type: Number,
      min: 0,
      default: null,
    },

    waterIntake: {
      type: Number,
      min: 0,
      default: 0,
    },

    sleepHours: {
      type: Number,
      min: 0,
      max: 24,
      default: 0,
    },

    exerciseMinutes: {
      type: Number,
      min: 0,
      default: 0,
    },

    exerciseType: {
      type: String,
      default: "",
      trim: true,
    },

    calories: {
      type: Number,
      min: 0,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Health", healthSchema);