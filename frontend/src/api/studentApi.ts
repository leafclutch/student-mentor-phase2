import api from "./axios";
import type { StudentAssignment } from "../features/auth/types/student";
import type { Notification } from "../features/auth/types/notification";
import type { Warning } from "../features/auth/types/warning";

export const getStudentDashboard = async (): Promise<any> => {
  const res = await api.get("/students/dashboard");
  return res.data;
};

export const getAssignTasks = async (): Promise<{ tasks: StudentAssignment[] } | StudentAssignment[]> => {
  const res = await api.get("/students/tasks");
  return res.data;
};

export const submitTask = async (
  taskId: string,
  studentId: string,
  link: string
): Promise<StudentAssignment> => {
  const res = await api.post(`/students/tasks/${taskId}/submit`, {
    student_id: studentId,
    github_link: link,
  });
  return res.data;
};

export const getProgressReport = async (): Promise<any> => {
  const res = await api.get(`/students/progress`);
  return res.data;
};

export const getStudentWarnings = async (): Promise<{ warnings: Warning[] }> => {
  const res = await api.get("/warnings");
  return res.data;
};

export const getStudentNotifications = async (): Promise<{ notifications: Notification[] } | Notification[]> => {
  const res = await api.get("/notifications");
  return res.data;
};

export const markAsRead = async (notificationId: string): Promise<void> => {
  await api.put(`/notifications/${notificationId}/read`);
};

export const markAsReadAll = async (): Promise<void> => {
  await api.put("/notifications/read/all");
};

export const resolveWarning = async (
  warningId: string,
  comment: string
): Promise<{ message: string; warning: Record<string, unknown> }> => {
  const res = await api.patch(`/students/warnings/${warningId}/resolve`, {
    comment,
  });
  return res.data;
};
