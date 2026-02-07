import { useEffect } from "react";
import {
  Users,
  BookOpen,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useMentor } from "../../../context/MentorContext";

const Dashboard = () => {
  const { dashboard, students, assignments, fetchMentorDashboard, fetchAssignments } = useMentor();

  useEffect(() => {
    fetchMentorDashboard();
    fetchAssignments();
  }, [fetchMentorDashboard, fetchAssignments]);

  // Calculate statistics from available data
  const totalStudents = students?.length || 0;
  const totalCourses = dashboard?.courses?.length || 0;

  // Calculate assignment statistics
  const pendingAssignments =
    assignments?.filter((a) => a.status === "PENDING").length || 0;
  const submittedAssignments =
    assignments?.filter((a) => a.status === "SUBMITTED").length || 0;
  const approvedAssignments =
    assignments?.filter((a) => a.status === "APPROVED").length || 0;
  const totalAssignments = assignments?.length || 0;

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "My Courses",
      value: totalCourses,
      icon: BookOpen,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Approved Tasks",
      value: approvedAssignments,
      icon: CheckCircle2,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      title: "Pending Review",
      value: pendingAssignments + submittedAssignments,
      icon: Clock,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {dashboard?.name}! Here's your teaching overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.iconColor} opacity-20`}>
                  <Icon size={40} />
                </div>
              </div>
              <Icon size={24} className={`${stat.iconColor} mt-4`} />
            </div>
          );
        })}
      </div>

      {/* Assignment Statistics */}
      {totalAssignments > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assignment Status Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Assignment Status
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 font-medium">Pending Review</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {pendingAssignments}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        totalAssignments > 0
                          ? (pendingAssignments / totalAssignments) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 font-medium">Submitted</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    {submittedAssignments}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        totalAssignments > 0
                          ? (submittedAssignments / totalAssignments) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 font-medium">Approved</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {approvedAssignments}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        totalAssignments > 0
                          ? (approvedAssignments / totalAssignments) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Tasks</h2>
            {assignments && assignments.length > 0 ? (
              <div className="space-y-3">
                {assignments.slice(0, 5).map((assignment) => (
                  <div
                    key={assignment.assignment_id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {assignment.task?.title || "Untitled Task"}
                      </p>
                      <div className="flex gap-2 mt-1 text-xs text-gray-500">
                        <span>{assignment.task?.course?.title || "No course"}</span>
                        <span>•</span>
                        <span className={`font-semibold ${
                          assignment.status === "APPROVED" ? "text-emerald-600" :
                          assignment.status === "SUBMITTED" ? "text-yellow-600" :
                          "text-orange-600"
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                    <BookOpen size={20} className="text-blue-500 flex-shrink-0" />
                  </div>
                ))}
                {assignments.length > 5 && (
                  <p className="text-center text-sm text-gray-600 pt-2">
                    +{assignments.length - 5} more tasks
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen
                  size={40}
                  className="mx-auto text-gray-300 mb-3"
                />
                <p className="text-gray-500">No tasks assigned yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
