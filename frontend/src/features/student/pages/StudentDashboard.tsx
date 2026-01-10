import React, { useState, useEffect } from 'react';
import { Code, Link2, Lock, ChevronRight, Bookmark, HelpCircle, FileText, ExternalLink,  Menu } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import  Warnings  from '../pages/Warnings';
import Notifications from './Notifications';
import { getStudentDashboard } from '../../../api/studentApi';

import StudentSidebar from '../components/StudentSidebar';

const CourseModulePage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<'overview' | 'progress' | 'warnings' | 'notifications'>('overview');
  const [sidebarOpen, setSidebarOpen]= useState(false);

  const tasks = [
    { id: 1, title: 'Task 1', subtitle: 'HTML Structure Basics', locked: false },
    { id: 2, title: 'Task 2', subtitle: 'CSS Styling', locked: false },
    { id: 3, title: 'Task 3', subtitle: 'Responsive Layouts', locked: false },
    { id: 4, title: 'Task 4', subtitle: 'JavaScript Intro', locked: true },
  ];

  const handleTaskClick = (taskId: number, isLocked: boolean) => {
    if (!isLocked) {
      setSelectedTask(taskId);
      console.log('Task clicked:', taskId);
    }
  };

useEffect(() => {
  const loadDashboard = async () => {
    try {
      const data = await getStudentDashboard();
      console.log("Student dashboard data:", data);
    } catch (err) {
      console.error("Student API error", err);
    }
  };

  loadDashboard();
}, []);

  

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <StudentSidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  currentSection={currentSection}
  setCurrentSection={setCurrentSection}
/>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <button
          onClick={()=> setSidebarOpen(true)}
           className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu size={24}/>
           </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Web Development Course</h1>
          </div>
          <div className="flex items-center gap-4">
            
            
          </div>
        </div>

        <div className="p-4">
          
  {/* OVERVIEW (your existing dashboard + tasks UI) */}
  {currentSection === 'overview' && (
    <>
      {/* Live Class Link */}
       
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Link2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Live Class Link</h3>
                <p className="text-sm text-gray-600">course-url.com/meet/xyz-abc</p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
              Go to URL
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
     

      {/* Task List + Task Details */}
       <div className="grid grid-cols-2 gap-8">
            {/* Task List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Task List</h2>
                <span className="text-sm text-gray-500">1/4 Completed</span>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskClick(task.id, task.locked)}
                    disabled={task.locked}
                    className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                      task.locked
                        ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                        : selectedTask === task.id
                        ? 'bg-indigo-50 border-indigo-500'
                        : 'bg-white border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {task.locked && (
                        <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <div className="text-left">
                        <h3 className={`font-bold mb-0.5 ${task.locked ? 'text-gray-400' : 'text-indigo-600'}`}>
                          {task.title}
                        </h3>
                        <p className={`text-sm ${task.locked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {task.subtitle}
                        </p>
                      </div>
                    </div>
                    {!task.locked && (
                      <ChevronRight className="w-5 h-5 text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Task Details */}
            
          
      <div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Current Task</span>
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-indigo-100 rounded transition-colors">
                        <Bookmark className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button className="p-1.5 hover:bg-indigo-100 rounded transition-colors">
                        <HelpCircle className="w-4 h-4 text-indigo-600" />
                      </button>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">HTML Structure Basics</h2>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Create a standard HTML5 boilerplate. Include a header, a main content area with two sections, and a footer. Use semantic tags correctly. Ensure your document passes the W3C validator without errors.
                  </p>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-600">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>Use <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono">&lt;header&gt;</code>, <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono">&lt;main&gt;</code>, and <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono">&lt;footer&gt;</code> tags.</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>Include at least one image.</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>Create an unordered list of navigation links.</span>
                    </li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex gap-3">
                      <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Documentation & Resources</h4>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                          Read the MDN Guide on Semantic HTML
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Upload Task 1 Github Link</h3>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="https://github.com/username/repo"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                        Submit
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">* Ensure the repository is public before submitting.</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
      
    </>
  )}

  {/* PROGRESS INDICATOR PAGE */}
  {currentSection === 'progress' && <ProgressIndicator />}

  {/* WARNINGS PAGE */}
  {currentSection === 'warnings' && <Warnings />}

  {/* NOTIFICATIONS PAGE */}
  {currentSection === 'notifications' && <Notifications />}
   </div>


         

         
        </div>
      </div>
    
  );
};

export default CourseModulePage;