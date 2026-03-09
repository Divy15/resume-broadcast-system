import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react'; // Using lucide-react for icons
import logo from "../../../public/my.svg";

interface NavItem {
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navLinks: NavItem[] = [
    { label: 'HR Manager', path: '/hr/manager' },
    { label: 'Email Jobs', path: '/email/jobs' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Homepage', path: '/home' },
    { label: 'Template Editor', path: '/templates'}
  ];

  return (
    <nav className="bg-white border-b border-gray-200 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1 & 2: Logo and Name */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <img src={logo} alt="Logo can't load" />
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              PitchHR
            </span>
          </div>

          {/* Desktop Navigation (Items 3, 4, 5, 8) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions (Items 6 & 7) */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <User size={20} />
            </button>
            <button className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition-colors text-sm font-medium">
              <LogOut size={18} />
              Log Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-2 pt-2 pb-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-2">
            <button className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50">
              <User size={20} /> Profile Settings
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50">
              <LogOut size={20} /> Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;