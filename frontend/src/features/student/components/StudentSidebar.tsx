import type { Student } from "../types";
import StudentProfileCard from "./StudentProfileCard";
import {
  FiUser,
  FiMail,
  FiMessageCircle,
  FiHome,
  FiBarChart2,
  FiAlertTriangle,
  FiBell
} from "react-icons/fi";


type Props = {
  student: Student;
};

const StudentSidebar = ({ student }: Props) => {
  return (
    <aside className="w-72 bg-white border-r p-4 flex flex-col justify-between">
  <div className="space-y-6">

    

    {/* Student Profile (TOP LEFT, BELOW PORTAL) */}
    <StudentProfileCard  student={student} />

{/* mentor details */}
<div className="pb-4 border-b">
  <p className="text-xs uppercase tracking-wide text-gray-500 mb-3 font-medium">
    Mentor
  </p>

  {/* Mentor Name */}
  <div className="flex items-center gap-2 text-sm text-gray-700">
    <FiUser className="text-gray-500" />
    <span>{student.mentor.name}</span>
  </div>

  {/* Mentor Role */}
  <p className="text-sm text-gray-500 ml-6">
    Senior Dev
  </p>

  {/* Email */}
  <div className="flex items-center gap-2 text-sm text-gray-900 mt-2 ml-1">
    <FiMail />
    <a
      href={`mailto:${student.mentor.email}`}
      className="hover:text-gray-900"
    >
      {student.mentor.email}
    </a>
  </div>

  {/* Discord */}
  <div className="flex items-center gap-2 text-sm text-gray-900 mt-1 ml-1">
    <FiMessageCircle />
    <a
      href={student.mentor.discordLink}
      target="_blank"
      className="hover:text-indigo-900"
    >
      Contact on Discord
    </a>
  </div>
</div>


    {/* Progress */}
    <div className="pb-4 border-b">
      <p className="text-sm font-medium text-gray-500">Course Progress</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-indigo-600 h-2 rounded-full"
          style={{ width: `${student.progress}%` }}
        />
      </div>
      <p className="text-xs mt-1">{student.progress}%</p>
    </div>

    {/* Navigation */}
   <nav className="space-y-3">
  <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">
    Dashboard
  </p>

  <div className="flex items-center gap-3 text-sm text-gray-900 cursor-pointer hover:bg-gray-200">
    <FiHome />
    <span>Overview</span>
  </div>

  <div className="flex items-center gap-3 text-sm text-gray-900 cursor-pointer hover:bg-gray-200">
    <FiBarChart2 />
    <span>Progress Indicator</span>
  </div>

  <div className="flex items-center gap-3 text-sm text-gray-900 cursor-pointer hover:bg-gray-200">
    <FiAlertTriangle />
    <span>Warnings</span>
  </div>

  <div className="flex items-center gap-3 text-sm text-gray-900 cursor-pointer hover:bg-gray-200">
    <FiBell />
    <span>Notifications</span>
  </div>
</nav>

  </div>

  {/* Logout */}
  <button className="border rounded-md py-2 text-sm cursor-pointer hover:bg-blue-700">
    Logout
  </button>
</aside>

  );
};

export default StudentSidebar;
