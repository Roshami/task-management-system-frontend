import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchTasks, updateTask } from '../../../features/tasks/taskSlice';
import { IoMdArrowRoundBack } from 'react-icons/io';
import TaskFormDropdown from '../../../components/myTasks/tasksForm/tasksFromDropdown';
import { FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ViewTaskPage = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task._id === id)
  );

  const [formData, setFormData] = useState({
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
      navigate('/home/mytasks');
    } catch (error) {
      toast.error('Failed to update task status');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDone = formData.status === 'Completed';

  const statusColors = {
    Completed: 'bg-green-100 text-green-800',
    'In Progress': 'bg-amber-100 text-amber-800',
    Pending: 'bg-gray-100 text-gray-800',
    'On Hold': 'bg-red-100 text-red-800',
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-amber-100 text-amber-800',
    Low: 'bg-green-100 text-green-800',
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Back Button */}
      <button
        type="button"
        className="flex items-center text-violet-600 hover:text-violet-800 mb-4 transition-colors cursor-pointer"
        onClick={() => navigate('/home/mytasks')}
      >
        <IoMdArrowRoundBack className="mr-2 h-5 w-5" />
        <span className="text-sm font-medium">Back to Tasks</span>
      </button>

      {/* Task View Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Task Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.title}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[formData.status]
                  }`}
                >
                  {formData.status}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    priorityColors[formData.priority]
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Description
                </h3>
                <p className="text-gray-900">{formData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Start Date
                  </h3>
                  <p className="text-gray-900">
                    {new Date(formData.start_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    End Date
                  </h3>
                  <p className="text-gray-900">
                    {new Date(formData.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Status Update */}
            <div className="border-l-0 md:border-l md:border-gray-200 md:pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Update Status
              </h3>
              <form onSubmit={handleSubmit}>
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
                  disabled={isDone}
                />
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate('/home/mytasks')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                    disabled={isSubmitting}
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

          {/* Subtasks Section */}
          {formData.subtasks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Subtasks
              </h3>
              <div className="space-y-4">
                {formData.subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        Subtask {index + 1}
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">
                          Title
                        </h5>
                        <p className="text-gray-900">
                          {subtask.subtasks_title}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">
                          Description
                        </h5>
                        <p className="text-gray-900">
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
      </div>
    </div>
  );
};

export default ViewTaskPage;
