import SearchBar from '../../components/searchbar';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { MdLogout, MdDashboard, MdTask, MdPeople } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../features/tasks/taskSlice';
import AdminDashboard from './adminDashboard';
import AdminUsersPage from './adminUsers/adminUsersPage';
import AdminTasksPage from './adminTasks/adminTasksPage';
import AddAdminTasksPage from './adminTasks/addAdminTasksPage';
import AddNewUser from './adminUsers/addNewUser';
import EditUser from './adminUsers/editUsers';
import AdminEditTasksPage from './adminTasks/adminEditTaskPage';
import AdminViewTaskPage from './adminTasks/adminViewTaskPage';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FiChevronDown, FiLogOut } from 'react-icons/fi';

const Admin = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.tasks);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = localStorage.getItem('token');
  const admin = jwtDecode(token);
  if (!token) {
    window.location.href = '/admin/login';
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
        <div className="flex flex-col items-center p-4 gap-4">
          {/* Top Row - Logo and Search */}
          <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-4">
            <div className="flex flex-col items-center gap-3">
              <img
                src="/logo.png"
                alt="logo"
                className="h-8 sm:h-10 object-contain"
              />
              <h1 className="text-sm sm:text-lg font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>

            <div className="w-full sm:w-64 md:w-96">
              <SearchBar
                value={searchTerm}
                onChange={handleSearch}
                className="w-full"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Bottom Row - Navigation and Logout */}
          <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-4">
            <nav className="w-full sm:w-auto">
              <ul className="flex justify-between sm:justify-start gap-1 sm:gap-4">
                <li className="flex-1 sm:flex-none">
                  <Link
                    to="/admin"
                    className={`flex flex-col cursor-pointer sm:flex-row items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      isActive('/admin')
                        ? 'bg-violet-100 text-violet-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <MdDashboard className="text-lg sm:text-xl" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="flex-1 sm:flex-none">
                  <Link
                    to="/admin/users"
                    className={`flex flex-col cursor-pointer sm:flex-row items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      isActive('/admin/users')
                        ? 'bg-violet-100 text-violet-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <MdPeople className="text-lg sm:text-xl" />
                    <span>Users</span>
                  </Link>
                </li>
                <li className="flex-1 sm:flex-none">
                  <Link
                    to="/admin/tasks"
                    className={`flex flex-col cursor-pointer sm:flex-row items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      isActive('/admin/tasks')
                        ? 'bg-violet-100 text-violet-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <MdTask className="text-lg sm:text-xl" />
                    <span>Tasks</span>
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
                      {admin.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {admin.email}
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
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/users/addAdminUsers" element={<AddNewUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/tasks" element={<AdminTasksPage />} />
          <Route path="/tasks/addadmintasks" element={<AddAdminTasksPage />} />
          <Route path="/tasks/editTask/:id" element={<AdminEditTasksPage />} />
          <Route path="/tasks/viewTask/:id" element={<AdminViewTaskPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
