import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../features/users/userSlice';
import LoadingSpinner from '../../../components/loadingSpinner';
import { FaPlus, FaUsers } from 'react-icons/fa';
import UsersTable from '../../../components/adminUsers/usersTable';

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.user);
  const { loadding, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header section */}
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all registered users in the system
          </p>
          <p className="text-gray-500 mt-3">
            Showing {users?.length || 0}{' '}
            {users?.length === 1 ? 'user' : 'users'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Link
            to="/admin/users/addAdminUsers"
            className="inline-flex items-center justify-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm w-full md:w-auto"
          >
            <FaPlus className="mr-2" />
            Add New User
          </Link>
        </div>
      </div>

      {/* Users table section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FaUsers className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {searchTerm ? 'No matching users found' : 'No users available'}
            </h3>
            <p className="text-gray-500 mb-4 max-w-md">
              {searchTerm
                ? 'Try adjusting your search query'
                : 'Get started by adding a new user'}
            </p>
            <Link
              to="/admin/users/addAdminUsers"
              className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    colSpan={2}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...users]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((users) => (
                    <UsersTable
                      key={users._id}
                      id={users._id}
                      name={users.name}
                      email={users.email}
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
