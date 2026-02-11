
import type { Mentor } from "./mentor";
import type { TaskAssignment } from "./task";
import type { Warning } from "./warning";

export interface Student {
  student_id: string;
  name: string;
  email?: string;
  photo?: string;
  social_links?: string;
  progress: number;
  warning_count: number;
  warning_status?: string;
  mentorAssignments?: MentorStudent[];
  assignments?: TaskAssignment[];
  warnings?: Warning[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MentorStudent {
  id: string;
  mentor_id: string;
  student_id: string;
  mentor: Mentor;
  student: Student;
  assignedAt: Date;
  isActive: boolean;
}
