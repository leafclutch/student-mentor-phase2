
import type { MentorStudent } from "./student";
import type { Course } from "./course";
import type { Warning } from "./warning";

export interface Mentor {
  mentor_id: string;
  name: string;
  photo?: string;
  contact?: string;
  bio?: string;
  studentAssignments?: MentorStudent[];
  courses?: Course[];
  warningsSent?: Warning[];
  createdAt: Date;
  updatedAt: Date;
}
