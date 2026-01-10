import api from "./axios";

// --- 3. MENTOR MANAGEMENT ---

// 3.1) Mentor Dashboard Stats
export const getMentorDashboard = async () => {
  const res = await api.get("/mentors/dashboard");
  return res.data;
};

// 3.2) Get Assigned Students
export const getMentorStudents = async () => {
  const res = await api.get("/mentors/students");
  return res.data;
};

// 3.3) Create Student
export const createStudent = async (studentData: any) => {
  const res = await api.post("/mentors/students", studentData);
  return res.data;
};

// 3.4) Update Student (New - Based on screenshot 3.4)
export const updateStudent = async (studentId: string, updateData: any) => {
  const res = await api.put(`/mentors/students/${studentId}`, updateData);
  return res.data;
};

// --- 4. TASK MANAGEMENT (Plural '/tasks' as per Postman) ---

// 4.1) Create Task
// Note: As per Postman 4.1, the URL is POST /tasks/
export const createTask = async (taskData: {  title: string; description: string; course_id: string; doc_link?: string}) => {
  const res = await api.post("/tasks", taskData);
  return res.data;
};
// src/api/mentorApi.ts

export const getAllTasks = async () => {
  // Matches your new Postman screenshot: GET /tasks
  const res = await api.get("/tasks");
  return res.data; 
};

// 4.2) Fetch Tasks
// CRITICAL: Postman 4.2 shows this returns a specific task by TASK_ID.
// If your backend allows fetching by student_id, the URL might differ.
export const fetchTasks = async (taskId: string) => {
  const res = await api.get(`/tasks/${taskId}`);
  return res.data;
};

// 4.3) Update Task (Review)
export const updateTask = async (taskId: string, reviewData: {studentId: string; status: string;  remark: string }) => {
  // Path matched to your Postman 4.3 screenshot: /tasks/{{task_id}}/review
  const res = await api.put(`/tasks/${taskId}/review`, reviewData);
  return res.data;
};

// --- WARNINGS ---
export const issueWarning = async (warningData: { student_id: string; severity: string; title: string; description: string }) => {
  const res = await api.post("/mentors/issue-warning", warningData);
  return res.data;
};