import type { Student } from "../types";
type Props ={
    student: Student;
};
const CourseInfoCard = ({student}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">
        Course Information
      </h2>

      <div className="space-y-2 text-sm">
        <p><strong>Course:</strong> {student.courseName}</p>
        <p><strong>Mentor:</strong> {student.mentor.name}</p>
      </div>

      <div className="mt-4 space-y-2">
        <a
          href="#"
          className="block text-blue-600 underline text-sm"
        >
          Course Material
        </a>
        <a
          href="#"
          className="block text-green-600 underline text-sm"
        >
          Join Live Class
        </a>
      </div>
    </div>
  );
};

export default CourseInfoCard;
