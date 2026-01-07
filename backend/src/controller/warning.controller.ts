import { Request, Response, NextFunction } from "express";
import * as warningService from "../service/warning.service";
import { AppError } from "../utils/apperror";

interface AuthRequest extends Request {
  user?: any;
}

export const issueWarning = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.user_id;
    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    if (req.user.role !== "MENTOR") {
      throw new AppError("Access denied. Mentors only.", 403);
    }

    const result = await warningService.issueWarningService(userId, req.body);

    res.status(201).json({
      message: "Warning issued successfully",
      ...result,
    });
  } catch (error: any) {
    next(
      new AppError(
        error.message || "Failed to issue warning",
        error.statusCode || 500
      )
    );
  }
};

export const getStudentWarnings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.user_id;
    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const { studentId } = req.params;

    if (!studentId) {
      throw new AppError("Student ID is required", 400);
    }

    const warnings = await warningService.getStudentWarningsService(
      studentId,
      userId,
      req.user.role
    );

    res.status(200).json(warnings);
  } catch (error: any) {
    next(
      new AppError(
        error.message || "Failed to fetch warnings",
        error.statusCode || 500
      )
    );
  }
};


