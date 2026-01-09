import { useState } from 'react';
import { Clock, Link2, Paperclip } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  avatar: string;
}

const Notifications: React.FC = () => {
  const [recipients, setRecipients] = useState<'all' | 'specific'>('all');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [highPriority, setHighPriority] = useState<boolean>(false);

  const students: Student[] = [
    { id: 'STD-001', name: 'Sarah Jenkins', avatar: '👩' },
    { id: 'STD-002', name: 'Michael Chang', avatar: '👨' },
    { id: 'STD-003', name: 'Jessica Wong', avatar: '👩' },
    { id: 'STD-004', name: 'David Miller', avatar: '👨' }
  ];

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedStudents(students.map(s => s.id));
  };

  const handleSend = () => {
    console.log({
      recipients: recipients === 'all' ? 'All Students' : selectedStudents,
      title,
      message,
      highPriority
    });
    setTitle('');
    setMessage('');
    setHighPriority(false);
    setRecipients('all');
    setSelectedStudents([]);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...');
  };

  const characterCount = message.length;
  const maxCharacters = 500;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Send Notification</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Compose and broadcast updates to your students.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto">
              <Clock size={18} />
              <span>History</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
          {/* Select Recipients */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Select Recipients</h2>
            </div>

            <div className="space-y-4">
              {/* All Students Option */}
              <label className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                <input
                  type="radio"
                  name="recipients"
                  value="all"
                  checked={recipients === 'all'}
                  onChange={(e) => setRecipients(e.target.value as 'all' | 'specific')}
                  className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm sm:text-base">All Students</div>
                  <div className="text-xs sm:text-sm text-gray-500">Send to all 24 students assigned to you</div>
                </div>
              </label>

              {/* Specific Students Option */}
              <label className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                <input
                  type="radio"
                  name="recipients"
                  value="specific"
                  checked={recipients === 'specific'}
                  onChange={(e) => setRecipients(e.target.value as 'all' | 'specific')}
                  className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm sm:text-base">Specific Student(s)</div>
                  <div className="text-xs sm:text-sm text-gray-500">Select individual students from the list</div>
                </div>
              </label>

              {/* Student Selection List */}
              {recipients === 'specific' && (
                <div className="ml-0 sm:ml-9 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">SELECT STUDENTS</h3>
                    <button
                      onClick={handleSelectAll}
                      className="text-xs sm:text-sm text-blue-600 hover:underline"
                    >
                      Select All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {students.map((student) => (
                      <label
                        key={student.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentToggle(student.id)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {student.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{student.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500">ID: {student.id}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Compose Message */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Compose Message</h2>
            </div>

            <div className="space-y-4">
              {/* Title Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Notification Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Upcoming Code Review Session"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Message / Description
                </label>
                <textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded text-gray-600">
                      <Paperclip size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded text-gray-600">
                      <Link2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    <span className="text-xs text-gray-500">Markdown is supported.</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {characterCount} / {maxCharacters} characters
                  </span>
                </div>
              </div>

              {/* High Priority Option */}
              <label className="flex items-center gap-3 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={highPriority}
                  onChange={(e) => setHighPriority(e.target.checked)}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded flex-shrink-0"
                />
                <div>
                  <div className="font-medium text-gray-900 text-sm sm:text-base">Mark as High Priority</div>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                setTitle('');
                setMessage('');
                setHighPriority(false);
                setRecipients('all');
                setSelectedStudents([]);
              }}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base order-2 sm:order-1"
            >
              Cancel
            </button>
            <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
              >
                Save Draft
              </button>
              <button
                onClick={handleSend}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Notification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
