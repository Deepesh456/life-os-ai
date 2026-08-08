import api from "./api";

export const getMeetings = () => {
  return api.get("/meetings");
};

export const getUpcomingMeetings = () => {
  return api.get("/meetings/upcoming");
};

export const getMeeting = (id) => {
  return api.get(`/meetings/${id}`);
};

export const createMeeting = (data) => {
  return api.post("/meetings", data);
};

export const updateMeeting = (id, data) => {
  return api.put(`/meetings/${id}`, data);
};

export const deleteMeeting = (id) => {
  return api.delete(`/meetings/${id}`);
};