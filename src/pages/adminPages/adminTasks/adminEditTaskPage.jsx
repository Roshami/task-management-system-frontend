import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchTasks, updateTask } from '../../../features/tasks/taskSlice';
import { IoMdArrowRoundBack } from 'react-icons/io';
import TaskFormInputField from '../../../components/myTasks/tasksForm/tasksFormInputFiled';
import TaskFormTextarea from '../../../components/myTasks/tasksForm/tasksFormTextarea';
import TaskFormDropdown from '../../../components/myTasks/tasksForm/tasksFromDropdown';
import { FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminEditTasksPage = () => {
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

  const handleSubtaskChange = (index, e) => {
    const newSubtasks = [...formData.subtasks];
    newSubtasks[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      subtasks: newSubtasks,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(updateTask({ id: id, updated: formData })).unwrap();
      toast.success('Task updated successfully');
      navigate('/admin/tasks');
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDone = formData.status === 'Completed';

  const handelDisable = () => {
    if (isDone) {
      return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Back Button */}
      <button
        type="button"
        className="flex items-center text-violet-600 hover:text-violet-800 mb-4 transition-colors"
        onClick={() => navigate('/admin/tasks')}
      >
        <IoMdArrowRoundBack className="mr-2 h-5 w-5" />
        <span className="text-sm font-medium">Back to Tasks</span>
      </button>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
            {isDone && (
              <p className="text-sm text-gray-500 mt-1">
                This task is marked as completed and cannot be edited
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Main Task Fields */}
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className='block mb-2 font-semibold text-lg text-gray-900'>Assigned To</h2>
                <p className='w-full p-2 bg-gray-50/50 border border-gray-300 rounded-md'>{formData.assigned_to}</p>
              </div>

              <div className="col-span-2">
                <TaskFormInputField
                  label="Task Title"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  disabled={handelDisable()}
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
                  disabled={handelDisable()}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
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
                  disabled={handelDisable()}
                />
              </div>

              <div className="hidden sm:col-span-1"></div>

              <div className="col-span-2 sm:col-span-1">
                <TaskFormInputField
                  type="date"
                  label="Start Date"
                  id="start_date"
                  name="start_date"
                  value={
                    new Date(formData.start_date).toISOString().split('T')[0]
                  }
                  onChange={handleChange}
                  disabled={handelDisable()}
                />
              </div>

              <div className="col-span-1">
                <TaskFormInputField
                  type="date"
                  label="End Date"
                  id="end_date"
                  name="end_date"
                  value={
                    new Date(formData.end_date).toISOString().split('T')[0]
                  }
                  onChange={handleChange}
                  disabled={handelDisable()}
                />
              </div>
            </div>
          </div>

          {/* Subtasks Section */}
          {formData.subtasks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Subtasks
              </h3>
              <div className="space-y-4">
                {formData.subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800">
                        Subtask {index + 1}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <TaskFormInputField
                        label="Subtask Title"
                        id={`subtasks_title_${index}`}
                        name="subtasks_title"
                        value={subtask.subtasks_title}
                        onChange={(e) => handleSubtaskChange(index, e)}
                        placeholder="Enter subtask title"
                        disabled={handelDisable()}
                      />

                      <TaskFormTextarea
                        label="Subtask Description"
                        id={`subtasks_description_${index}`}
                        name="subtasks_description"
                        value={subtask.subtasks_description}
                        onChange={(e) => handleSubtaskChange(index, e)}
                        placeholder="Describe the subtask details"
                        rows={2}
                        disabled={handelDisable()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate('/admin/tasks')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isDone || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                'Update Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditTasksPage;
