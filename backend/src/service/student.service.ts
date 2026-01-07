import prisma from "../connect/index";
import { AppError } from "../utils/apperror";
import { TaskStatus } from "@prisma/client";

export const getStudentTasksService = async (studentId: string) => {
  if (!studentId) {
    throw new AppError("Student ID is required", 400);
  }

  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  const assignments = await prisma.taskAssignment.findMany({
    where: { student_id: studentId },
    include: {
      task: {
        select: {
          task_id: true,
          title: true,
          description: true,
          doc_link: true,
          course: {
            select: {
              course_id: true,
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return assignments;
};


interface SubmitTaskPayload {
  github_link?: string;
  hosted_link?: string;
}

export const submitStudentTaskService = async (
  studentId: string,
  taskId: string,
  payload: SubmitTaskPayload
) => {
  if (!studentId) {
    throw new AppError("Student ID is required", 400);
  }

  if (!taskId) {
    throw new AppError("Task ID is required", 400);
  }

  const { github_link, hosted_link } = payload;

  if (!github_link && !hosted_link) {
    throw new AppError(
      "At least one of github_link or hosted_link is required",
      400
    );
  }

  const assignment = await prisma.taskAssignment.findUnique({
    where: {
      task_id_student_id: {
        task_id: taskId,
        student_id: studentId
      }
    }
  });

  if (!assignment) {
    throw new AppError("Task assignment not found for this student", 404);
  }

  const updatedAssignment = await prisma.taskAssignment.update({
    where: {
      task_id_student_id: {
        task_id: taskId,
        student_id: studentId,
      },
    },
    data: {
      github_link: github_link as string,
      hosted_link: hosted_link as string,
      status: TaskStatus.SUBMITTED,
      submittedAt: new Date(),
    },
  });

  return updatedAssignment;
};

