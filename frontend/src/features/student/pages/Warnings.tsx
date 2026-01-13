import React from "react";
import { AlertCircle, Calendar, User, CheckCircle, Info } from "lucide-react";
import { useStudent } from "../../../context/StudentContext";
import moment from "moment";
import type { Warning } from "../../auth/types/warning";

interface WarningsResponse {
  warnings: Warning[];
}

const StudentWarnings: React.FC = () => {
  const { warning } = useStudent();

  const getWarningList = (): Warning[] => {
    if (!warning) return [];

    // Check if it's already an array of Warning objects
    if (Array.isArray(warning)) {
      // Handle the case where the array might contain WarningsResponse objects
      if (warning.length > 0 && "warnings" in (warning[0] as object)) {
        return (warning as unknown as WarningsResponse[]).flatMap(
          (r) => r.warnings || []
        );
      }
      return warning as unknown as Warning[];
    }

    // Handle the case where 'warning' is a single WarningsResponse object
    const response = warning as unknown as WarningsResponse;
    return response.warnings ?? [];
  };

  const warningList = getWarningList();
  const activeWarnings = warningList.filter(
    (w: Warning) => w.status === "ACTIVE"
  );
  const resolvedWarnings = warningList.filter(
    (w: Warning) => w.status === "RESOLVED"
  );

  return (
    <div className="bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Student Warnings
            </h1>
            <p className="text-gray-600 mt-1">
              Review active and past warnings issued by your mentor.
            </p>
          </div>

          {activeWarnings.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
              <span className="w-2 h-2 bg-red-600 rounded-full" />
              <span className="text-sm font-medium text-red-600">
                {activeWarnings.length} Active{" "}
                {activeWarnings.length === 1 ? "Warning" : "Warnings"}
              </span>
            </div>
          )}
        </div>

        {/* Active Warnings Section */}
        {activeWarnings.length > 0 ? (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h2 className="text-sm font-semibold text-gray-600 uppercase">
                Active Warnings
              </h2>
            </div>

            {activeWarnings.map((w: Warning) => (
              <div
                key={w.id}
                className="bg-white border-l-4 border-red-500 rounded-xl p-6 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {w.title}
                        </h3>
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          {w.level} Priority
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{w.remark}</p>

                      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Issued: {moment(w.createdAt).format("YYYY-MM-DD")}
                        </span>
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          By: {w.mentor?.name ?? "System"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-5 py-2 sm:px-3 sm:py-1 sm:text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm">
                      Acknowledge
                    </button>
                    <button className="px-5 py-2 sm:px-3 sm:py-1 sm:text-xs border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed text-gray-500">
            No active warnings. Good job!
          </div>
        )}

        {/* Resolved Warnings Table */}
        <section>
          <h2 className="text-sm font-semibold text-gray-600 uppercase mb-4">
            Resolved Warnings
          </h2>

          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">
                    Issue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {resolvedWarnings.length > 0 ? (
                  resolvedWarnings.map((w: Warning) => (
                    <tr key={w.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {w.title}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                          {w.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {moment(w.createdAt).format("YYYY-MM-DD")}
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Resolved
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No resolved warnings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Info Box */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 flex gap-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Info className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900 mb-1">
              About Warnings
            </h3>
            <p className="text-indigo-800 text-sm">
              Warnings help you stay on track. Resolving them early avoids
              impact on course completion and grading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentWarnings;
