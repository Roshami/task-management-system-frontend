import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectFilteredTasks, setStatusFilter } from '../../../features/tasks/taskSlice';
import LoadingSpinner from '../../../components/loadingSpinner';
import TaskCard from '../../../components/myTasks/taskCard';
import { BiTask } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { FiFilter } from 'react-icons/fi';

const MyTasksPage = () => {
  const dispatch = useDispatch();
  const statusFilter = useSelector((state) => state.tasks.statusFilter);
  const tasks = useSelector(selectFilteredTasks);
  const { loadding, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const statusOptions = [
    { value: 'All', label: 'All Tasks' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'On Hold', label: 'On Hold' },
  ];

  const token = localStorage.getItem('token');
  const getUser = jwtDecode(token);
  const isPersonalAccount = getUser.companyName === 'Personal';

  if (loadding) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500 text-lg font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-600 mt-2">
              {isPersonalAccount ? 'Personal tasks' : `Tasks for ${getUser.companyName}`}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-56">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => dispatch(setStatusFilter(e.target.value))}
                className="block w-full pl-10 pr-10 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {isPersonalAccount && (
              <Link
                to="/home/myTasks/addTask"
                className="inline-flex items-center justify-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm whitespace-nowrap"
              >
                <FaPlus className="mr-2" />
                Add New Task
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between bg-violet-50 px-4 py-3 rounded-lg border border-violet-100">
          <p className="text-sm text-violet-800">
            Showing <span className="font-semibold">{tasks.length}</span> {tasks.length === 1 ? 'task' : 'tasks'}
            {statusFilter !== 'All' && (
              <span className="ml-2">(filtered by {statusFilter.toLowerCase()})</span>
            )}
          </p>
          {statusFilter !== 'All' && (
            <button 
              onClick={() => dispatch(setStatusFilter('All'))}
              className="text-sm text-violet-600 hover:text-violet-800 font-medium"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Tasks grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl shadow-sm border border-gray-200">
            <BiTask className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {statusFilter === 'All' ? 'No tasks available' : `No ${statusFilter.toLowerCase()} tasks`}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              {statusFilter === 'All'
                ? 'Get started by creating your first task'
                : 'Try changing your filter or creating a new task'}
            </p>
            {isPersonalAccount && (
              <Link
                to="/home/myTasks/addTask"
                className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                <FaPlus className="mr-2" />
                Add New Task
              </Link>
            )}
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

export default MyTasksPage;