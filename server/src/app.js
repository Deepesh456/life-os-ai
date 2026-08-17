const express = require("express");
const cors = require("cors");

// Routes
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

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// API ROUTES
// =========================

// Authentication
app.use("/api/auth", authRoutes);

// Protected application modules
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/settings", settingsRoutes);

// =========================
// API STATUS CHECK
// =========================

app.get("/api/status", (req, res) => {
  res.json({
    status: "success",
    message: "Life OS AI API is working 🚀",
  });
});

// =========================
// PROTECTED TEST ROUTE
// =========================

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    status: "success",
    message: "Protected route accessed successfully!",
    user: req.user,
  });
});

// =========================
// ROOT ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("🚀 Life OS AI Backend is Running");
});

// =========================
// EXPORT
// =========================

module.exports = app;