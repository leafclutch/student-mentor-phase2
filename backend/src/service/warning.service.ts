import prisma from "../connect/index";
import { AppError } from "../utils/apperror";
import { WarningLevel, WarningStatus } from "@prisma/client";

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
    }
  });

  const student = await prisma.student.update({
    where: { student_id },
    data: {
      warning_count: {
        increment: 1,
      }
    },
  });

  return { warning, student };
};

export const getStudentWarningsService = async (
  studentId: string,
  mentorId?: string
) => {
  // Check if the student exists
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  // If a mentor is requesting, verify the student is assigned to them
  if (mentorId) {
    const isAssigned = await prisma.mentorStudent.findFirst({
      where: {
        mentor_id: mentorId,
        student_id: studentId,
        isActive: true,
      },
    });

    if (!isAssigned) {
      throw new AppError("You are not authorized to view warnings for this student", 403);
    }
  }

  // Fetch all warnings for this student
  const warnings = await prisma.warning.findMany({
    where: { student_id: studentId },
    include: {
      mentor: {
        select: {
          mentor_id: true,
          name: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  // Count warnings by status
  const activeCount = await prisma.warning.count({
    where: { student_id: studentId, status: WarningStatus.ACTIVE },
  });

  const resolvedCount = await prisma.warning.count({
    where: { student_id: studentId, status: WarningStatus.RESOLVED },
  });

  return {
    warnings,
    counts: {
      active: activeCount,
      resolved: resolvedCount,
    },
  }
};


