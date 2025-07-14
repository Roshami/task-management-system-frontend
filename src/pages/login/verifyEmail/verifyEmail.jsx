import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/loadingSpinner';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../loginPage.css';

const VerifyEmail = () => {
  const token = localStorage.getItem('token');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sendOTP = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Verification code sent to your email');
      } catch (err) {
        console.error(err);
        toast.error('Failed to send verification code');
      }
    };
    sendOTP();
  }, [token]);

  const handleVerifyEmail = async () => {
    if (!otp) {
      toast.error('Please enter verification code');
      return;
    }
    if (otp.length !== 6) {
      toast.error('Verification code must be 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`,
        {
          code: parseInt(otp),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Email verified successfully');
      navigate('/');
    } catch (err) {
      //console.error(err);
      toast.error(err.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('New verification code sent to your email');
    } catch (err) {
      //console.error(err);
      toast.error('Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-picture flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-violet-100 mb-4">
              <svg
                className="h-6 w-6 text-violet-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600">
              We've sent a 6-digit verification code to your email address
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
              }}
              className="w-full px-4 py-3 text-lg text-center tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
              placeholder="••••••"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerifyEmail}
            disabled={isLoading || otp.length !== 6}
            className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed mb-4 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner className="h-5 w-5 mr-2" />
                Verifying...
              </div>
            ) : (
              'Verify Email'
            )}
          </button>

          {/* Resend Link */}
          <div className="text-center text-sm text-gray-600">
            Didn't receive code?{' '}
            <button
              onClick={handleResendOTP}
              disabled={isResending}
              className="text-violet-600 hover:text-violet-800 font-medium focus:outline-none disabled:opacity-70 cursor-pointer"
            >
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;