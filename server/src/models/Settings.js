const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    theme: {
      type: String,
      enum: ["Light", "Dark", "System"],
      default: "System",
    },

    language: {
      type: String,
      default: "English",
    },

    notifications: {
      email: {
        type: Boolean,
        default: true,
      },

      taskReminders: {
        type: Boolean,
        default: true,
      },

      meetingReminders: {
        type: Boolean,
        default: true,
      },

      goalReminders: {
        type: Boolean,
        default: true,
      },
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Settings",
  settingsSchema
);