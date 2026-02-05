import { Request, Response, NextFunction } from "express";
import * as notificationService from "../service/notification.service";
import { NotificationType } from "@prisma/client";

interface AuthRequest extends Request {
  user?: any;
}

export const getNotifications = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("Decoded User:", req.user); 
    const userId = req.user?.user_id; 
    if (!userId) {
       res.status(401).json({ message: "Unauthorized" });
         return 
    }

    const notifications = await notificationService.getNotifications(userId);
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const sendNotification = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, message, type, relatedId } = req.body;

    if (!userId || !message) {
       res.status(400).json({ message: "userId and message are required" });
       return
    }

    // Default to MENTOR_MESSAGE if type is invalid or missing, since only mentors can send notifications
    const notificationType = (type as NotificationType) || NotificationType.MENTOR_MESSAGE;

    const notification = await notificationService.createNotification(
      userId,
      message,
      notificationType,
      relatedId
    );

    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};
