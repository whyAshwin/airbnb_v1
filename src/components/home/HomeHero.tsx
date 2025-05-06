import React from 'react';

const HomeHero: React.FC = () => {
  return (
    <div className="pt-[80px]">
      {/* Search bar for mobile */}
      <div className="md:hidden px-4 py-4">
        <div className="flex items-center w-full h-14 rounded-full border border-gray-200 shadow-sm px-6">
          <div className="flex-1">
            <div className="font-medium text-sm">Anywhere</div>
            <div className="text-xs text-gray-500">Any week • Add guests</div>
          </div>
          <button className="p-2 bg-primary rounded-full">
            <svg width="16" height="16" viewBox="0 0 32 32" className="text-white" fill="currentColor">
              <path d="M13 24c6.1 0 11-4.9 11-11S19.1 2 13 2 2 6.9 2 13s4.9 11 11 11zm0-2c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm18 12l-7.7-7.7 1.4-1.4 7.7 7.7-1.4 1.4z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;