// Notification types
export type NotificationType = "TASK_ASSIGNED" | "SYSTEM_ANNOUNCEMENT" | "OTHER";

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
