//it is an mock file for testing frontend

import type { Student, Notification } from "./types";
import type { Warning } from "./pages/Warnings";

export const mockStudent: Student = {
  id: "26STD001",
  name: "Alex Johnson",
  email: "alex@student.com",
  photo: "/image/john.jpg",
  progress: 25,
  courseName: "Web Development Course",
  courseUrl: "https://course-url.com",
  liveClassUrl: "https://course-url.com/meet/xyz-abc",
  mentor: {
    name: "Sarah Connor",
    expertise: "Senoir Dev",
    email: "mentor@example.com",
    discordLink: "https://discord.gg/example",
  },
  tasks:[
    {task_id:1, title: "HTML Basics", status: "completed", deadline: "2026-01-10"},
    {task_id:2, title: "CSS Styling", status: "in_progress", deadline: "2026-01-15"},
    {task_id:3, title: "Responsive Layouts", status: "pending", deadline: "2026-01-20"},
  ]
};



export const mockWarnings: Warning[] = [
  {
    id: 1,
    title: "Consecutive Missed Deadlines",
    message:
      "You have missed submission deadlines for multiple tasks. Please submit pending work or contact your mentor.",
    level: "High",
    date: "Oct 24, 2023",
    mentor: "Sarah Connor",
    status: "active",
  },
  {
    id: 2,
    title: "Low Attendance",
    message: "You missed 3 consecutive live sessions.",
    level: "Medium",
    date: "Sept 12, 2023",
    mentor: "John Smith",
    status: "resolved",
  },
  {
    id: 3,
    title: "Late Submission",
    message: "HTML Basics task was submitted late.",
    level: "Low",
    date: "July 20, 2023",
    mentor: "Sarah Connor",
    status: "resolved",
  },
];


export const mockNotifications: Notification[] = [
  {
    id: 1,
    message: "New task assigned: Task 4",
    type: "success",
    date: "2026-01-06",
  },
  {
    id: 2,
    message: "Mentor updated your progress on Task 2",
    type: "info",
    date: "2026-01-05",
  },
  {
    id: 3,
    message: "Course Web Development will start tomorrow",
    type: "warning",
    date: "2026-01-04",
  },
];

