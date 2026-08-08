import api from "./api";

// Get all notes
export const getNotes = () =>
  api.get("/notes");

// Get single note
export const getNote = (id) =>
  api.get(`/notes/${id}`);

// Create note
export const createNote = (note) =>
  api.post("/notes", note);

// Update note
export const updateNote = (id, note) =>
  api.put(`/notes/${id}`, note);

// Delete note
export const deleteNote = (id) =>
  api.delete(`/notes/${id}`);

// Toggle Favorite
export const toggleFavorite = (id) =>
  api.patch(`/notes/${id}/favorite`);

// Toggle Pin
export const togglePinned = (id) =>
  api.patch(`/notes/${id}/pin`);