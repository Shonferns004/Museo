import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Siren } from 'lucide-react';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center px-4 py-8 sm:py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        <div className="text-center">
          <motion.div
            variants={itemVariants}
            className="mx-auto w-16 h-16 sm:w-12 sm:h-12 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center border border-gray-700"
          >
            <div className="relative">
             
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-full"
              />
            </div>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-100"
          >
            Dive into the oceans of history
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-center text-sm sm:text-base text-gray-300 px-4"
          >
            Create your account
          </motion.p>
        </div>

        <div className="mt-6 sm:mt-8">
          <motion.div
            variants={itemVariants}
            className="bg-gray-800/80 backdrop-blur-sm py-6 sm:py-8 px-4 sm:px-10 shadow-lg rounded-2xl border border-gray-700 hover-lift"
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-900/50 border border-red-500 text-red-200 px-3 py-2 text-sm rounded-lg relative"
                >
                  {error}
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
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
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Choose a password"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all hover-lift"
                >
                  Create Account
                </motion.button>
              </motion.div>
            </form>

            <motion.div
              variants={itemVariants}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/login')}
                  className="font-medium text-purple-400 hover:text-purple-300 cursor-pointer inline-flex items-center space-x-1"
                >
                  Sign in instead
                </motion.span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </motion.div>
    </div>
  );
};

export default Register;