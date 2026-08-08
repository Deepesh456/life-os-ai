const Settings = require("../models/Settings");

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({
      user: req.user._id,
    });

    if (!settings) {
      settings = await Settings.create({
        user: req.user._id,
      });
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const {
      theme,
      language,
      notifications,
      timezone,
    } = req.body;

    const settings =
      await Settings.findOneAndUpdate(
        {
          user: req.user._id,
        },
        {
          theme,
          language,
          notifications,
          timezone,
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update settings",
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};