import React, { useState, useEffect } from "react";
import {
  Plus,
  ClipboardList,
  Search,
  Loader2,
  X,
  BookOpen,
} from "lucide-react";
import { getAllTasks } from "../../../api/taskApi";
import type { Task } from "../types";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMentor } from "../../../context/MentorContext";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState<Omit<Task, 'task_id' | 'course' | 'createdAt' | 'updatedAt'>>({
    title: "",
    description: "",
    course_id: "",
    doc_link: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLibrary = async () => {
    setLoading(true);
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error("No no, failed to fetch library. ok.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

  const { createNewTask } = useMentor();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.course_id) {
      toast.error("Fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await createNewTask(form);
      setShowModal(false);
      setForm({ title: "", description: "", course_id: "", doc_link: "" });
      await fetchLibrary();
    } catch (err) {
      console.error("Task creation failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 font-sans bg-gray-50/30 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Task Library
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
            Define master assignments
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
          >
            <Plus size={16} /> Create Task
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gray-300" />
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.task_id}
              className="bg-white border border-gray-100 p-6 rounded-[32px] hover:shadow-xl transition-all group relative"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-blue-50 text-blue-600 text-[8px] font-black px-2 py-1 rounded-md uppercase">
                  {task.course_id}
                </span>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <ClipboardList className="text-gray-400 group-hover:text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 truncate pr-12">{task.title}</h3>
              <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">{task.description}</p>
              <Link to={`/mentor/tasks/${task.task_id}`} className="text-blue-500 text-xs font-bold mt-4 inline-block">View Details</Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
          <BookOpen size={40} className="mx-auto text-gray-100 mb-4" />
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Library is empty</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/30">
              <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-[0.2em]">New Master Task</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-8 space-y-5">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Task Title*</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Auth Implementation"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Course ID*</label>
                  <input
                    type="text"
                    required
                    value={form.course_id}
                    onChange={(e) => setForm({ ...form, course_id: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., REACT-01"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Description*</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full h-32 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed requirements..."
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Doc Link</label>
                <input
                  type="text"
                  value={form.doc_link}
                  onChange={(e) => setForm({ ...form, doc_link: e.target.value })}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., https://example.com/docs"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-100"
              >
                {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : "Save to Library"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;