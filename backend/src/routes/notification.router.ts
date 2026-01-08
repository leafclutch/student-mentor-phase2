import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { markAllAsRead, markNotificationAsRead } from "../controller/notification.controller";

const router = Router();

router.use(protect)

router.put("/:notificationId/read", markNotificationAsRead);
router.put("/read/all", markAllAsRead);

export default router;