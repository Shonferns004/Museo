import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Siren, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center px-4 py-8 sm:py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 sm:w-12 sm:h-12 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center border border-gray-700">
            <div className="relative">
              
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" />
            </div>
          </div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-gray-100">Welcome back to Museo</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 px-4">Sign in to your account</p>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="bg-gray-800/80 backdrop-blur-sm py-6 sm:py-8 px-4 sm:px-10 shadow-lg rounded-2xl border border-gray-700 hover-lift">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-3 py-2 text-sm rounded-lg">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all hover-lift"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <span
                  onClick={() => navigate('/register')}
                  className="font-medium text-purple-400 hover:text-purple-300 cursor-pointer"
                >
                  Sign up now
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;