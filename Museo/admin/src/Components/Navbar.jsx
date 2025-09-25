import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Navbar= ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  return (
    <nav className={`fixed top-0 left-0 w-full bg-[#1E1E1E] border-b border-[#BB86FC]/10 z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onMenuClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-[#BB86FC] lg:hidden hover:bg-[#BB86FC]/10 transition-all duration-300"
            >
              <Menu size={20} className="transform transition-transform duration-300" />
            </motion.button>
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.span
                className="text-xl font-semibold text-[#BB86FC]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Museo
              </motion.span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative" ref={profileRef}>
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-8 h-8 flex items-center justify-center rounded-full bg-[#BB86FC]/10 text-[#BB86FC] text-sm font-medium transition-all duration-300 hover:bg-[#BB86FC]/20"
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute right-0 mt-2 w-56 bg-[#1E1E1E] rounded-2xl shadow-lg border border-[#BB86FC]/10 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-[#BB86FC]/10">
                      <p className="text-sm text-white font-medium">{user?.name}</p>
                    </div>
                    <motion.button
                      onClick={logout}
                      whileHover={{ backgroundColor: "rgba(187, 134, 252, 0.1)" }}
                      className="w-full text-left flex items-center px-4 py-3 text-sm text-[#BB86FC] transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;