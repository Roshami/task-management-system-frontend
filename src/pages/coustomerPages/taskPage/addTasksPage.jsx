import { useState } from 'react';
import axios from 'axios';
import TaskFormInputField from '../../../components/myTasks/tasksForm/tasksFormInputFiled';
import TaskFormTextarea from '../../../components/myTasks/tasksForm/tasksFormTextarea';
import TaskFormDropdown from '../../../components/myTasks/tasksForm/tasksFromDropdown';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../../features/tasks/taskSlice';

const AddTasksPage = () => {
  const dispatch = useDispatch();
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
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

      toast.success('Task added successfully');

      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        priority: 'High',
        status: 'Pending',
        start_date: '',
        end_date: '',
        subtasks: [],
      })
    } catch (error) {
      console.error(error);
      toast.error('Failed to add task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'High',
      status: 'Pending',
      start_date: '',
      end_date: '',
      subtasks: [],
    });
    navigation('/home/myTasks');
  };

  const handleRefresh = () => {
    setFormData({
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
    <div className="w-lg md:w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">

      <div>
        <button 
          type="button" 
          className="flex items-center text-violet-600 hover:text-violet-800 transition-colors mb-5 cursor-pointer"
          onClick={() => navigation('/home/myTasks')}
        >
          <IoMdArrowRoundBack className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

  {/* Header with refresh button */}
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Add New Task</h1>
    <button 
      type="button" 
      className="flex items-center text-violet-600 hover:text-violet-800 transition-colors cursor-pointer"
      onClick={handleRefresh}
    >
      <FiRefreshCw className="mr-2 h-5 w-5" />
      <span className="hidden sm:inline">Refresh</span>
    </button>
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
          className="col-span-2"
        />

        <TaskFormTextarea
          label="Task Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="col-span-2"
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
        />

        <TaskFormInputField
          type="date"
          label="Task Start Date"
          id="start_date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />

        <TaskFormInputField
          type="date"
          label="Task End Date"
          id="end_date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Subtasks Section */}
    <div className="mb-6 pb-6 border-b border-gray-200">
      <button
        className="flex items-center text-violet-600 hover:text-violet-800 font-semibold transition-colors cursor-pointer"
        type="button"
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
        <div className="mt-4 space-y-4">
          <button
            className="flex items-center text-green-600 hover:text-green-800 font-semibold transition-colors cursor-pointer"
            type="button"
            onClick={addSubtask}
          >
            <FaPlus className="mr-2 h-3 w-3" />
            Add Subtask
          </button>

          {formData.subtasks.map((subtask, index) => (
            <div 
              className="p-4 bg-gray-50 rounded-lg border border-gray-200" 
              key={index}
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-700">Subtask {index + 1}</h4>
                <button
                  className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                  type="button"
                  onClick={() => removeSubtask(index)}
                >
                  <FaMinus />
                </button>
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
      )}
    </div>

    {/* Form Actions */}
    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
      
      <button
        type="submit"
        className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <FiLoader className="animate-spin mr-2" />
            Adding...
          </span>
        ) : 'Add Task'}
      </button>

      <button
        type="button"
        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors cursor-pointer"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  </form>
</div>
  );
};

export default AddTasksPage;
