import StudentSidebar from "../features/student/components/StudentSidebar";
import type { Student } from "../features/student/types";

type Props = {
  student: Student;
  children: React.ReactNode;
};

const StudentLayout = ({ student, children }: Props) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <StudentSidebar student={student} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
