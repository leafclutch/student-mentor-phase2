import api from "./axios";

export const getMentorDashboard = async () => {
  const res = await api.get("/mentors/dashboard");
  return res.data;
};

export const getMentorWarnings = async () => {
  const res = await api.get("/mentors/warnings");
  return res.data;
};

export const getMentorStudents = async () => {
  const res = await api.get("/mentors/students");
  return res.data;
};
