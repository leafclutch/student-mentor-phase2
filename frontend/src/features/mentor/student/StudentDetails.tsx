import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, User, Mail, Link as LinkIcon } from "lucide-react";
import { getStudentProfile } from "../../../api/mentorApi";
import type { Student } from "../types";

const StudentDetails = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) return;
      setLoading(true);
      try {
        const data = await getStudentProfile(studentId);
        setStudent(data);
      } catch (err) {
        console.error("Failed to fetch student details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load student details.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50/30 min-h-screen font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 overflow-hidden">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            ) : (
              student.name.substring(0, 2).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-sm text-gray-500">{student.student_id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <User className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Progress</p>
              <p className="font-semibold">{student.progress}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <ShieldAlert className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Warnings</p>
              <p className="font-semibold">{student.warning_count}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl col-span-1 md:col-span-2">
            <Mail className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Social Links</p>
              {student.social_links ? (
                <a
                  href={student.social_links as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  View Profile
                </a>
              ) : (
                <p className="font-semibold text-gray-400">Not available</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Assigned Tasks
          </h2>
          {/* TODO: Display assigned tasks */}
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Warnings
          </h2>
          {/* TODO: Display warnings */}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
