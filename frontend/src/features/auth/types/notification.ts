// Notification types
export type NotificationType = "TASK_ASSIGNED" | "TASK_REVIEWED" | "WARNING_ISSUED" | "SYSTEM_ANNOUNCEMENT" | "COURSE_CREATED";

// Single notification
export interface Notification {
  id: string;
  user_id: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  relatedId: string | null; // e.g., taskId or assignmentId
  createdAt: string; // ISO date string
  readAt: string | null; // ISO date string when read
}

// Array of notifications
export type NotificationsResponse = Notification[];
