import { Router } from "express";
import { issueWarning, getStudentWarnings } from "../controller/warning.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

// POST /warnings - issue a warning (mentor only)
router.post("/", issueWarning);

// GET /warnings/:studentId - fetch warnings for a student (student can see own, mentor can see assigned students)
router.get("/", getStudentWarnings);

export default router;


