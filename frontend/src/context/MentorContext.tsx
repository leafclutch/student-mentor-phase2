import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import {
  getMentorDashboard,
  getMentorStudents,
  getStudentProfile,
  assignTaskToStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getMentorAssignments,
  reviewAssignment,
} from "../api/mentorApi";
import { createTask, reviewTask } from "../api/taskApi";
import { issueWarning as apiIssueWarning } from "../api/warningApi";
import {
  getNotifications,
  sendNotification,
  markNotificationAsRead,
  markAllAsRead as apiMarkAllAsRead,
} from "../api/notificationApi";
import {
  type Mentor,
  type Student,
  type Task,
  type TaskAssignment,
  TaskStatus,
  type Notification,
  WarningLevel,
} from "../features/mentor/types";

type MentorContextType = {
  dashboard: Mentor | null;
  students: Student[] | null;
  notifications: Notification[] | null;
  selectedStudent: Student | null;
  assignments: TaskAssignment[] | null;
  loading: boolean;
  fetchMentorDashboard: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  fetchStudentDetails: (id: string) => Promise<void>;
  fetchAssignments: () => Promise<void>;
  assignNewTask: (studentId: string, taskId: string) => Promise<void>;
  deleteStudentAction: (studentId: string) => Promise<void>;
  issueWarning: (
    studentId: string,
    remark: string,
    title: string,
    level: WarningLevel
  ) => Promise<void>;
  reviewTaskAction: (
    taskId: string,
    status: TaskStatus,
    feedback: string
  ) => Promise<void>;
  reviewAssignmentAction: (
    assignmentId: string,
    status: TaskAssignment["status"],
    mentorRemark: string
  ) => Promise<void>;
  createNewStudent: (
    studentData: Omit<
      Student,
      "student_id" | "progress" | "warning_count" | "createdAt" | "updatedAt"
    > & { password?: string }
  ) => Promise<void>;
  updateStudentDetails: (
    studentId: string,
    studentData: Partial<Student>
  ) => Promise<void>;
  createNewTask: (
    taskData: Omit<Task, "task_id" | "course" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  sendNewNotification: (
    notificationData: Omit<
      Notification,
      "id" | "isRead" | "createdAt" | "readAt"
    >
  ) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
};

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider = ({ children }: { children: ReactNode }) => {
  const [dashboard, setDashboard] = useState<Mentor | null>(null);
  const [students, setStudents] = useState<Student[] | null>(null);
  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [assignments, setAssignments] = useState<TaskAssignment[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { authUser } = useAuth();

  /* --- DATA FETCHING --- */
  const fetchMentorDashboard = useCallback(async () => {
    if (!authUser || authUser.role !== "MENTOR") return;
    setLoading(true);
    try {
      const [dash, stds, notes] = await Promise.all([
        getMentorDashboard(),
        getMentorStudents(),
        getNotifications(),
      ]);
      setDashboard(dash);
      setStudents(stds);
      setNotifications(notes);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  const fetchStudents = useCallback(async () => {
    if (!authUser || authUser.role !== "MENTOR") return;
    try {
      const response = await getMentorStudents();
      setStudents(response);
    } catch (err) {
      console.error(err);
    }
  }, [authUser]);

  const fetchNotifications = useCallback(async () => {
    if (!authUser || authUser.role !== "MENTOR") return;
    try {
      const response = await getNotifications();
      setNotifications(response);
    } catch (err) {
      console.error(err);
    }
  }, [authUser]);

  const fetchAssignments = useCallback(async () => {
    if (!authUser || authUser.role !== "MENTOR") return;
    setLoading(true);
    try {
      const response = await getMentorAssignments();
      setAssignments(response);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch assignments");
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  const fetchStudentDetails = useCallback(async (id: string) => {
    if (!authUser || authUser.role !== "MENTOR") return;
    setLoading(true);
    try {
      const response = await getStudentProfile(id);
      setSelectedStudent(response);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load student details");
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  /* --- ACTIONS --- */
  const assignNewTask = useCallback(
    async (studentId: string, taskId: string) => {
      try {
        await assignTaskToStudent(studentId, taskId);
        toast.success("Task assigned successfully");
        await fetchStudents(); // Refresh student list to see changes
      } catch (err) {
        console.error(err);
        toast.error("Failed to assign task");
        throw err;
      }
    },
    [fetchStudents]
  );

  const deleteStudentAction = useCallback(
    async (studentId: string) => {
      try {
        await deleteStudent(studentId);
        toast.success("Student deleted successfully");
        await fetchStudents(); // Refresh student list
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete student");
        throw err;
      }
    },
    [fetchStudents]
  );

  const issueWarning = useCallback(
    async (
      studentId: string,
      remark: string,
      title: string,
      level: WarningLevel
    ) => {
      try {
        await apiIssueWarning(studentId, remark, title, level);
        toast.success("Warning issued");
        await fetchStudents(); // Refresh to update warning_count
      } catch (err) {
        console.error(err);
        toast.error("Failed to issue warning");
        throw err;
      }
    },
    [fetchStudents]
  );

  const reviewTaskAction = useCallback(
    async (
      taskId: string,
      status: TaskStatus,
      feedback: string
    ): Promise<void> => {
      try {
        await reviewTask(taskId, "", status, feedback);
        toast.success(`Task marked as ${status}`);
      } catch (err) {
        console.error(err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to review task";
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const reviewAssignmentAction = useCallback(
    async (
      assignmentId: string,
      status: TaskAssignment["status"],
      mentorRemark: string
    ): Promise<void> => {
      try {
        await reviewAssignment(assignmentId, status, mentorRemark);
        toast.success(`Assignment marked as ${status}`);
        await fetchAssignments();
      } catch (err) {
        console.error(err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to review assignment";
        toast.error(errorMessage);
        throw err;
      }
    },
    [fetchAssignments]
  );

  const createNewStudent = useCallback(
    async (
      studentData: Omit<
        Student,
        "student_id" | "progress" | "warning_count" | "createdAt" | "updatedAt"
      > & { password?: string }
    ) => {
      try {
        await createStudent(studentData);
        toast.success("Student created");
        await fetchStudents();
      } catch (err) {
        console.error(err);
        toast.error("Failed to create student");
      }
    },
    [fetchStudents]
  );

  const updateStudentDetails = useCallback(
    async (studentId: string, studentData: Partial<Student>) => {
      try {
        await updateStudent(studentId, studentData);
        toast.success("Student profile updated");
        await fetchStudentDetails(studentId);
      } catch (err) {
        console.error(err);
        toast.error("Update failed");
      }
    },
    [fetchStudentDetails]
  );

  const createNewTask = useCallback(
    async (
      taskData: Omit<Task, "task_id" | "course" | "createdAt" | "updatedAt">
    ) => {
      try {
        await createTask(taskData);
        toast.success("New task created in library");
      } catch (err) {
        console.error(err);
        toast.error("Task creation failed");
      }
    },
    []
  );

  const sendNewNotification = useCallback(
    async (
      notificationData: Omit<
        Notification,
        "id" | "isRead" | "createdAt" | "readAt"
      >
    ) => {
      try {
        await sendNotification(notificationData);
        toast.success("Notification sent");
      } catch (err) {
        console.error(err);
        toast.error("Failed to send notification");
      }
    },
    []
  );

  const markAsRead = useCallback(async (notificationId: string) => {
    // Optimistic Update
    setNotifications((prev) =>
      prev
        ? prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
        : null
    );

    try {
      await markNotificationAsRead(notificationId);
    } catch (err) {
      console.error(err);
      // Revert on failure
      setNotifications((prev) =>
        prev
          ? prev.map((n) =>
            n.id === notificationId ? { ...n, isRead: false } : n
          )
          : null
      );
      toast.error("Failed to mark as read");
    }
  }, []);

  const markAllAsReadAction = useCallback(async () => {
    // Optimistic Update
    const previousNotifications = notifications;
    setNotifications((prev) =>
      prev ? prev.map((n) => ({ ...n, isRead: true })) : null
    );

    try {
      await apiMarkAllAsRead();
    } catch (err) {
      console.error(err);
      // Revert on failure
      setNotifications(previousNotifications);
      toast.error("Failed to mark all as read");
    }
  }, [notifications]);

  useEffect(() => {
    if (authUser && authUser.role === "MENTOR") {
      fetchMentorDashboard();
      fetchAssignments();
    }
  }, [authUser, fetchMentorDashboard, fetchAssignments]);

  return (
    <MentorContext.Provider
      value={{
        dashboard,
        students,
        notifications,
        selectedStudent,
        assignments,
        loading,
        fetchMentorDashboard,
        fetchStudents,
        fetchNotifications,
        fetchStudentDetails,
        fetchAssignments,
        assignNewTask,
        deleteStudentAction,
        issueWarning,
        reviewTaskAction,
        reviewAssignmentAction,
        createNewStudent,
        updateStudentDetails,
        createNewTask,
        sendNewNotification,
        markAsRead,
        markAllAsRead: markAllAsReadAction,
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};

export const useMentor = () => {
  const context = useContext(MentorContext);
  if (!context) throw new Error("useMentor must be used within a MentorProvider");
  return context;
};