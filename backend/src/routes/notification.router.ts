import { Router } from "express";
import { getNotifications, sendNotification } from "../controller/notification.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.get("/", getNotifications);
router.post("/", sendNotification); 

export default router;
