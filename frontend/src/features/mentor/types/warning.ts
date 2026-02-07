
import type { Student } from "./student";
import type { Mentor } from "./mentor";

export enum WarningLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum WarningStatus {
  ACTIVE = "ACTIVE",
  RESOLVED = "RESOLVED",
}

export interface Warning {
  id: string;
  student_id: string;
  mentor_id: string;
  student: Student;
  mentor: Mentor;
  title: string;
  remark: string;
  level: WarningLevel;
  status: WarningStatus;
  createdAt: Date;
}
