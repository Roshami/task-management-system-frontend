import { useSelector } from 'react-redux';
import Calendar from '../../components/customerDashboard/calender';
import TaskView from '../../components/customerDashboard/taskView';
import { FaRegBuilding, FaRegCalendarAlt } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => task.status === 'Pending');

  const token = localStorage.getItem('token');
  const admin = jwtDecode(token);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const filteredNewTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);
    return task.status === 'Pending' && taskDate >= yesterday;
  });

  const filterCompletedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  );

  const filterCompletedTasksWeek = tasks.filter((task) => {
    const completedDate = new Date(task.updatedAt);
    return task.status === 'Completed' && completedDate >= lastWeek;
  });

  const filterUpcomingTasks = tasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return (
      task.status === 'In Progress' &&
      taskDate <= weekFromNow &&
      taskDate >= today
    );
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {admin.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Managing tasks for{' '}
          <span className="font-medium text-violet-700">
            {admin.companyName}
          </span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Pending Tasks Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Pending Tasks
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filteredTasks.length}
              </p>
            </div>
            <div className="bg-violet-100 p-3 rounded-lg">
              <BiTask className="h-6 w-6 text-violet-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
              +{filteredNewTasks.length} new today
            </span>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Completed
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filterCompletedTasks.length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BiTask className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              +{filterCompletedTasksWeek.length} this week
            </span>
          </div>
        </div>

        {/* Upcoming Tasks Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Upcoming
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filterUpcomingTasks.length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaRegCalendarAlt className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Next 7 days
            </span>
          </div>
        </div>

        {/* Company Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Your Company
              </h3>
              <p className="text-xl font-bold text-gray-900 mt-1 truncate">
                {admin.companyName}
              </p>
            </div>
            <div className="bg-violet-100 p-3 rounded-lg">
              <FaRegBuilding className="h-6 w-6 text-violet-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Section */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaRegCalendarAlt className="w-5 h-5 text-violet-600" />
                Company Calendar
              </h2>
            </div>
            <div className="p-4">
              <Calendar />
            </div>
          </div>
        </div>

        {/* Task View Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BiTask className="w-5 h-5 text-violet-600" />
                Recent Tasks
              </h2>
            </div>
            <div className="p-4">
              <TaskView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
