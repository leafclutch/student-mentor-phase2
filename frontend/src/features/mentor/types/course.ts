
import type { Mentor } from "./mentor";
import type { Task } from "./task";

export interface Course {
  course_id: string;
  title: string;
  url?: string;
  description?: string;
  mentor_id: string;
  mentor: Mentor;
  tasks?: Task[];
  createdAt: Date;
  updatedAt: Date;
}
