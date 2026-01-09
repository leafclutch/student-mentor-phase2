import { LogOut, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentSection: string;
  setCurrentSection: (s: any) => void;
};

const StudentSidebar = ({
  isOpen,
  onClose,
  currentSection,
  setCurrentSection,
}: Props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r flex flex-col transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2"
        >
          <X />
        </button>

        {/* MENU */}
        <div className="p-6 space-y-2">
          {["overview", "progress", "warnings", "notifications"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setCurrentSection(item as any);
                onClose();
              }}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentSection === item
                  ? "bg-indigo-50 text-indigo-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* LOGOUT */}
        <div className="mt-auto p-6 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;
