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
import { FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.tasks);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();

  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  if (!token) {
    window.location.href = '/login';
  }

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header/Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 px-4 sm:px-6">
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

          {/* Navigation Bar */}
          <div className="flex items-center sm:gap-4 w-full justify-between">
            <nav className="w-full sm:w-auto">
              <ul className="flex justify-between sm:justify-start gap-1 sm:gap-4">
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

            {/* User Dropdown */}
            <div>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    className="w-10 h-10 rounded-full bg-gray-300 object-cover border-2 border-white/30"
                    src="/profile.PNG"
                    alt="User profile"
                  />
                  <FiChevronDown
                    className={`transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-10 mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden border-1 border-gray-100">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    to="/"
                    className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    <MdLogout className="text-lg sm:text-xl" />
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </div>
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
