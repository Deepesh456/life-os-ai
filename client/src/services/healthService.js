import api from "./api";

// Get all health records
export const getHealthRecords = () => {
  return api.get("/health");
};

// Get latest health record
export const getLatestHealthRecord = () => {
  return api.get("/health/latest");
};

// Create health record
export const createHealthRecord = (data) => {
  return api.post("/health", data);
};

// Update health record
export const updateHealthRecord = (id, data) => {
  return api.put(`/health/${id}`, data);
};

// Delete health record
export const deleteHealthRecord = (id) => {
  return api.delete(`/health/${id}`);
};