const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/financeController");

// Create Transaction
router.post("/", authMiddleware, createTransaction);

// Get All Transactions + Statistics
router.get("/", authMiddleware, getTransactions);

// Update Transaction
router.put("/:id", authMiddleware, updateTransaction);

// Delete Transaction
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;