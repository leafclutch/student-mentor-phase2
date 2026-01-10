import axios from "axios";

const api = axios.create({
  baseURL: "https://student-mentor-phase2.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // We check 'auth' first as per your LocalStorage screenshot
    const authData = localStorage.getItem("auth");

    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        const token = parsedAuth.token; // This matches your "token": "ey..." structure
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          // Debugging: Uncomment the line below to see the token in console
          // console.log("Request Header Set:", config.headers.Authorization);
        }
      } catch (e) {
        console.error("Auth Parsing Error:", e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;