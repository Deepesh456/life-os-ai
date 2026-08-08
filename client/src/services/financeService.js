import api from "./api";

// Get all transactions + statistics
export const getTransactions = () =>
  api.get("/finance");

// Create transaction
export const createTransaction = (transaction) =>
  api.post("/finance", transaction);

// Update transaction
export const updateTransaction = (id, transaction) =>
  api.put(`/finance/${id}`, transaction);

// Delete transaction
export const deleteTransaction = (id) =>
  api.delete(`/finance/${id}`);