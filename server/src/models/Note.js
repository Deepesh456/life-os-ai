const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },

    content: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Personal",
        "Work",
        "Study",
        "Finance",
        "Health",
        "Meeting",
        "Ideas",
        "Others",
      ],
      default: "Personal",
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.index({
  user: 1,
  updatedAt: -1,
});

module.exports = mongoose.model("Note", noteSchema);