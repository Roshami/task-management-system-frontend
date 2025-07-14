import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchTasks, updateTask } from '../../../features/tasks/taskSlice';
import { IoMdArrowRoundBack } from 'react-icons/io';
import TaskFormDropdown from '../../../components/myTasks/tasksForm/tasksFromDropdown';
import { FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminViewTaskPage = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task._id === id)
  );

  const [formData, setFormData] = useState({
    assigned_to: task?.assigned_to || '',
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'High',
    start_date: task?.start_date || '',
    end_date: task?.end_date || '',
    subtasks: task?.subtasks || [],
    status: task?.status || 'Pending',
  });

  useEffect(() => {
    if (!task) {
      dispatch(fetchTasks());
    } else {
      setFormData(task);
    }
  }, [task, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(updateTask({ id: id, updated: formData })).unwrap();
      toast.success('Task status updated successfully');
      navigate('/admin/tasks');
    } catch (error) {
      toast.error('Failed to update task status');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDone = formData.status === 'Completed';

  const statusColors = {
    Completed: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200',
    },
    'In Progress': {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
    },
    Pending: {
      bg: 'bg-gray-50',
      text: 'text-gray-800',
      border: 'border-gray-200',
    },
    'On Hold': {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200',
    },
  };

  const priorityColors = {
    High: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200',
    },
    Medium: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
    },
    Low: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200',
    },
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
        <span className="text-sm font-medium cursor-pointer">
          Back to Tasks
        </span>
      </button>

      {/* Task View Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Task Header */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[formData.status].bg
                  } ${statusColors[formData.status].text} border ${
                    statusColors[formData.status].border
                  }`}
                >
                  {formData.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    priorityColors[formData.priority].bg
                  } ${priorityColors[formData.priority].text} border ${
                    priorityColors[formData.priority].border
                  }`}
                >
                  {formData.priority} Priority
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Task Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Assigned To
                  </h3>
                  <p className="text-gray-900 font-medium">
                    {formData.assigned_to}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Start Date
                    </h3>
                    <p className="text-gray-900">
                      {formatDate(formData.start_date)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      End Date
                    </h3>
                    <p className="text-gray-900">
                      {formatDate(formData.end_date)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line">
                    {formData.description}
                  </p>
                </div>
              </div>

              {/* Subtasks Section */}
              {formData.subtasks.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Subtasks
                  </h3>
                  <div className="space-y-3">
                    {formData.subtasks.map((subtask, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            Subtask {index + 1}
                          </h4>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 mb-1">
                              Title
                            </h5>
                            <p className="text-gray-700">
                              {subtask.subtasks_title}
                            </p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 mb-1">
                              Description
                            </h5>
                            <p className="text-gray-700 whitespace-pre-line">
                              {subtask.subtasks_description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Status Update */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Update Status
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <TaskFormDropdown
                      label="New Status"
                      name="status"
                      options={[
                        { value: 'Completed', label: 'Completed' },
                        { value: 'In Progress', label: 'In Progress' },
                        { value: 'Pending', label: 'Pending' },
                        { value: 'On Hold', label: 'On Hold' },
                      ]}
                      value={formData.status}
                      onChange={handleChange}
                      disabled = {isDone}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => navigate('/admin/tasks')}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                      disabled={isDone || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <FiLoader className="animate-spin mr-2" />
                          Updating...
                        </>
                      ) : (
                        'Update Status'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewTaskPage;
