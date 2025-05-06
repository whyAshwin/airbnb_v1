import React from 'react';
import { Users } from 'lucide-react';

interface FirstTimeFriendlyFilterProps {
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
}

const FirstTimeFriendlyFilter: React.FC<FirstTimeFriendlyFilterProps> = ({ 
  isSelected, 
  onChange 
}) => {
  return (
    <button
      className={`flex items-center py-2 px-4 rounded-full border text-sm font-medium transition-all
        ${isSelected 
          ? 'bg-blue-50 border-blue-200 text-blue-800' 
          : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300'
        }`}
      onClick={() => onChange(!isSelected)}
    >
      <Users size={16} className={`mr-2 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
      <span>First-Time Friendly</span>
      {isSelected && (
        <span className="inline-flex ml-2 h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
          ✓
        </span>
      )}
    </button>
  );
};

export default FirstTimeFriendlyFilter;