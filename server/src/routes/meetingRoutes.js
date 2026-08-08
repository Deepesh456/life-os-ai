const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createMeeting,
  getMeetings,
  getUpcomingMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

router.use(authMiddleware);

// Create
router.post("/", createMeeting);

// Upcoming meetings
router.get("/upcoming", getUpcomingMeetings);

// Get all
router.get("/", getMeetings);

// Get single
router.get("/:id", getMeeting);

// Update
router.put("/:id", updateMeeting);

// Delete
router.delete("/:id", deleteMeeting);

module.exports = router;