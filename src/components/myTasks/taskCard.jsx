import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaRegEdit, FaRegEye } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteTask } from '../../features/tasks/taskSlice';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const TaskCard = ({
  _id,
  title,
  description,
  status,
  createdAt,
  startDate,
  endDate,
  priority,
}) => {
  // Color mappings
  const statusColors = {
    Completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-500',
    },
    'In Progress': {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
    },
    Pending: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      dot: 'bg-gray-500',
    },
    'On Hold': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  };
  
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const priorityColors = {
    High: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
    Medium: { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
    Low: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  };

  // Format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Calculate days remaining (optional)
  const daysRemaining = () => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    return `${diffDays} days left`;
  };

  const handleEdit = () => {
    navigate(`/home/myTasks/editTask/${_id}`);
  };

  const handleView = () => {
    navigate(`/home/myTasks/viewTask/${_id}`);
  };

const handleDelete = () => {
  
  setModalOpen(true);
};

const dispatch = useDispatch();


const handleTaskDelete = async () => {

  try{
    await dispatch(deleteTask({ id: _id })).unwrap();
    toast.success('Task deleted successfully');
    navigate('/home/mytasks');
  } catch (error) {
    console.error(error);
    toast.error('Failed to delete task');
  }
};

const token = localStorage.getItem('token');

  const getUser = jwtDecode(token);

  const showAddButton = getUser?.user?.isPersonal === true;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 w-full group hover:border-violet-200">
      {/* Header section */}
      <div className="flex flex-row justify-between mb-4 gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-xl md:text-2xl text-gray-900 truncate group-hover:text-violet-700 transition-colors">
            {title}
          </h1>
          <p className="text-xs flex flex-col sm:flex-row gap-0 sm:gap-2 text-gray-500 mt-1">
            <span>Created: </span>
            <span>{formatDate(createdAt)}</span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div
            className={`flex items-center gap-2 px-2 py-1 rounded-md ${
              statusColors[status]?.bg || 'bg-gray-100'
            } ${statusColors[status]?.text || 'text-gray-800'}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                statusColors[status]?.dot || 'bg-gray-500'
              }`}
            ></div>
            <span className="text-xs font-medium capitalize">
              {status.toLowerCase()}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 px-2 py-1 rounded-md ${
              priorityColors[priority]?.bg || 'bg-gray-100'
            } ${priorityColors[priority]?.text || 'text-gray-800'}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                priorityColors[priority]?.dot || 'bg-gray-500'
              }`}
            ></div>
            <span className="text-xs font-medium capitalize">
              {priority.toLowerCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Description section */}
      <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed">
        {description}
      </p>

      {/* Date section */}
      <div className="flex flex-col  justify-between items-start gap-3 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 justify-between w-full text-sm">
          <div className="flex items-center gap-1 text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
            <MdDateRange className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium">Dates</span>
          </div>
          <div className="w-full text-xs justify-end text-gray-500 font-medium flex">
            {daysRemaining()}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4 text-sm w-full p-1">
          <div className="flex items-center gap-1 text-gray-700 text-xs mb-1 sm:m-0">
            <span className="text-gray-500">Start:</span>
            <span className="font-medium">{formatDate(startDate)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700 text-xs mt-1 sm:mt-0">
            <span className="text-gray-500">End:</span>
            <span className="font-medium">{formatDate(endDate)}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-1 sm:justify-end sm:gap-2 mt-4">
        <button
          onClick={handleEdit}
          className={`px-3 py-1.5 text-xs rounded-lg text-violet-600 hover:text-violet-800 hover:bg-violet-50 transition-colors font-medium ${showAddButton ? 'hidden' : 'flex'} items-center gap-1 cursor-pointer`}
        >
          <FaRegEdit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={handleView}
          className="px-3 py-1.5 text-xs rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors font-medium flex items-center gap-1 cursor-pointer"
        >
          <FaRegEye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={handleDelete}
          className={`px-3 py-1.5 text-xs rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors font-medium ${showAddButton ? 'hidden' : 'flex'} items-center gap-1 cursor-pointer`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>

{/* Delete Model */}
{modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-50">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Delete Task</h2>
      <p className="text-gray-700">Are you sure you want to delete this task?</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleTaskDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
        >
          Delete
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
              

    </div>
  );
};

TaskCard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default TaskCard;
