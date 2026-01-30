import prisma from "../connect";
import { NotificationType } from "@prisma/client";

export const getNotifications = async (userId: string) => {
  return await prisma.notification.findMany({
    where: { user_id: userId },
    orderBy: { createdAt: "desc" },
  });
};

export const createNotification = async (
  userId: string,
  message: string,
  type: NotificationType,
  relatedId?: string
) => {
  return await prisma.notification.create({
    data: {
      user_id: userId,
      message,
      type,
      relatedId: relatedId || null,
    },
  });
};

export const markAsRead = async (notificationId: string) => {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });
};

// Mark a single notification as read
export const markNotificationAsReadService = async (
  notificationId: string,
  userId: string
) => {
  // Make sure notification belongs to this user
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  if (!notification || notification.user_id !== userId) {
    throw new Error("Notification not found or not authorized by this student");
  }

  const updated = await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });

  return updated;
};

// Mark all notifications as read for a user
export const markAllNotificationsAsReadService = async (userId: string) => {
  await prisma.notification.updateMany({
    where: { user_id: userId, isRead: false },
    data: { isRead: true },
  });
};
