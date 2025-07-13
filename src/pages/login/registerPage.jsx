import { useState } from 'react';
import { motion } from 'framer-motion';
import InputField from '../../components/loginForm/inputField';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Personal from './registerPage/personal';
import './loginPage.css';
import Company from './registerPage/company';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
        {
          email: email,
          password: password,
        }
      );

      toast.success('Login successful');
      localStorage.setItem('token', response.data.token);

      navigate(response.data.user.isAdmin == true ? '/admin' : '/home');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-picture">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white/50 backdrop-blur-lg   rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-white/20"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-32 h-32 sm:w-40 sm:h-40 mx-auto object-contain"
            />
          </motion.div>
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-violet-300"
          >
            Create Your Account
          </motion.h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join us today and unlock amazing features
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center space-x-2 sm:space-x-4">
            <Link
              to="/signup/personal"
              className={`px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-all duration-200 ${
                isActive('/signup/personal')
                  ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 shadow-inner'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Personal
            </Link>
            <Link
              to="/signup/company"
              className={`px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-all duration-200 ${
                isActive('/signup/company')
                  ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 shadow-inner'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Company
            </Link>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          <Routes>
            <Route path="/personal" element={<Personal />} />
            <Route path="/company" element={<Company />} />
          </Routes>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
