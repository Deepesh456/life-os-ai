const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Life OS AI API is working 🚀",
  });
});

module.exports = router;