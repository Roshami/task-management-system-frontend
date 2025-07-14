import { useEffect, useState } from 'react';
import TaskFormInputField from '../../../components/myTasks/tasksForm/tasksFormInputFiled';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, fetchUsers } from '../../../features/users/userSlice';

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { loading } = useSelector((state) => state.users);
  const user = useSelector((state) =>
    state.users.users?.find((user) => user._id === id)
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isPersonal: false,
    companyName: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600 text-lg font-medium">
            User not found. Please check the URL or go back.
          </p>
        </div>
      );
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await dispatch(updateUser({ id: id, updated: formData })).unwrap();
      toast.success('User updated successfully');
      navigate('/admin/users');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="animate-spin h-8 w-8 text-violet-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/users')}
        className="flex items-center gap-2 text-violet-600 hover:text-violet-800 transition-colors mb-6 cursor-pointer"
      >
        <IoMdArrowRoundBack className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Users</span>
      </button>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
          <p className="text-sm text-gray-600 mt-1">
            Update user details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Main User Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="col-span-2 md:col-span-1">
                <TaskFormInputField
                  label="Full Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter user's full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="col-span-2 md:col-span-1">
                <TaskFormInputField
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter user's email"
                  required
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-8 mt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigate('/admin/users')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                'Update User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
