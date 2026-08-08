const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      default: "",
    },

    endTime: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: ["Meeting", "Task", "Reminder", "Personal"],
      default: "Personal",
    },

    color: {
      type: String,
      trim: true,
      default: "#7C3AED",
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Optimize queries by user and date
eventSchema.index({
  user: 1,
  date: 1,
});

module.exports = mongoose.model("Event", eventSchema);