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

  // get the username in the email for the password
  const getPassword = formData.email.split('@')[0];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await dispatch(createUser(formData)).unwrap();
      toast.success('user added successfully');
      navigate('/admin/users');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to add task');
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Back Button */}
      <button
        type="button"
        className="flex items-center text-violet-600 hover:text-violet-800 transition-colors mb-4 cursor-pointer"
        onClick={() => navigate('/home/myTasks')}
      >
        <IoMdArrowRoundBack className="mr-2 h-5 w-5" />
        <span className="text-sm font-medium">Back to Tasks</span>
      </button>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
          <button
            type="button"
            className="flex items-center text-violet-600 hover:text-violet-800 text-sm font-medium transition-colors cursor-pointer"
            onClick={handleRefresh}
          >
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Reset Form
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Main user Fields */}
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <TaskFormInputField
                  label="User Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter user name"
                  required
                />
              </div>

              <div className="col-span-2">
                <TaskFormInputField
                  label="User Email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter user email"
                  required
                />
              </div>

              <div className="col-span-2">
                <TaskFormInputField
                  label="User Password"
                  id="password"
                  name="password"
                  value={(formData.password = getPassword)}
                  onChange={handleChange}
                  placeholder="Enter user password"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
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
