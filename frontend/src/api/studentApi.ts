import api from "./axios";

export const getStudentDashboard = async () => {
  const res = await api.get("/students/dashboard");
  return res.data;
};

export const getStudentWarnings = async () => {
  const res = await api.get("/students/warnings");
  return res.data;
};

export const getStudentNotifications = async () => {
  const res = await api.get("/students/notifications");
  return res.data;
};
