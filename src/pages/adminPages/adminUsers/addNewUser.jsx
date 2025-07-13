import { useState } from 'react';
import TaskFormInputField from '../../../components/myTasks/tasksForm/tasksFormInputFiled';
import toast from 'react-hot-toast';
import { FiRefreshCw, FiLoader } from 'react-icons/fi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { createUser } from '../../../features/users/userSlice';

const AddNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const admin = jwtDecode(token);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isPersonal: false,
    companyName: admin.companyName,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Auto-generate password from email prefix
      password: name === 'email' ? value.split('@')[0] : formData.password
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await dispatch(createUser(formData)).unwrap();
      toast.success('User created successfully');
      navigate('/admin/users');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      isPersonal: false,
      companyName: admin.companyName,
    });
  };

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
              <p className="text-sm text-gray-600 mt-1">Add a new user to {admin.companyName}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 text-violet-600 hover:text-violet-800 text-sm font-medium transition-colors cursor-pointer"
            >
              <FiRefreshCw className="w-4 h-4" />
              Reset Form
            </button>
          </div>
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
                />
              </div>

              {/* Password Field */}
              <div className="col-span-2">
                <div className="relative">
                  <TaskFormInputField
                    label="Password"
                    id="password"
                    name="password"
                    value={formData.email.split('@')[0] || ''}
                    onChange={handleChange}
                    placeholder="Password will be generated from email"
                    required
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 pb-4 text-xs text-gray-500">
                    (auto-generated)
                  </div>
                </div>
              </div>

              {/* Company Name (readonly) */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                  {admin.companyName}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-8 mt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate('/admin/users')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;