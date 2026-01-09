import axios from "axios";

const api = axios.create({
  baseURL: "https://student-mentor-phase2.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");

  if (auth) {
    const { token } = JSON.parse(auth);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
