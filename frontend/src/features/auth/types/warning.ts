export interface Mentor {
    mentor_id: string;
    name: string;
  }
  
  export type WarningLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  export type WarningStatus = "ACTIVE" | "RESOLVED";
  
  export interface Warning {
    id: string;
    student_id: string;
    mentor_id: string;
    title: string;
    remark: string;
    level: WarningLevel;
    status: WarningStatus;
    createdAt: string; // ISO date string
    mentor: Mentor;
  }
  
  export interface WarningsResponse {
    warnings: Warning[];
    counts: {
      active: number;
      resolved: number;
    };
  }
  