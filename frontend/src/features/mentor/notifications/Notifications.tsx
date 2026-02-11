import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useMentor } from '../../../context/MentorContext';
import { sendNotification } from '../../../api/notificationApi';
import { NotificationType } from '../types';
import NotificationForm from './components/NotificationForm';
import toast from 'react-hot-toast';

const Notifications: React.FC = () => {
  const { students, notifications, fetchNotifications, markAsRead, markAllAsRead } = useMentor();
  const [recipients, setRecipients] = useState<'all' | 'specific'>('all');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  // const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!notifications) {
      fetchNotifications();
    }
  }, [fetchNotifications, notifications]);

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (students) {
      if (selectedStudents.length === students.length) {
        setSelectedStudents([]);
      } else {
        setSelectedStudents(students.map(s => s.student_id));
      }
    }
  };

  const handleSend = async () => {
    setIsSubmitting(true)
    try {
      let targetStudentIds: string[] = [];
      if (recipients === 'all') {
        if (students) {
          targetStudentIds = students.map(s => s.student_id);
        }
      } else {
        targetStudentIds = selectedStudents;
      }

      await Promise.all(targetStudentIds.map(student_id => {
        const payload = {
          title,
          message: `**${title}**\n\n${message}`,
          type: NotificationType.SYSTEM_ANNOUNCEMENT,
          user_id: student_id, // for Omit type
          userId: student_id // for backend
        };
        return sendNotification(payload as any);
      }));

      toast.success('Notification sent successfully!');
      setTitle('');
      setMessage('');
      setRecipients('all');
      setSelectedStudents([]);
      await fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error('Failed to send notification.');
    } finally {
      setIsSubmitting(false)
    }
  };

  const filteredStudents = (students || []).filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!notifications) {
    return <div className='flex items-center justify-center h-screen'><Loader2 className='animate-spin' /></div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Send Notification</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Compose and broadcast updates to your students.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <NotificationForm
          students={filteredStudents}
          recipients={recipients}
          setRecipients={setRecipients}
          selectedStudents={selectedStudents}
          handleStudentToggle={handleStudentToggle}
          handleSelectAll={handleSelectAll}
          title={title}
          setTitle={setTitle}
          message={message}
          setMessage={setMessage}
          isSubmitting={isSubmitting}
          handleSend={handleSend}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              My Notifications
            </h2>
            <button
              onClick={() => markAllAsRead()}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Mark all as read
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 space-y-6">
            {!notifications || notifications.length === 0 ? (
              <div className="text-center text-gray-500">
                No notifications found.
              </div>
            ) : (notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${!notification.isRead
                  ? "bg-blue-50 border-blue-200 shadow-sm"
                  : "bg-white border-gray-100 opacity-75 hover:opacity-100"
                  }`}
              >
                <p className={`text-sm ${!notification.isRead ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                  {notification.message}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">
                    {new Date(notification.createdAt).toLocaleDateString()} • {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
              </div>
            ))
            )}          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
