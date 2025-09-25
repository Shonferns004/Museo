import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Landmark, ChevronLeft,ClipboardList , ChevronRight, Columns, LayoutDashboard, Ticket, Scroll } from 'lucide-react';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Ticket, label: 'My Bookings', path: '/tickets' },
  { icon: Landmark , label: 'Browse', path: '/browse' },
  { icon: ClipboardList  , label: 'Plan a Tour', path: '/plan' },
];
const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#121212]">
      <Navbar
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#1E1E1E] border-b border-[#BB86FC]/10 backdrop-blur-lg"
      />
      <div className="flex h-[calc(100vh-4rem)] mt-16">
        <aside
          className={`fixed top-[48px] bottom-0 left-0 z-40 bg-[#1E1E1E] border-r border-[#BB86FC]/10 transition-all duration-300 ease-in-out
            ${isSidebarOpen ? 'w-72' : 'w-20'}
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="sticky top-0 flex items-center justify-end p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#BB86FC]/10 transition-colors duration-200"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="w-5 h-5 text-[#BB86FC]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#BB86FC]" />
              )}
            </button>
          </div>
          <nav className="px-4 space-y-3 overflow-y-auto h-[calc(100%-4rem)]">
            {sidebarLinks.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-200
                  ${location.pathname === path
                    ? 'bg-[#BB86FC]/10 text-[#BB86FC]'
                    : 'text-gray-400 hover:bg-[#2C2C2E] hover:text-[#BB86FC]'}
                  ${isSidebarOpen ? '' : 'justify-center'}`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    location.pathname === path ? 'text-[#BB86FC]' : ''
                  } 
                  ${isSidebarOpen ? 'mr-3' : 'mx-auto'} transition-colors duration-200`}
                />
                {isSidebarOpen && (
                  <span className="text-sm font-medium whitespace-nowrap tracking-wide">
                    {label}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </aside>
        <main
          className={`flex-1 h-full overflow-auto transition-all duration-300 bg-[#121212] text-white
            ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'} p-6`}
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;