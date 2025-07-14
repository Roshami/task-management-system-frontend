import SearchBar from '../../components/searchbar';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { MdLogout, MdDashboard, MdTask } from 'react-icons/md';
import Dashboard from './dashboard';
import MyTasksPage from './taskPage/myTasksPage';
import AddTasksPage from './taskPage/addTasksPage';
import ViewTaskPage from './taskPage/viewTaskPage';
import EditTasksPage from './taskPage/editTaskPage';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../features/tasks/taskSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.tasks);

  const location = useLocation();

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header/Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
        <div className="flex flex-col  items-center p-4 gap-4">
          <div className="flex items-center gap-2 sm:gap-20 w-full justify-between">
            <img
              src="/logo.png"
              alt="logo"
              className="h-5 sm:h-10 object-contain"
            />
            <div className="flex-1 sm:flex-none sm:w-64 md:w-100">
              <SearchBar
                value={searchTerm}
                onChange={handleSearch}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center sm:gap-4 w-full justify-between">
            <nav className="flex items-center justify-center w-full">
              <ul className="flex gap-1 sm:gap-6 md:gap-8">
                <li>
                  <Link
                    to="/home"
                    className={`flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-[12px] cursor-pointer sm:text-base font-medium transition-colors ${
                      isActive('/home')
                        ? 'bg-violet-100 text-violet-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MdDashboard className="text-sm sm:text-lg" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/home/mytasks"
                    className={`flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-[12px] sm:text-base font-medium transition-colors ${
                      isActive('/home/mytasks')
                        ? 'bg-violet-100 text-violet-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MdTask className="text-sm sm:text-lg" />
                    <span>My Tasks</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <Link
              to="/"
              className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <MdLogout className="text-lg" />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 min-h-[calc(100vh-180px)]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mytasks" element={<MyTasksPage />} />
          <Route path="/mytasks/addTask" element={<AddTasksPage />} />
          <Route path="/mytasks/editTask/:id" element={<EditTasksPage />} />
          <Route path="/mytasks/viewTask/:id" element={<ViewTaskPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
