export interface TaskStats {
    totalTasks: number;
    completed: number;
    pending: number;
    submitted: number;
    approved: number;
    rejected: number;
  }

  export interface Course {
    course_id: string;
    title: string;
  }
  
  export interface CoursesResponse {
    courses: Course[];
  }
  
  
  export interface TaskStatsResponse {
    courses: CoursesResponse;
    taskStats: TaskStats;
    completionPercentage: number;
  }
  
