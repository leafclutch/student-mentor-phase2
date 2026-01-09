import { Router } from "express";
import { getNotifications, sendNotification, markAllAsRead, markNotificationAsRead } from "../controller/notification.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.get("/", getNotifications);
router.post("/", restrictTo('MENTOR'), sendNotification); 
router.put("/:notificationId/read", markNotificationAsRead);
router.put("/read/all", markAllAsRead);

export default router;
