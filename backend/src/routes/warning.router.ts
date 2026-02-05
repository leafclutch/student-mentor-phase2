import { Router } from "express";
import { issueWarning, getStudentWarnings } from "../controller/warning.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

// POST /warnings - issue a warning (mentor only)
router.post("/", issueWarning);

// GET /warnings/:studentId? - fetch warnings for a student (student sees own, mentor sees assigned student's)
router.get("/:studentId?", getStudentWarnings);

export default router;


