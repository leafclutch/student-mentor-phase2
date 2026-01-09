// src/features/student/types.ts

// src/features/student/types.ts

export type TaskStatus = "completed" | "in_progress" | "pending";

export interface Task {
  task_id: number;
  title: string;
  status: TaskStatus;
  description?: string; // optional, for task details
  requirements?: string[]; // optional
  deadline?: string; // optional
}

export interface Student {
  id: string;
  name: string;
  email: string;
  photo: string; // profile image
  progress: number;
  courseName: string;
  courseUrl: string;
  liveClassUrl: string;
  mentor: {
    name: string;
    email: string;
    discordLink: string;
    expertise: string;
  };
  tasks: Task[]; // all tasks for progress
}


export type WarningType =
  | "deadline_near"
  | "deadline_exceeded"
  | "task_rejected"
  | "general";

export type Warning = {
  id: number;
  taskTitle: string;
  message: string;
  type: WarningType;
  issuedAt: string;
};

export type NotificationType = "info" | "warning" | "success";
export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  date: string;
};
