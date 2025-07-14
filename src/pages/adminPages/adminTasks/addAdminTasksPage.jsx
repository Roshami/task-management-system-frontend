import { useEffect, useState } from 'react';
import TaskFormInputField from '../../../components/myTasks/tasksForm/tasksFormInputFiled';
import TaskFormTextarea from '../../../components/myTasks/tasksForm/tasksFormTextarea';
import TaskFormDropdown from '../../../components/myTasks/tasksForm/tasksFromDropdown';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FiRefreshCw, FiLoader } from 'react-icons/fi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../../features/tasks/taskSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchUsers } from '../../../features/users/userSlice';

const AddAdminTasksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const token = localStorage.getItem('token');
  const admin = jwtDecode(token);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    assigned_to: '',
    companyName: admin.companyName,
    title: '',
    description: '',
    priority: 'High',
    status: 'Pending',
    start_date: '',
    end_date: '',
    subtasks: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubtaskChange = (index, e) => {
    const newSubtasks = [...formData.subtasks];
    newSubtasks[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      subtasks: newSubtasks,
    });
  };

  const addSubtask = () => {
    setFormData({
      ...formData,
      subtasks: [
        ...formData.subtasks,
        {
          subtasks_title: '',
          subtasks_description: '',
        },
      ],
    });
  };

  const removeSubtask = (index) => {
    const newSubtasks = [...formData.subtasks];
    newSubtasks.splice(index, 1);
    setFormData({
      ...formData,
      subtasks: newSubtasks,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await dispatch(createTask(formData)).unwrap();
      toast.success('Task created successfully');
      navigate('/admin/tasks');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = () => {
    setFormData({
      assigned_to: '',
      title: '',
      description: '',
      priority: 'High',
      status: 'Pending',
      start_date: '',
      end_date: '',
      subtasks: [],
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/tasks')}
        className="flex items-center gap-2 text-violet-600 hover:text-violet-800 transition-colors mb-6 cursor-pointer"
      >
        <IoMdArrowRoundBack className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Tasks</span>
      </button>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create New Task
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Add a new task for {admin.companyName}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 text-violet-600 hover:text-violet-800 text-sm font-medium transition-colors cursor-pointer"
            >
              <FiRefreshCw className="w-4 h-4" />
              Reset Form
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Main Task Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assigned To */}
              <div className="col-span-2 md:col-span-1">
                <TaskFormDropdown
                  label="Assign To"
                  id="assigned_to"
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleChange}
                  options={
                    users
                      ? [
                          { value: '', label: 'Select name' }, // <-- Add this line
                          ...[...users]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((user) => ({
                              value: user.email,
                              label: user.name,
                            })),
                        ]
                      : []
                  }
                  required
                />
              </div>

              {/* Task Title */}
              <div className="col-span-2">
                <TaskFormInputField
                  label="Task Title"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  required
                />
              </div>

              {/* Task Description */}
              <div className="col-span-2">
                <TaskFormTextarea
                  label="Task Description"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the task details"
                  rows={4}
                />
              </div>

              {/* Priority */}
              <div className="col-span-2 md:col-span-1">
                <TaskFormDropdown
                  label="Priority"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  options={[
                    { value: 'High', label: 'High Priority' },
                    { value: 'Medium', label: 'Medium Priority' },
                    { value: 'Low', label: 'Low Priority' },
                  ]}
                />
              </div>

              {/* Dates */}
              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <TaskFormInputField
                    type="date"
                    label="Start Date"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <TaskFormInputField
                    type="date"
                    label="End Date"
                    id="end_date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Subtasks Section */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowSubtasks(!showSubtasks)}
              className="flex items-center gap-2 text-violet-600 hover:text-violet-800 font-medium transition-colors cursor-pointer"
            >
              {showSubtasks ? (
                <FaMinus className="w-4 h-4" />
              ) : (
                <FaPlus className="w-4 h-4" />
              )}
              {showSubtasks ? 'Hide Subtasks' : 'Add Subtasks'}
            </button>

            {showSubtasks && (
              <div className="mt-4 space-y-4 pl-4 border-l-2 border-violet-200">
                {formData.subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeSubtask(index)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      <FaMinus className="w-4 h-4" />
                    </button>

                    <h4 className="font-medium text-gray-800 mb-4">
                      Subtask {index + 1}
                    </h4>

                    <div className="space-y-4">
                      <TaskFormInputField
                        label="Subtask Title"
                        name="subtasks_title"
                        value={subtask.subtasks_title}
                        onChange={(e) => handleSubtaskChange(index, e)}
                        placeholder="Enter subtask title"
                      />

                      <TaskFormTextarea
                        label="Subtask Description"
                        name="subtasks_description"
                        value={subtask.subtasks_description}
                        onChange={(e) => handleSubtaskChange(index, e)}
                        placeholder="Describe the subtask details"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSubtask}
                  className="flex items-center gap-2 text-violet-600 hover:text-violet-800 text-sm font-medium transition-colors mt-2 cursor-pointer"
                >
                  <FaPlus className="w-3 h-3" />
                  Add Another Subtask
                </button>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-8 mt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/tasks')}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminTasksPage;
