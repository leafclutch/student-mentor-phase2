import { Router } from "express";
import { getStudentTasks, submitStudentTask } from "../controller/student.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.get("/tasks", getStudentTasks); //fetch assigned tasks
router.post("/tasks/:taskId/submit", submitStudentTask); //submit task

export default router;


