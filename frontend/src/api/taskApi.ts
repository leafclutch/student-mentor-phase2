import api from "./axios";
import { type Task, type TaskAssignment, TaskStatus } from "../features/mentor/types/task";

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data.tasks || res.data;
};

export const createTask = async (data: Omit<Task, 'task_id' | 'course' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const getTask = async (taskId: string): Promise<Task> => {
  const res = await api.get(`/tasks/${taskId}`);
  return res.data;
};

export const reviewTask = async (
  taskId: string,
  studentId: string,
  status: TaskStatus,
  remark: string
): Promise<TaskAssignment> => {
  const res = await api.put(`/tasks/${taskId}/review`, {
    studentId,
    status,
    remark,
  });
  return res.data;
};