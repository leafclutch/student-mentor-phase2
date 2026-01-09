import api from "./axios";

export const getStudentDashboard = async () => {
  const res = await api.get("/students/dashboard");
  return res.data;
};

export const getAssignTasks = async () => {
  const res = await api.get("/students/tasks");
  return res.data;
};

export const submitTask = async (studentId:string) => {
  const res = await api.post(`/students/tasks/${studentId}/submit`);
  return res.data;
};

export const getProgressReport = async () => {
  const res = await api.get(`/students/progress`);
  return res.data;
};

export const getStudentWarnings = async () => {
  const res = await api.get("/warnings");
  return res.data;
};

export const getStudentNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data;
};

export const markAsRead = async (notificationId:string) => {
  const res = await api.put(`/notifications/${notificationId}/read`);
  return res.data;
};

export const markAsReadAll = async () => {
  const res = await api.put("/notifications/read/all");
  return res.data;
};
