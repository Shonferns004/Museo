import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/home');
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#BB86FC]/5 backdrop-blur-3xl"></div>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#BB86FC]/20 via-transparent to-transparent rounded-full"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#BB86FC]/20 via-transparent to-transparent rounded-full"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative"
      >
        <div className="bg-[#1E1E1E]/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-[#BB86FC]/10">
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-[#BB86FC] to-[#BB86FC]/50 mb-6 shadow-lg"
            >
              <UserCog className="h-10 w-10 text-[#121212]" aria-hidden="true" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold bg-gradient-to-r from-[#BB86FC] to-[#BB86FC]/70 bg-clip-text text-transparent"
            >
              Welcome back
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-2 text-sm text-gray-400"
            >
              Sign in to your admin account
            </motion.p>
          </div>
          
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 space-y-6" 
            onSubmit={handleSubmit}
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email-address" className="block text-sm font-medium text-[#BB86FC]">
                  Email address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#BB86FC] group-hover:text-[#BB86FC]/80 transition-colors duration-200" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-12 pr-4 py-3.5 bg-[#2C2C2E] rounded-xl text-gray-100 placeholder-gray-500 border-2 border-transparent focus:border-[#BB86FC] focus:outline-none transition-all duration-200"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#BB86FC]">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#BB86FC] group-hover:text-[#BB86FC]/80 transition-colors duration-200" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full pl-12 pr-4 py-3.5 bg-[#2C2C2E] rounded-xl text-gray-100 placeholder-gray-500 border-2 border-transparent focus:border-[#BB86FC] focus:outline-none transition-all duration-200"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="relative w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#BB86FC] to-[#BB86FC]/80 rounded-xl text-[#121212] font-medium text-sm hover:from-[#BB86FC]/90 hover:to-[#BB86FC]/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BB86FC] focus:ring-offset-[#1E1E1E] transition-all duration-200 shadow-lg shadow-[#BB86FC]/25"
              >
                Sign in
                <motion.div
                  className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  →
                </motion.div>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}