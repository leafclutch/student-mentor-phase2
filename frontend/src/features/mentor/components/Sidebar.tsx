import type { FC } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  MessageSquare,
  Bell,
  AlertTriangle,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ---------------- Types ----------------
export type Mentor = {
  id: string;
  name: string;
  role: string;
};

type SidebarProps = {
  mentor: Mentor;
  currentPage: "dashboard" | "courses" | "messages" | "notifications" | "warnings";
  onNavigate: (
    page: "dashboard" | "courses" | "messages" | "notifications" | "warnings"
  ) => void;
};

// ---------------- Sidebar ----------------
const Sidebar: FC<SidebarProps> = ({ mentor, currentPage, onNavigate }) => {
  type MenuItem = {
    icon: FC<{ size?: number }>;
    label: string;
    path: SidebarProps["currentPage"];
    badge?: number;
  };

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", path: "dashboard" },
    { icon: GraduationCap, label: "My Courses", path: "courses" },
    { icon: MessageSquare, label: "Messages", path: "messages", badge: 3 },
    { icon: Bell, label: "Notifications", path: "notifications" },
    { icon: AlertTriangle, label: "Warnings", path: "warnings" },
  ];

  const isActive = (path: MenuItem["path"]) => currentPage === path;
  const {logout}= useAuth();
  const navigate =useNavigate();
  const handleLogout=()=>{
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
            {mentor.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
          <p className="text-sm text-gray-500">{mentor.role}</p>
          <div className="mt-3 space-y-1 text-sm w-full">
            <div className="flex justify-between">
              <span className="text-gray-500">ID:</span>
              <span className="font-medium">{mentor.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Contact:</span>
              <a href="#" className="text-blue-600 hover:underline">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon size={20} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        onClick={handleLogout}>
          <LogOut size={20} />
          <span>SignOut</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
