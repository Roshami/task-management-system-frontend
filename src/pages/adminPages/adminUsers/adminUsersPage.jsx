import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../features/users/userSlice';
import LoadingSpinner from '../../../components/loadingSpinner';
import { FaPlus, FaUsers, FaSearch } from 'react-icons/fa';
import UsersTable from '../../../components/adminUsers/usersTable';

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.user);
  const { loadding, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all registered users in the system
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Link
              to="/admin/users/addAdminUsers"
              className="inline-flex items-center justify-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm whitespace-nowrap cursor-pointer"
            >
              <FaPlus className="mr-2" />
              Add New User
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between bg-violet-50 px-4 py-3 rounded-lg border border-violet-100">
          <p className="text-sm text-violet-800">
            Showing <span className="font-semibold">{filteredUsers.length}</span> {filteredUsers.length === 1 ? 'user' : 'users'}
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-sm text-violet-600 hover:text-violet-800 font-medium cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Users table section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <FaUsers className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {searchTerm ? 'No matching users found' : 'No users available'}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              {searchTerm
                ? 'Try adjusting your search or clear the search field'
                : 'Get started by adding your first user'}
            </p>
            <Link
              to="/admin/users/addAdminUsers"
              className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <FaPlus className="mr-2" />
              Add New User
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((user) => (
                    <UsersTable
                      key={user._id}
                      id={user._id}
                      name={user.name}
                      email={user.email}
                      status={user.status || 'active'}
                      role={user.role}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;