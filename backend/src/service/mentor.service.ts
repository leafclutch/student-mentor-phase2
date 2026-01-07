import prisma from "../connect/index";
import { AppError } from "../utils/apperror";

export const getMentorDashboardService = async (mentorId: string) => {
  const mentor = await prisma.mentor.findUnique({
    where: { mentor_id: mentorId },
    select: {
      name: true,
      photo: true,
      contact: true,
      bio: true,
    },
  });

  if (!mentor) {
    throw new AppError("Mentor not found", 404);
  }

  const totalStudents = await prisma.mentorStudent.count({
    where: { mentor_id: mentorId, isActive: true },
  });

  return { mentor, stats: { totalStudents } };
};


interface MentorStudentWithStudent {
  student: {
    student_id: string;
    name: string;
    photo: string | null;
    progress: number;
    warning_status: string | null;
  };
}

export const getMentorStudentsService = async (mentorId: string) => {
  const students = await prisma.mentorStudent.findMany({
    where: { mentor_id: mentorId, isActive: true },
    include: {
      student: {
        select: {
          student_id: true,
          name: true,
          photo: true,
          progress: true,
          warning_status: true,
        },
      },
    },
  });

  return students.map((ms: MentorStudentWithStudent) => ms.student);
};


interface AssignTaskPayload {
  task_id: string;
  student_id: string;
}

export const assignTaskToStudentService = async (
  mentorId: string,
  payload: AssignTaskPayload
) => {
  const { task_id, student_id } = payload;

  if (!task_id || !student_id) {
    throw new AppError("task_id and student_id are required", 400);
  }

  const task = await prisma.task.findUnique({
    where: { task_id },
    include: {
      course: {
        select: {
          mentor_id: true,
        },
      },
    },
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.course.mentor_id !== mentorId) {
    throw new AppError("You can only assign tasks from your own courses", 403);
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

  try {
    const assignment = await prisma.taskAssignment.create({
      data: {
        task_id,
        student_id,
      },
      include: {
        task: true,
      },
    });

    return assignment;
  } catch (error: any) {
    // Handle unique constraint: a student can only have one assignment per task
    if (
      error.code === "P2002" &&
      Array.isArray(error.meta?.target) &&
      error.meta?.target.includes("task_id") &&
      error.meta?.target.includes("student_id")
    ) {
      throw new AppError(
        "This task is already assigned to this student",
        400
      );
    }

    throw error;
  }
};
