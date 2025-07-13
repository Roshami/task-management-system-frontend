import { use, useState } from 'react';
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

const AddAdminTasksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);

const token = localStorage.getItem('token');
  const admin = jwtDecode(token);
console.log(admin.companyName);
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
      console.log(formData);
      await dispatch(createTask(formData)).unwrap();
      toast.success('Task added successfully');
      navigate('/admin/tasks');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to add task');
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

  const users = useSelector((state) => state.users.user);

  console.log(users);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Back Button */}
      <button
        type="button"
        className="flex items-center text-violet-600 hover:text-violet-800 transition-colors mb-4 cursor-pointer"
        onClick={() => navigate('/admin/tasks')}
      >
        <IoMdArrowRoundBack className="mr-2 h-5 w-5" />
        <span className="text-sm font-medium">Back to Tasks</span>
      </button>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
          <button
            type="button"
            className="flex items-center text-violet-600 hover:text-violet-800 text-sm font-medium transition-colors cursor-pointer"
            onClick={handleRefresh}
          >
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Reset Form
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Main Task Fields */}
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <TaskFormDropdown
                  label="Assigned To"
                  id="assigned_to"
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleChange}
                  options={
                    Array.isArray(users)
                      ? users.map((user) => ({
                          value: user.email,
                          label: user.name,
                        }))
                      : []
                  }
                />
              </div>
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

              <div className="col-span-2">
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

              <div className="col-span-2 sm:col-span-1">
                <TaskFormInputField
                  type="date"
                  label="Start Date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <TaskFormInputField
                  type="date"
                  label="End Date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Subtasks Section */}
          <div className="mb-8">
            <button
              type="button"
              className="flex items-center text-violet-600 hover:text-violet-800 font-medium mb-4 transition-colors cursor-pointer"
              onClick={() => setShowSubtasks(!showSubtasks)}
            >
              {showSubtasks ? (
                <FaMinus className="mr-2 h-3 w-3" />
              ) : (
                <FaPlus className="mr-2 h-3 w-3" />
              )}
              {showSubtasks ? 'Hide Subtasks' : 'Add Subtasks'}
            </button>

            {showSubtasks && (
              <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                {formData.subtasks.length > 0 && (
                  <div className="space-y-4">
                    {formData.subtasks.map((subtask, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative"
                      >
                        <button
                          type="button"
                          className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          onClick={() => removeSubtask(index)}
                        >
                          <FaMinus className="h-4 w-4" />
                        </button>

                        <h4 className="font-medium text-gray-800 mb-3">
                          Subtask {index + 1}
                        </h4>

                        <div className="space-y-4">
                          <TaskFormInputField
                            label="Subtask Title"
                            id={`subtasks_title_${index}`}
                            name="subtasks_title"
                            value={subtask.subtasks_title}
                            onChange={(e) => handleSubtaskChange(index, e)}
                            placeholder="Enter subtask title"
                          />

                          <TaskFormTextarea
                            label="Subtask Description"
                            id={`subtasks_description_${index}`}
                            name="subtasks_description"
                            value={subtask.subtasks_description}
                            onChange={(e) => handleSubtaskChange(index, e)}
                            placeholder="Describe the subtask details"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  className="flex items-center text-violet-600 hover:text-violet-800 text-sm font-medium transition-colors cursor-pointer"
                  onClick={addSubtask}
                >
                  <FaPlus className="mr-2 h-3 w-3" />
                  Add Another Subtask
                </button>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigate('/home/myTasks')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
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
