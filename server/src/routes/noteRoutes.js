const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  toggleFavorite,
  togglePinned,
} = require("../controllers/noteController");

// CRUD
router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.get("/:id", authMiddleware, getNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

// Favorite
router.patch("/:id/favorite", authMiddleware, toggleFavorite);

// Pin
router.patch("/:id/pin", authMiddleware, togglePinned);

module.exports = router;