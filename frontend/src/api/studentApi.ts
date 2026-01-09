import api from "./axios";

export const getStudentDashboard = async () => {
  const res = await api.get("/student/dashboard");
  return res.data;
};

export const getStudentWarnings = async () => {
  const res = await api.get("/student/warnings");
  return res.data;
};

export const getStudentNotifications = async () => {
  const res = await api.get("/student/notifications");
  return res.data;
};
