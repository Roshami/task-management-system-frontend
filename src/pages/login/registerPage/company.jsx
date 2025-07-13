import { useState } from 'react';
import InputField from '../../../components/loginForm/inputField';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Company = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    isAdmin: true,
    isPersonal: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        formData
      );
      toast.success(response.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <form
        className="mt-4 sm:mt-6 space-y-5 sm:space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4 sm:space-y-5">
          <InputField
            label="Name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            containerClass="mb-4"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            containerClass="mb-4"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            containerClass="mb-4"
          />

          <InputField
            label="Company Name"
            name="companyName"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={handleChange}
            containerClass="mb-4"
          />
        </div>

        <div className="flex items-center">
          <input
            id="terms-checkbox"
            name="terms-checkbox"
            type="checkbox"
            className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
            required
          />
          <label
            htmlFor="terms-checkbox"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            I agree to the{' '}
            <a
              href="#"
              className="text-violet-600 dark:text-violet-400 hover:underline"
            >
              Terms and Conditions
            </a>
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium  cursor-pointer rounded-lg text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200 shadow-md ${
            loading ? 'opacity-80 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            'Create Account'
          )}
        </motion.button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Company;
