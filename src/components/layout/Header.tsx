import React, { useState } from 'react';
import { Search, Globe, Menu, User } from 'lucide-react';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm py-4' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size={34} className="text-primary" />
          </div>

          {/* Search Bar */}
          <div className="flex items-center flex-grow justify-center max-w-xl mx-8">
            <div className="flex items-center w-full h-12 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <button className="px-6 h-full border-r border-gray-200 font-medium text-sm">
                Anywhere
              </button>
              <button className="px-6 h-full border-r border-gray-200 font-medium text-sm">
                Any week
              </button>
              <button className="px-6 h-full text-gray-500 text-sm">
                Add guests
              </button>
              <button className="ml-auto mr-2 p-2 bg-primary rounded-full">
                <Search size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium px-4 py-2 hover:bg-gray-50 rounded-full">
              Airbnb your home
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full">
              <Globe size={20} />
            </button>
            <button className="flex items-center gap-3 px-3 py-1 border border-gray-200 rounded-full hover:shadow-md transition-shadow">
              <Menu size={18} className="text-gray-600" />
              <div className="bg-gray-500 rounded-full p-1">
                <User size={18} className="text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between">
          <Logo size={34} className="text-primary" />
          <button className="flex items-center gap-3 px-3 py-1 border border-gray-200 rounded-full">
            <Menu size={18} className="text-gray-600" />
            <div className="bg-gray-500 rounded-full p-1">
              <User size={18} className="text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;