import { useState } from 'react';
import SearchBar from '../../components/searchbar';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { MdLogout, MdDashboard, MdTask, MdPeople } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../features/tasks/taskSlice';
import AdminDashboard from './adminDashboard';
import AdminUsersPage from './AdminUsers/adminUsersPage';
import AdminTasksPage from './adminTasks/adminTasksPage';

const Admin = () => {
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
        <div className="flex flex-col items-center p-4 gap-4">
          {/* Top Row - Logo and Search */}
          <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-4">
            <div className="flex flex-col items-center gap-3">
              <img
                src="/logo.png"
                alt="logo"
                className="h-8 sm:h-10 object-contain"
              />
              <h1 className="text-sm sm:text-lg font-bold text-gray-800">Admin Dashboard</h1>
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
                    className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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
                    className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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
                    className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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

            <Link
              to="/"
              className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <MdLogout className="text-lg sm:text-xl" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 min-h-[calc(100vh-180px)]">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/tasks" element={<AdminTasksPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;