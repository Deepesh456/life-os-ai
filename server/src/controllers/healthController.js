const Health = require("../models/Health");

// Create health record
const createHealthRecord = async (req, res) => {
  try {
    const userId = req.user.id;

    const health = await Health.create({
      user: userId,
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      message: "Health record created successfully",
      health,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Get health records
const getHealthRecords = async (req, res) => {
  try {
    const userId = req.user.id;

    const records = await Health.find({
      user: userId,
    }).sort({
      date: -1,
    });

    res.json({
      status: "success",
      records,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Get latest health record
const getLatestHealthRecord = async (req, res) => {
  try {
    const userId = req.user.id;

    const health = await Health.findOne({
      user: userId,
    }).sort({
      date: -1,
    });

    res.json({
      status: "success",
      health,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Update health record
const updateHealthRecord = async (req, res) => {
  try {
    const userId = req.user.id;

    const health = await Health.findOneAndUpdate(
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

    if (!health) {
      return res.status(404).json({
        status: "error",
        message: "Health record not found",
      });
    }

    res.json({
      status: "success",
      message: "Health record updated successfully",
      health,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Delete health record
const deleteHealthRecord = async (req, res) => {
  try {
    const userId = req.user.id;

    const health = await Health.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!health) {
      return res.status(404).json({
        status: "error",
        message: "Health record not found",
      });
    }

    res.json({
      status: "success",
      message: "Health record deleted successfully",
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
  createHealthRecord,
  getHealthRecords,
  getLatestHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
};