// File: src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import StudentDashboard from "../features/student/pages/StudentDashboard";
import MentorDashboard from "../features/mentor/MentorDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Dashboards (TEMPORARILY PUBLIC) */}
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/mentor" element={<MentorDashboard />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
