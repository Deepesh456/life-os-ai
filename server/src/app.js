const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const goalRoutes = require("./routes/goalRoutes");
const eventRoutes = require("./routes/eventRoutes");
const noteRoutes = require("./routes/noteRoutes");
const financeRoutes = require("./routes/financeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const healthRoutes = require("./routes/healthRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/settings", settingsRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Life OS AI API is working 🚀",
  });
});

// Protected Test Route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    status: "success",
    message: "Protected route accessed successfully!",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("🚀 Life OS AI Backend is Running");
});
module.exports = app;