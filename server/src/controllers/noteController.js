const Note = require("../models/Note");

// Create Note
const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      status: "success",
      note,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get All Notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    }).sort({
      pinned: -1,
      updatedAt: -1,
    });

    res.json({
      status: "success",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get Single Note
const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }

    res.json({
      status: "success",
      note,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update Note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }

    res.json({
      status: "success",
      note,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }

    res.json({
      status: "success",
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Toggle Favorite
const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }

    note.favorite = !note.favorite;
    await note.save();

    res.json({
      status: "success",
      note,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Toggle Pin
const togglePinned = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }

    note.pinned = !note.pinned;
    await note.save();

    res.json({
      status: "success",
      note,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  toggleFavorite,
  togglePinned,
};