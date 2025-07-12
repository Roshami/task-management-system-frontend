import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchTasks, updateTask } from '../../../features/tasks/taskSlice';
import { IoMdArrowRoundBack } from 'react-icons/io';
import TaskFormInputField from '../../../components/myTasks/tasksForm/tasksFormInputFiled';
import TaskFormTextarea from '../../../components/myTasks/tasksForm/tasksFormTextarea';
import TaskFormDropdown from '../../../components/myTasks/tasksForm/tasksFromDropdown';
import { FiLoader } from 'react-icons/fi';

const EditTasksPage = () => {
  const params = useParams();
  console.log(params.id);
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task._id === id)
  );

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    start_date: task.start_date,
    end_date: task.end_date,
    subtasks: task.subtasks || [],
    status: task.status || 'Pending',
  });

  useEffect(() => {
    if (!task) {
      dispatch(fetchTasks());
    } else {
      console.log(task);
      setFormData(task);
    }
  }, [task, navigate]);

  console.log('formData', formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: id, updated: formData }));
    setIsSubmitting(true);
    navigate('/home/mytasks');
  };

  const handleCancel = () => {
    navigate('/home/mytasks');
  };

 

  const isDone = task.status === 'Completed';

  return (
    <div className="w-lg md:w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <button
        type="button"
        className="flex items-center text-violet-600 hover:text-violet-800 mb-5"
        onClick={() => navigate('/home/mytasks')}
      >
        <IoMdArrowRoundBack className="mr-2 h-5 w-5" />
        <span className="hidden sm:inline">Back</span>
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Edit Task</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Main Task Fields */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TaskFormInputField
              type="text"
              label="Task Title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={isDone}
              className="col-span-2"
            />

            <TaskFormTextarea
              label="Task Description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-2"
              disabled={isDone}
            />

            <TaskFormDropdown
              label="Task Priority"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              options={[
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' },
              ]}
              required
              disabled={isDone}
            />

            <TaskFormInputField
              type="text"
              label="Task Start Date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              disabled={isDone}
            />

            <TaskFormInputField
              type="text"
              label="Task End Date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              disabled={isDone}
            />

            {formData.subtasks.map((subtask, index) => (
              <div
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                key={index}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-gray-700">
                    Subtask {index + 1}
                  </h4>
                  
                </div>

                <div className="space-y-4">
                  <TaskFormInputField
                    type="text"
                    label="Subtask Title"
                    id={`subtasks_title`}
                    name="subtasks_title"
                    value={subtask.subtasks_title}
                    onChange={(e) => handleSubtaskChange(index, e)}
                  />

                  <TaskFormTextarea
                    label="Subtask Description"
                    id={`subtasks_description`}
                    name="subtasks_description"
                    value={subtask.subtasks_description}
                    onChange={(e) => handleSubtaskChange(index, e)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            disabled={isDone || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <FiLoader className="animate-spin mr-2" />
                Updating...
              </span>
            ) : (
              'Update Task'
            )}
          </button>

          <button
            type="button"
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTasksPage;
