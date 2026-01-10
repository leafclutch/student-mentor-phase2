import { useState } from 'react';
import { User, Mail, Phone, BookOpen,  Info } from 'lucide-react';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: 'STU-2023-XXXX-GEN',
    contactNumber: '',
    assignCourse: 'Full Stack Web Development',
    githubUrl: '',
    linkedinUrl: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      studentId: 'STU-2023-XXXX-GEN',
      contactNumber: '',
      assignCourse: 'Full Stack Web Development',
      githubUrl: '',
      linkedinUrl: ''
    });
  };

  return (
    <div className="w-full bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="text-blue-600" size={18} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
          </div>
          <p className="text-sm text-gray-500">
            Enter the student's personal details. A unique ID will be generated automatically.
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student ID <span className="text-blue-600 text-xs">(Auto-Generated)</span>
            </label>
            <div className="relative">
              <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-500">
                {formData.studentId}
              </div>
            </div>
            <div className="flex items-start gap-2 mt-2">
              <Info className="text-gray-400 flex-shrink-0 mt-0.5" size={14} />
              <p className="text-xs text-gray-500">
                The system will assign a permanent unique identifier upon submission.
              </p>
            </div>
          </div>

          {/* Contact Number & Assign Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Course
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={formData.assignCourse}
                  onChange={(e) => setFormData({ ...formData, assignCourse: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option>Full Stack Web Development</option>
                  <option>Data Science & Machine Learning</option>
                  <option>UI/UX Design</option>
                  <option>Mobile App Development</option>
                  <option>Cloud Computing</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;