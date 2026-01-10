// File: src/features/auth/pages/Login.tsx
import { useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../api/authApi";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState(""); // kept for UI only
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {login: authLogin}= useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    // 1. Clean input: force Uppercase and remove spaces to satisfy backend validation
    const cleanUserId = userId.trim().toUpperCase();
    
    // 2. Call Login API
    const response = await loginApi({ userId: cleanUserId, password });

    // 3. Extract data from the nested 'user' object
    const userData = response.user; 
    const rawRole = userData?.role || response.role; // Fallback if backend structure varies
    const token = response.token;

    if (!rawRole || !token) {
      throw new Error("Invalid response: Role or Token missing from server.");
    }

    // 4. Normalize role to UPPERCASE to match ProtectedRoute allowedRoles
    const normalizedRole = rawRole.toUpperCase() as "STUDENT" | "MENTOR";

    const authData = {
      id: userData?.userId || userData?.id || response.userId,
      role: normalizedRole,
      token: token,
    };

    // 5. Store in LocalStorage exactly where axios.ts looks for it
    localStorage.setItem("auth", JSON.stringify(authData));
    
    // 6. Update global Auth Context state
    authLogin(authData);

    // 7. Navigate based on the normalized role
    // Using uppercase ensures we don't accidentally fall into the 'student' path
    if (normalizedRole === "MENTOR") {
      console.log("Role verified as MENTOR. Redirecting to Mentor Dashboard...");
      navigate("/mentor", { replace: true });
    } else if (normalizedRole === "STUDENT") {
      console.log("Role verified as STUDENT. Redirecting to Student Dashboard...");
      navigate("/student", { replace: true });
    } else {
      setError("Unrecognized user role. Contact Administrator.");
    }

  } catch (error: any) {
    console.error("Login Submission Error:", error);
    
    // Extract specific error message from server if available (e.g., "Invalid User ID format")
    const serverMessage = error.response?.data?.message || "Invalid credentials or server error.";
    setError(serverMessage);
  }
};


  return (
    <div className="min-h-screen flex bg-gray-200 flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96 space-y-4 border"
      >
        <div className="flex justify-center p-2">
          <img
            className="h-42 w-42 object-cover rounded-full"
            src="/leafclutch.png"
            alt="Logo"
          />
        </div>

        <div className="justify-center p-4">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            LeafClutch Technologies
          </h1>
          <p className="text-xl font-semibold text-center">Login Portal</p>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <div>
          <label className="text-sm text-gray-600">UserID</label>
          <div className="relative mt-1">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none"
              placeholder="26STD0001 or 26MEN001"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <div className="relative mt-1">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none"
              placeholder="Any password (ignored)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-5">
        Don’t have an ID assigned yet?{" "}
        <span className="text-blue-800 cursor-pointer">
          Contact Administrator
        </span>
      </p>
    </div>
  );
};

export default Login;
