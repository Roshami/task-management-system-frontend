import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasks,
  selectFilteredTasks,
  setStatusFilter,
} from '../../../features/tasks/taskSlice';
import LoadingSpinner from '../../../components/loadingSpinner';
import TaskCard from '../../../components/myTasks/taskCard';
import { BiTask } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const statusFilter = useSelector((state) => state.tasks.statusFilter);
  const tasks = useSelector(selectFilteredTasks);
  const { loadding, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, loadding]);

  if (loadding)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500 text-lg font-medium">Error: {error}</p>
      </div>
    );

  const statusOptions = [
    { value: 'All', label: 'All Tasks' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'On Hold', label: 'On Hold' },
  ];

  const token = localStorage.getItem('token');

  const getUser = jwtDecode(token);

  const showAddButton = getUser?.user?.isPersonal === true;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            All Users
          </h1>
          <p className="text-gray-500 mt-1">
            Showing {tasks.length} {tasks.length === 1 ? 'user' : 'users'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          

          <Link
            to="/admin/users/addAdminuUers"
            className={`${
              showAddButton ? 'hidden' : 'inline-flex'
            } items-center justify-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm w-full sm:w-auto`}
          >
            <FaPlus className="mr-2" />
            Add New Task
          </Link>
        </div>
      </div>

      {/* Tasks grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl shadow-sm border border-gray-200">
            <BiTask className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No tasks found
            </h3>
            <p className="text-gray-500 mb-4">
              {statusFilter === 'All'
                ? 'Get started by creating a new task'
                : `No ${statusFilter.toLowerCase()} tasks found`}
            </p>
            
          </div>
        ) : (
          [...tasks]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((task) => (
              <TaskCard
                key={task._id}
                _id={task._id}
                title={task.title}
                description={task.description}
                status={task.status}
                createdAt={task.createdAt}
                startDate={task.start_date}
                endDate={task.end_date}
                priority={task.priority}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
