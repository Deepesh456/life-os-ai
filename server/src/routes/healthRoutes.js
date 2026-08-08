const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createHealthRecord,
  getHealthRecords,
  getLatestHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
} = require("../controllers/healthController");

// All health routes require authentication
router.use(authMiddleware);

// Create
router.post("/", createHealthRecord);

// Get all
router.get("/", getHealthRecords);

// Get latest
router.get("/latest", getLatestHealthRecord);

// Update
router.put("/:id", updateHealthRecord);

// Delete
router.delete("/:id", deleteHealthRecord);

module.exports = router;