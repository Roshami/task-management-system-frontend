import { useState } from 'react';
import SearchBar from '../../components/searchbar';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import Dashboard from './dashboard';
import MyTasksPage from './taskPage/myTasksPage';
import AddTasksPage from './taskPage/addTasksPage';
import EditTasksPage from './taskPage/viewTaskPage';
import ViewTaskPage from './taskPage/viewTaskPage';



const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  //const location = useLocation(); // Get current route location


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-gray-100 p-2 h-full w-full">
      <div className="bg-white top-2 left-2 right-2 rounded-2xl ">
        <div className="flex items-center py-5 px-5 gap-5 justify-between">
          <img src="logo.png" alt="logo" className="h-5 sm:h-8 object-cover" />
          <SearchBar value={searchTerm} onChange={handleSearch} />
        </div>

        <div className="flex items-center justify-evenly p-2">
          <nav className="flex items-center justify-center">
            <ul className="flex justify-center gap-6">
              <li>
                <Link
                  to="/home"
                  className={`text-gray-600 hover:text-gray-800 font-bold text-sm sm:text-lg ${
                    isActive('/home') ? 'border-b-2 border-gray-800' : ''
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/home/mytasks"
                  className={`text-gray-600 hover:text-gray-800 font-bold text-sm sm:text-lg ${
                    isActive('/home/mytasks/*')
                      ? 'border-b-2 border-gray-800'
                      : ''
                  }`}
                >
                  My Tasks
                </Link>
              </li>
            </ul>
          </nav>
          <Link
            to="/"
            className=" font-bold py-2 px-4 rounded flex items-center gap-2"
          >
            <MdLogout className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600 hover:text-gray-800" />
            <span className="text-gray-600 hover:text-gray-800 hidden sm:block">
              Logout
            </span>
          </Link>
        </div>
      </div>

      <div className="flex items-center p-3 mt-3 bg-white rounded-2xl h-full">
        <Routes>
          {/* Logout link */}
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
      {/* Main content */}
          {/* Dashboard route */}
          {/* My Tasks route */}
          {/* Add Task route */}
          {/* Edit Task route */}
