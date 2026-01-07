import { Router } from "express";
import {
  getMentorDashboard,
  getMentorStudents,
  assignTaskToStudent,
} from "../controller/mentor.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.get("/dashboard", getMentorDashboard);
router.get("/students", getMentorStudents);
router.post("/tasks/assign", assignTaskToStudent);

export default router;
