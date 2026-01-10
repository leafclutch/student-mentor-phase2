import { useState } from 'react';
import { AlertCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { issueWarning } from '../../../api/mentorApi';

// Define the Student interface to fix TS errors
interface Student {
  id: string;
  name: string;
  avatar: string;
  warning_status?: string | null;
}

interface WarningsProps {
  students: Student[];
}

const Warnings = ({ students }: WarningsProps) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [severity, setSeverity] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const severityLevels = [
    {
      level: 'low',
      icon: '⚠️',
      color: 'border-yellow-200 hover:border-yellow-400',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      title: 'Low',
      description: 'Minor behavioral or attendance issue. Does not affect final grade immediately.'
    },
    {
      level: 'medium',
      icon: '⚠️',
      color: 'border-orange-200 hover:border-orange-400',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: 'Medium',
      description: 'Repeated violations or missed deadlines. Requires acknowledgement from student.'
    },
    {
      level: 'high',
      icon: '🛑',
      color: 'border-red-200 hover:border-red-400',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      title: 'High',
      description: 'Critical violation (e.g. plagiarism). Automatically escalated to administration.'
    }
  ];

  const handleIssueWarning = async () => {
    if (selectedStudent && severity && title && description) {
      try {
        setIsSubmitting(true);
        await issueWarning({
          student_id: selectedStudent,
          severity: severity,
          title: title,
          description: description
        });
        
        alert("Warning issued successfully!");
        
        // Reset Form
        setSelectedStudent('');
        setSeverity('');
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error("Failed to issue warning:", error);
        alert("Error issuing warning. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    setSelectedStudent('');
    setSeverity('');
    setTitle('');
    setDescription('');
  };

  const selectedStudentData = students.find(s => s.id === selectedStudent);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Issue Warning</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Send formal warnings to students regarding conduct or performance.
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Warning History
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 text-sm sm:text-base">
              <HelpCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
              Help & Guidelines
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 space-y-6">

          {/* Student Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Select Student <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
                className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <span className={selectedStudent ? 'text-gray-900' : 'text-gray-500'}>
                  {selectedStudentData ? `${selectedStudentData.name} (${selectedStudentData.id})` : 'Select a student...'}
                </span>
                <ChevronDown size={18} className="sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              </button>
              {isStudentDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {students.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student.id);
                        setIsStudentDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        {student.avatar}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{student.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500">ID: {student.id}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Severity Level <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {severityLevels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => setSeverity(level.level)}
                  className={`p-4 sm:p-5 border-2 rounded-lg text-left transition-all ${
                    severity === level.level
                      ? `${level.bgColor} ${level.color.replace('hover:', '')}`
                      : `${level.color} bg-white`
                  }`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 ${level.iconBg} rounded-lg flex items-center justify-center mb-3`}>
                    <span className="text-lg sm:text-2xl">{level.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{level.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{level.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Warning Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Brief summary of the warning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Provide details of the incident and expected corrective behavior..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={handleIssueWarning}
              disabled={!selectedStudent || !severity || !title || !description || isSubmitting}
              className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 ${
                selectedStudent && severity && title && description && !isSubmitting
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <AlertCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
              {isSubmitting ? 'Sending...' : 'Issue Warning'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Warnings;