import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteUser } from '../../features/users/userSlice';

const UsersTable = ({ id, name, email, role, status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/admin/users/edit/${id}`);
  };

  const handleUserDelete = async () => {
    try {
      await dispatch(deleteUser(id)).unwrap();

      toast.success('User deleted successfully');
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    }
  };

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
        {/* Name Column */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-medium">
              {(name && name.charAt(0).toUpperCase()) || 'U'}
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {name || 'Unknown'}
              </div>
              {role && (
                <div className="text-xs text-gray-500 capitalize">{role}</div>
              )}
            </div>
          </div>
        </td>

        {/* Email Column */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{email}</div>
        </td>

        {/* Status Column */}
        {status && (
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {status}
            </span>
          </td>
        )}

        {/* Actions Column */}
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={handleEdit}
              className="text-gray-500 cursor-pointer hover:text-violet-600 transition-colors p-2 rounded-full hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              aria-label="Edit user"
            >
              <FaEdit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDeleteClick}
              className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Delete user"
            >
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Delete Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUserDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

UsersTable.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string,
  status: PropTypes.string,
};

export default UsersTable;
