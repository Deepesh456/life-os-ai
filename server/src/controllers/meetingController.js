const Meeting = require("../models/Meeting");

// Create meeting
const createMeeting = async (req, res) => {
  try {
    const userId = req.user.id;

    const meeting = await Meeting.create({
      user: userId,
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      message: "Meeting created successfully",
      meeting,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Get all meetings
const getMeetings = async (req, res) => {
  try {
    const userId = req.user.id;

    const meetings = await Meeting.find({
      user: userId,
    }).sort({
      date: 1,
      startTime: 1,
    });

    res.json({
      status: "success",
      meetings,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Get upcoming meetings
const getUpcomingMeetings = async (req, res) => {
  try {
    const userId = req.user.id;

    const meetings = await Meeting.find({
      user: userId,
      date: {
        $gte: new Date(),
      },
      status: "Scheduled",
    }).sort({
      date: 1,
      startTime: 1,
    });

    res.json({
      status: "success",
      meetings,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Get single meeting
const getMeeting = async (req, res) => {
  try {
    const userId = req.user.id;

    const meeting = await Meeting.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!meeting) {
      return res.status(404).json({
        status: "error",
        message: "Meeting not found",
      });
    }

    res.json({
      status: "success",
      meeting,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Update meeting
const updateMeeting = async (req, res) => {
  try {
    const userId = req.user.id;

    const meeting = await Meeting.findOneAndUpdate(
      {
        _id: req.params.id,
        user: userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!meeting) {
      return res.status(404).json({
        status: "error",
        message: "Meeting not found",
      });
    }

    res.json({
      status: "success",
      message: "Meeting updated successfully",
      meeting,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Delete meeting
const deleteMeeting = async (req, res) => {
  try {
    const userId = req.user.id;

    const meeting = await Meeting.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!meeting) {
      return res.status(404).json({
        status: "error",
        message: "Meeting not found",
      });
    }

    res.json({
      status: "success",
      message: "Meeting deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  createMeeting,
  getMeetings,
  getUpcomingMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting,
};