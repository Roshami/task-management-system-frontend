import { useSelector } from 'react-redux';
import Calendar from '../../components/customerDashboard/calender';
import TaskView from '../../components/customerDashboard/taskView';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { data } from 'react-router';
import { BiTask } from 'react-icons/bi';

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  // filter pending tasks
  const filteredTasks = tasks.filter((task) => task.status === 'Pending');

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const filteredNewTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);
    return task.status === 'Pending' && taskDate >= yesterday;
  });

  // filter completed tasks
  const filterCompletedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  );

  //filter completed and completed on this week
  const filterCompletedTasksWeek = tasks.filter(
    (task) => task.status === 'Completed' && new Date(task.updatedAt) >= today
  );

  //filter upcoming tasks in next 7 days

  const filterUpcomingTasks = tasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    return task.status === 'In Progress' && taskDate <= today;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-1">Manage your tasks and schedule</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Section - Takes full width on mobile, 2/3 on desktop */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200  sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 m-4 flex items-center gap-2">
              <FaRegCalendarAlt className="w-5 h-5 text-violet-600" />
              My Calendar
            </h2>
            <Calendar />
          </div>
        </div>

        {/* Task View Section - Takes full width on mobile, 1/3 on desktop */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 h-full">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BiTask className="w-5 h-5 text-violet-600" />
              Recent Tasks
            </h2>
            <TaskView />
          </div>
        </div>
      </div>

      {/* Quick Stats (Optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-violet-800">
              Pending Tasks
            </h3>
            <span className="text-lg font-bold text-violet-600">
              {filteredTasks.length}
            </span>
          </div>
          <p className="text-xs text-violet-600 mt-1">
            +{filteredNewTasks.length} from yesterday
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-800">Completed</h3>
            <span className="text-lg font-bold text-gray-600">
              {filterCompletedTasks.length}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            +{filterCompletedTasksWeek.length} this week
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-800">Upcoming</h3>
            <span className="text-lg font-bold text-gray-600">
              {filterUpcomingTasks.length}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">Next 7 days</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
