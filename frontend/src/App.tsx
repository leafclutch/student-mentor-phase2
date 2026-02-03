// src/App.tsx
import { AuthProvider } from "./context/AuthContext";
import { StudentProvider } from "./context/StudentContext";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <Toaster />
        <AppRoutes />
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;
