// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "../features/student/pages/Overview";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
