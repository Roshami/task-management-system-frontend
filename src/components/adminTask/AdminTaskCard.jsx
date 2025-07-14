import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaRegEdit, FaRegEye, FaTrashAlt } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteTask, fetchTasks } from '../../features/tasks/taskSlice';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const AdminTaskCard = ({
  _id,
  assignedTo,
  title,
  description,
  status,
  createdAt,
  startDate,
  endDate,
  priority,
}) => {
  // Status color mappings
  const statusColors = {
    Completed: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      dot: 'bg-green-500',
      border: 'border-green-200',
    },
    'In Progress': {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
      border: 'border-amber-200',
    },
    Pending: {
      bg: 'bg-gray-50',
      text: 'text-gray-800',
      dot: 'bg-gray-500',
      border: 'border-gray-200',
    },
    'On Hold': {
      bg: 'bg-red-50',
      text: 'text-red-800',
      dot: 'bg-red-500',
      border: 'border-red-200',
    },
  };
  
  // Priority color mappings
  const priorityColors = {
    High: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      dot: 'bg-red-500',
      border: 'border-red-200',
    },
    Medium: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
      border: 'border-amber-200',
    },
    Low: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      dot: 'bg-green-500',
      border: 'border-green-200',
    },
  };

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Calculate days remaining
  const daysRemaining = () => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return <span className="text-red-600 font-medium">Overdue</span>;
    if (diffDays === 0) return <span className="text-amber-600 font-medium">Due today</span>;
    if (diffDays <= 3) return <span className="text-amber-600 font-medium">{diffDays} days left</span>;
    return <span className="text-green-600 font-medium">{diffDays} days left</span>;
  };

  const handleEdit = () => navigate(`/admin/tasks/editTask/${_id}`);
  const handleView = () => navigate(`/admin/tasks/viewTask/${_id}`);
  const handleDelete = () => setModalOpen(true);

  const handleTaskDelete = async () => {
    try {
      await dispatch(deleteTask(_id)).unwrap();
      toast.success('Task deleted successfully');
      dispatch(fetchTasks(_id));
      setModalOpen(false);
      navigate('/admin/tasks');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete task');
    }
  };

  const token = localStorage.getItem('token');
  const getUser = jwtDecode(token);
  const showAddButton = getUser?.user?.isPersonal === true;

  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-violet-300 group">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-lg md:text-xl text-gray-900 truncate group-hover:text-violet-700 transition-colors">
              {title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-2 sm:mt-10">
              <p className="text-xs text-gray-500">
                <span className="font-medium text-gray-600">Assigned to:</span> {assignedTo}
              </p>
              <span className="hidden sm:block text-gray-300">|</span>
              <p className="text-xs text-gray-500">
                <span className="font-medium text-gray-600">Created:</span> {formatDate(createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                statusColors[status]?.border || 'border-gray-200'
              } ${statusColors[status]?.bg || 'bg-gray-50'}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  statusColors[status]?.dot || 'bg-gray-500'
                }`}
              ></div>
              <span className={`text-xs font-medium ${statusColors[status]?.text || 'text-gray-800'}`}>
                {status}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                priorityColors[priority]?.border || 'border-gray-200'
              } ${priorityColors[priority]?.bg || 'bg-gray-50'}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  priorityColors[priority]?.dot || 'bg-gray-500'
                }`}
              ></div>
              <span className={`text-xs font-medium ${priorityColors[priority]?.text || 'text-gray-800'}`}>
                {priority}
              </span>
            </div>
          </div>
        </div>

        {/* Description section */}
        <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>

        {/* Date section */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MdDateRange className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium">TIMELINE</span>
            </div>
            <div className="text-xs">
              {daysRemaining()}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Start Date</p>
              <p className="text-sm font-medium text-gray-800">{formatDate(startDate)}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">End Date</p>
              <p className="text-sm font-medium text-gray-800">{formatDate(endDate)}</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-gray-100">
          <button
            onClick={handleView}
            className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors cursor-pointer"
            aria-label="View task"
          >
            <FaRegEye className="w-4 h-4" />
          </button>
          {!showAddButton && (
            <>
              <button
                onClick={handleEdit}
                className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors cursor-pointer"
                aria-label="Edit task"
              >
                <FaRegEdit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                aria-label="Delete task"
              >
                <FaTrashAlt className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleTaskDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors cursor-pointer"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AdminTaskCard.propTypes = {
  _id: PropTypes.string.isRequired,
  assignedTo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default AdminTaskCard;