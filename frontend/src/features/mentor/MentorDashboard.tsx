import { useState, useEffect } from "react";
import {
  Users,
  FileText,
  CheckCircle,
  Pencil,
  Trash2,
  Github,
  Search,
  LayoutDashboard,
  GraduationCap,
  MessageSquare,
  Bell,
  AlertTriangle,
  Settings,
  LogOut,
  Menu,
  
  X,
} from "lucide-react";
import MyCourses from "./courses/MyCourses";
import Messages from "./messages/Messages";
import Warnings from "./warnings/Warnings";
import Notifications from "./notifications/Notifications";
import AddStudent from "../mentor/student/AddStudent";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getMentorDashboard } from "../../api/mentorApi";


type Mentor = {
  name: string;
  role: string;
  id: string;
};

type Student = {
  id: string;
  name: string;
  avatar: string;
  progress: number;
  color: string;
  online: boolean;
};

type SidebarProps = {
  mentor: Mentor;
  currentPage: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({
  mentor,
  currentPage,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "dashboard" },
    { icon: GraduationCap, label: "My Courses", path: "courses" },
    { icon: MessageSquare, label: "Messages", path: "messages", badge: 3 },
    { icon: Bell, label: "Notifications", path: "notifications" },
    { icon: AlertTriangle, label: "Warnings", path: "warnings" },
  ];

  const isActive = (path: string) => currentPage === path;

  const handleNavigation = (path: string) => {
    onNavigate(path);
    onClose();
  };
  const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();               // clears auth + localStorage
  navigate("/login", {    // redirect to login
    replace: true,
  });
};


  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
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

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
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

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          onClick={handleLogout}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};



const MentorDashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const mentor: Mentor = {
    name: "Alex Morgan",
    role: "SENIOR MENTOR",
    id: "MNT-8821",
  };

  const stats = [
    { icon: Users, label: "TOTAL STUDENTS", value: 24, bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    { icon: FileText, label: "PENDING REVIEWS", value: 5, bgColor: "bg-yellow-50", iconColor: "text-yellow-600" },
    { icon: CheckCircle, label: "COMPLETED", value: 12, bgColor: "bg-green-50", iconColor: "text-green-600" },
  ];

  const students: Student[] = [
    { id: "STD-001", name: "Sarah Jenkins", avatar: "👩", progress: 45, color: "bg-blue-500", online: true },
    { id: "STD-002", name: "Michael Chang", avatar: "👨", progress: 80, color: "bg-green-500", online: false },
    { id: "STD-003", name: "Jessica Wong", avatar: "👩", progress: 20, color: "bg-orange-500", online: false },
    { id: "STD-004", name: "David Miller", avatar: "👨", progress: 5, color: "bg-gray-400", online: false },
    { id: "STD-005", name: "Amanda Lee", avatar: "👩", progress: 70, color: "bg-purple-500", online: true },
    { id: "STD-006", name: "James Wilson", avatar: "👨", progress: 55, color: "bg-indigo-500", online: true },
    { id: "STD-007", name: "Olivia Brown", avatar: "👩", progress: 15, color: "bg-pink-500", online: false },
    { id: "STD-008", name: "Ethan Davis", avatar: "👨", progress: 90, color: "bg-teal-500", online: false },
  ];

  const tasks = [
    { id: 1, title: "HTML Basics", description: "Introduction to semantic HTML tags and structure.", status: "completed", statusColor: "text-green-600", statusBg: "bg-green-50" },
    { id: 2, title: "CSS Flexbox", description: "Building a responsive layout grid using Flexbox properties.", status: "under_review", statusColor: "text-blue-600", statusBg: "bg-blue-50", githubLink: true, buttons: ["Mark Complete", "Request Changes"] },
    { id: 3, title: "JavaScript Intro", description: "", status: "locked", statusColor: "text-gray-400", statusBg: "bg-gray-50", locked: true },
    { id: 4, title: "DOM Manipulation", description: "", status: "locked", statusColor: "text-gray-400", statusBg: "bg-gray-50", locked: true },
    { id: 5, title: "React Basics", description: "Introduction to components, state, and props.", status: "locked", statusColor: "text-gray-400", statusBg: "bg-gray-50", locked: true },
    { id: 6, title: "Advanced JS", description: "ES6+, async/await, promises, and modules.", status: "locked", statusColor: "text-gray-400", statusBg: "bg-gray-50", locked: true },
  ];

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStudentData = selectedStudent || students[0];
  const handleStudentClick = (student: Student) => setSelectedStudent(student);

  

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div className="p-4 lg:p-6 flex flex-col gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-4 lg:p-6 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <stat.icon className={stat.iconColor} size={20} />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-gray-500 font-medium">{stat.label}</p>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Students & Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Students List */}
              <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Students</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search student..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => handleStudentClick(student)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedStudentData.id === student.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                            {student.avatar}
                          </div>
                          {student.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{student.name}</h3>
                          <p className="text-sm text-gray-500">ID: {student.id}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{student.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${student.color}`} style={{ width: `${student.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Details & Tasks */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                {/* Student Info */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl lg:text-2xl">
                      {selectedStudentData.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedStudentData.name}</h3>
                      <p className="text-sm text-gray-500">Joined: Aug 15, 2023</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Pencil size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Contact & Social */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Contact Number</p>
                    <p className="text-gray-900 text-sm">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Social Media</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100">LinkedIn</button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">Github</button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Course Progress</h4>
                    <span className="text-sm text-blue-600 font-medium">Level 2</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="h-2 rounded-full bg-blue-600" style={{ width: `${selectedStudentData.progress}%` }}></div>
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 text-sm">TASK TIMELINE</h4>
                  <div className="space-y-4">
                    {tasks.map((task, index) => (
                      <div key={task.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                            task.status === "completed" ? "bg-green-500" :
                            task.status === "under_review" ? "bg-blue-500" :
                            "bg-gray-300"
                          }`}></div>
                          {index < tasks.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>}
                        </div>
                        <div className="flex-1 pb-4 min-w-0">
                          <div className="flex items-start justify-between mb-1 gap-2">
                            <h5 className={`font-medium text-sm truncate ${task.locked ? "text-gray-400" : "text-gray-900"}`}>
                              {task.title}
                            </h5>
                            <span className={`text-xs px-2 py-0.5 rounded ${task.statusBg} ${task.statusColor}`}>
                              {task.status === "completed" ? "Completed" :
                               task.status === "under_review" ? "Under Review" :
                               task.status === "locked" ? "Locked" : ""}
                            </span>
                          </div>
                          {task.description && <p className="text-gray-500 text-xs mb-2 truncate">{task.description}</p>}
                          {task.githubLink && (
                            <div className="flex items-center gap-2 text-blue-600 text-xs font-medium">
                              <Github size={14} /> View GitHub Submission
                            </div>
                          )}
                          {task.buttons && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                              {task.buttons.map((btn, idx) => (
                                <button key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100 transition-colors">
                                  {btn}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assign Task */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Assign New Task</h4>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Task Title"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Task Description"
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                      Assign Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "courses":
        return <MyCourses />;
      case "notifications":
        return <Notifications />;
      case "warnings":
        return <Warnings />;
      case "messages":
        return <Messages />;
        case "add-student":
        return <AddStudent/>;
      default:
        return <div className="p-6 text-gray-500">Page not found</div>;
    }
  };


useEffect(() => {
  const loadDashboard = async () => {
    try {
      const data = await getMentorDashboard();
      console.log("Mentor dashboard data:", data);
    } catch (err) {
      console.error("Mentor API error", err);
    }
  };

  loadDashboard();
}, []);


  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        mentor={mentor}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col my-5">
        <header className=" flex items-center px-4 py-3 bg-white border-b border-gray-200 ">
          <button
           onClick={()=>setIsSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu size={24}/>
          </button>
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
                <h1 className="text-lg font-semibold text-gray-900">Mentor Dashboard</h1>
            </div>
            <div className="flex-1 flex justify-end">
            <button 
             onClick={()=> setCurrentPage("add-student")}
            className="px-4 py-2 mx-4 bg-blue-600 text-white rounded-lg text-sm hover; bg-blue-700 transition-colors ">
                Add Student
            </button>
            </div>
          
        </header>

        <main className="flex-1 overflow-y-auto">{renderPageContent()}</main>
      </div>
    </div>
  );
};







export default MentorDashboard;
