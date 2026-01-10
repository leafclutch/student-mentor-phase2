import { useState, useEffect } from "react";
import {
  Users,
  FileText,
  CheckCircle,
  Pencil,
  Trash2,
  
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
import { getMentorDashboard , getMentorStudents,
  createTask, getAllTasks,
  
  updateTask

} from "../../api/mentorApi";


type Mentor = {
  name: string;
  role: string;
  id: string;
  contact?: string;
};

type Student = {
  id: string;
  name: string;
  avatar: string;
  progress: number;
  color: string;
  online: boolean;
  warning_status?: string | null;
  github_link?: string;
  linkedin_link?: string;
};

interface Task {
  task_id: string;
  title: string;
  description: string;
  status: string;
  github_link?: string | null;
}
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
  
  // --- API DATA STATES ---
  const [mentorData, setMentorData] = useState<Mentor>({
    name: "Loading...",
    role: "SENIOR MENTOR",
    id: "MNT-0000",
  });

  const [statsData, setStatsData] = useState([
    { icon: Users, label: "TOTAL STUDENTS", value: 0, bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    { icon: FileText, label: "PENDING REVIEWS", value: 0, bgColor: "bg-yellow-50", iconColor: "text-yellow-600" },
    { icon: CheckCircle, label: "COMPLETED", value: 0, bgColor: "bg-green-50", iconColor: "text-green-600" },
  ]);

  const [studentsList, setStudentsList] = useState<Student[]>([]);
  const [studentTasks, setStudentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch Dashboard Stats (API 3.1)
        const dashData = await getMentorDashboard();
        
        setMentorData({
          name: dashData.mentor.name,
          role: "SENIOR MENTOR",
          id: dashData.mentor.userId || dashData.mentor.id || "MNT-LIVE",
          contact: dashData.mentor.contact
        });

        setStatsData([
          { icon: Users, label: "TOTAL STUDENTS", value: dashData.stats.totalStudents, bgColor: "bg-blue-50", iconColor: "text-blue-600" },
          { icon: FileText, label: "PENDING REVIEWS", value: dashData.stats.pendingReviews || 0, bgColor: "bg-yellow-50", iconColor: "text-yellow-600" }, 
          { icon: CheckCircle, label: "COMPLETED", value: dashData.stats.completedTasks || 0, bgColor: "bg-green-50", iconColor: "text-green-600" },
        ]);

        // Fetch Assigned Students (API 3.2)
        const studentsData = await getMentorStudents();
        const formattedStudents = studentsData.map((s: any) => ({
          // Ensure we capture student_id correctly from Postman 3.2
          id: s.student_id || s._id || s.id, 
          name: s.name,
          avatar: s.name ? s.name.charAt(0).toUpperCase() : "?",
          progress: s.progress || 0,
          color: s.progress > 70 ? "bg-green-500" : "bg-blue-500",
          online: false,
          warning_status: s.warning_status,
          // Correctly accessing nested social links from Postman response
          github_link: s.github || s.social_links?.github,
          linkedin_link: s.linkedin || s.social_links?.linkedin
        }));

        setStudentsList(formattedStudents);
        
        // Only set default if list isn't empty and no student is currently selected
        if (formattedStudents.length > 0 && !selectedStudent) {
          setSelectedStudent(formattedStudents[0]);
        }
      } catch (err) {
        console.error("Mentor Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  
 


useEffect(() => {
  const loadStudentTasks = async () => {
    if (!selectedStudent || !selectedStudent.id) {
      setStudentTasks([]);
      return;
    }

    try {
      
      const allTasks = await getAllTasks();

      const filtered = allTasks.filter(
        (task: any) => task.student_id === selectedStudent.id
      );

      setStudentTasks(filtered);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setStudentTasks([]); // Clear if error
    }
  };

  loadStudentTasks();
}, [selectedStudent]);

const handleAssignTask = async () => {
  if (!selectedStudent || !taskTitle) {
    alert("Please select a student and enter a task title.");
    return;
  }

  try {
    // 1. Create the task
    await createTask({
      title: taskTitle,
      description: taskDescription,
      course_id: "course-101", 
      doc_link: "" 
    });
    
    // 2. Reset input fields
    setTaskTitle("");
    setTaskDescription("");

    // 3. REFRESH LOGIC: Fetch all tasks using the NEW API
    const allTasks = await getAllTasks(); // New API from your Postman screenshot

    // 4. Filter for the selected student
    const studentTasks = allTasks.filter(
      (t: any) => t.student_id === selectedStudent.id
    );
    
    setStudentTasks(studentTasks); 
    
    alert("Task assigned and timeline updated!");
  } catch (err) {
    console.error("Failed to assign task:", err);
    alert("Error assigning task. Check console.");
  }
};

// 2. For updating EXISTING tasks (Handles Error 2554)
const handleUpdateStatus = async (taskId: string, newStatus: string) => {
  if (!selectedStudent) return;

  try {
    // Wrap the last 3 values into a single object to match your API definition
    await updateTask(taskId, {
      studentId: selectedStudent.id,
      status: newStatus,
      remark: "Task reviewed by mentor."
    }); 

    alert("Task status updated successfully!");
  } catch (err) {
    console.error("Update failed", err);
    alert("Failed to update task.");
  }
};
  const filteredStudents = studentsList.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPageContent = () => {
    if (loading) return <div className="p-10 text-center font-semibold text-gray-500 italic animate-pulse">Syncing with server...</div>;

    switch (currentPage) {
      case "dashboard":
        return (
  <div className="p-4 lg:p-6 flex flex-col gap-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-4 lg:p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={stat.iconColor} size={20} />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-gray-500 font-medium uppercase">{stat.label}</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Students & Tasks */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Students List Section */}
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
              onClick={() => setSelectedStudent(student)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedStudent?.id === student.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                    {student.avatar}
                  </div>
                  {student.warning_status && (
                    <div className="absolute -top-1 -right-1">
                      <AlertTriangle size={14} className="text-red-500 fill-red-100" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{student.name}</h3>
                  <p className="text-xs text-gray-500">ID: {student.id}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{student.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${student.color}`} style={{ width: `${student.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel: Task Timeline & Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
        {selectedStudent && (
          <>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-xl font-bold text-indigo-700">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedStudent.name}</h3>
                  {selectedStudent.warning_status && (
                    <span className="text-[10px] text-red-600 font-bold uppercase">{selectedStudent.warning_status}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-gray-100 rounded-lg"><Pencil size={14} className="text-gray-500" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-lg"><Trash2 size={14} className="text-red-400" /></button>
              </div>
            </div>

            {/* Task Timeline */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-[11px] uppercase tracking-wider">Task Timeline</h4>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {studentTasks.length > 0 ? studentTasks.map((task, index) => (
                  <div key={task.task_id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1 ${task.status === "COMPLETED" ? "bg-green-500" : "bg-blue-500"}`}></div>
                      {index < studentTasks.length - 1 && <div className="w-0.5 flex-1 bg-gray-100 my-1"></div>}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex justify-between items-start">
                        <h5 className="font-medium text-xs text-gray-800">{task.title}</h5>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${task.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                          {task.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{task.description}</p>
                      
                      {/* Action buttons for existing tasks */}
                      {task.status !== "COMPLETED" && (
                        <div className="flex gap-2 mt-2">
                          <button 
                            onClick={() => handleUpdateStatus(task.task_id, "COMPLETED")}
                            className="text-[9px] font-bold text-green-600 hover:underline"
                          >
                            Mark Complete
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(task.task_id, "REVISION")}
                            className="text-[9px] font-bold text-orange-600 hover:underline"
                          >
                            Request Revision
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )) : (
                  <p className="text-xs text-gray-400 italic">No tasks found for this student.</p>
                )}
              </div>
            </div>

            {/* Quick Assign (Create New Task) */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-3 text-xs uppercase">Quick Assign</h4>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <textarea
                  placeholder="Instructions..."
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none h-16 resize-none"
                ></textarea>
                <button 
                  onClick={handleAssignTask}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md active:scale-[0.98]"
                >
                  Assign Task
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

      case "notifications": return <Notifications />;
      case "warnings": return <Warnings students={studentsList.filter(s => s.warning_status)} />;
      case "messages": return <Messages />;
      case "add-student": return <AddStudent />;
      case "courses": return <MyCourses />;
      default: return <div className="p-6 text-gray-500">Section Under Development</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        mentor={mentorData}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col my-5">
        <header className="flex items-center px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu size={24} />
          </button>
          <div className="flex-1"></div>
          <div className="flex-1 text-center font-bold text-gray-800">
            {currentPage.toUpperCase()}
          </div>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setCurrentPage("add-student")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              Add Student
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
};







export default MentorDashboard;
