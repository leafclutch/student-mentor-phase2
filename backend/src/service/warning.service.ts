import prisma from "../connect/index";
import { AppError } from "../utils/apperror";
import { WarningLevel } from "@prisma/client";

interface IssueWarningPayload {
  student_id: string;
  title: string;
  remark: string;
  level: WarningLevel;
}

export const issueWarningService = async (
  mentorId: string,
  payload: IssueWarningPayload
) => {
  const { student_id, title, remark, level } = payload;

  if (!student_id || !title || !remark || !level) {
    throw new AppError("student_id, title, remark and level are required", 400);
  }

  const isStudentAssignedToMentor = await prisma.mentorStudent.findFirst({
    where: {
      mentor_id: mentorId,
      student_id,
      isActive: true,
    },
  });

  if (!isStudentAssignedToMentor) {
    throw new AppError(
      "This student is not currently assigned to you as a mentor",
      403
    );
  }

  const warning = await prisma.warning.create({
    data: {
      student_id,
      mentor_id: mentorId,
      title,
      remark,
      level,
    },
  });

  const student = await prisma.student.update({
    where: { student_id },
    data: {
      warning_count: {
        increment: 1,
      },
      warning_status: "ACTIVE",
    },
  });

  return { warning, student };
};

export const getStudentWarningsService = async (
  studentId: string,
  requesterId: string,
  requesterRole: string
) => {
  if (!studentId) {
    throw new AppError("Student ID is required", 400);
  }

  // Check if student exists
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  // Authorization check
  if (requesterRole === "STUDENT") {
    // Students can only see their own warnings
    if (requesterId !== studentId) {
      throw new AppError("Access denied. You can only view your own warnings.", 403);
    }
  } else if (requesterRole === "MENTOR") {
    // Mentors can only see warnings for students assigned to them
    const isStudentAssignedToMentor = await prisma.mentorStudent.findFirst({
      where: {
        mentor_id: requesterId,
        student_id: studentId,
        isActive: true,
      },
    });

    if (!isStudentAssignedToMentor) {
      throw new AppError(
        "Access denied. You can only view warnings for students assigned to you.",
        403
      );
    }
  } else {
    throw new AppError("Access denied.", 403);
  }

  // Fetch warnings with mentor details
  const warnings = await prisma.warning.findMany({
    where: { student_id: studentId },
    include: {
      mentor: {
        select: {
          mentor_id: true,
          name: true,
          photo: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return warnings;
};


