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

  const handleBack = () => {
    navigation('/home/myTasks');
  };

  return (
    <div className="p-4 w-full rounded-lg">
      <div>
        <button type="button" className="flex items-center cursor-pointer" onClick={handleBack}><IoMdArrowRoundBack className="mr-2 h-4 w-4" /></button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <button type="button" className="flex items-center cursor-pointer" onClick={handleRefresh}><FiRefreshCw className="mr-2 h-4 w-4" /></button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 border-b-2 pb-4 border-gray-300">
          <TaskFormInputField
            type="text"
            label="Task Title"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <TaskFormTextarea
            label="Task Description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
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

        <div className="mb-4 border-b-2 pb-4 border-gray-300">
          <button
            className="cursor-pointer text-blue-600 font-semibold"
            type="button"
            onClick={() => setShowSubtasks(!showSubtasks)}
          >
            {showSubtasks ? 'Hide Subtasks' : 'Add Subtasks'}
          </button>

          {showSubtasks && (
            <div className="mt-4 flex flex-col">
              <button
                className="cursor-pointer flex justify-start items-center mb-4 text-green-600 font-semibold"
                type="button"
                onClick={addSubtask}
              >
                <FaPlus /> <span className="ml-2">Add Subtask</span>
              </button>

              {formData.subtasks.map((subtask, index) => (
                <div className="mb-4 pb-4 border-b border-gray-200" key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold">Subtask {index + 1}</h4>
                    <button
                      className="text-red-600"
                      type="button"
                      onClick={() => removeSubtask(index)}
                    >
                      <FaMinus />
                    </button>
                  </div>

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
              ))}
            </div>
          )}
        </div>

       <div>
         <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 cursor-pointer text-white font-bold py-2 px-4 rounded ml-2"
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
