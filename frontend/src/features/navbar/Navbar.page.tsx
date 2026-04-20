import React, { useState } from 'react';
import { Menu, X, User, LogOut, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Using Link to prevent page refreshes
import logo from "../../assets/my.svg";
import { useAuth } from '../../context/AuthContext'; // Import your custom hook

interface NavItem {
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth(); // Get auth state
  const navigate = useNavigate();

  // Define all possible links
  const allLinks: NavItem[] = [
    { label: 'HR Manager', path: '/hr/manager' },
    { label: 'Email Jobs', path: '/email/jobs' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Template Editor', path: '/templates' },
    { label: 'Homepage', path: '/home' },
    { label: 'Email Config', path: '/email/config'},
    { label: 'Company List', path: '/company/registration'}
  ];

  // Filter links: 
  // If logged in: Show everything EXCEPT Homepage
  // If NOT logged in: Show ONLY Homepage
  const navLinks = allLinks.filter((link) => {
    if (isAuthenticated) {
      return link.label !== 'Homepage';
    }
    return link.label === 'Homepage';
  });

  const handleLogout = () => {
    logout();
    navigate('/home'); // Redirect after logout
  };

  return (
    <nav className="bg-white border-b border-gray-200 w-full fixed top-0 z-50">
      <div className="w-full mx-auto px-6 md:px-17">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo and Name */}
          <Link to={isAuthenticated ? "/hr/manager" : "/home"} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Logo" className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              PitchHR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="Profile"
                onClick={() => navigate('/profile')}>
                  <User size={20} />
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <LogIn size={18} />
                Log In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-2 pt-2 pb-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <button className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => navigate('/profile')}>
                  <User size={20} /> Profile Settings
                </button>
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50">
                  <LogOut size={20} /> Log Out
                </button>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="flex items-center gap-3 px-3 py-2 text-blue-600 hover:bg-blue-50">
                <LogIn size={20} /> Log In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;