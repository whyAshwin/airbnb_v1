import React, { useState } from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';

interface HealthyBadgeProps {
  count: number;
  keywords?: string[];
  large?: boolean;
}

const HealthyBadge: React.FC<HealthyBadgeProps> = ({ count, keywords = ['clean', 'safe', 'comfortable'], large = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (count < 3) return null;

  return (
    <div className="relative inline-flex">
      <div 
        className={`inline-flex items-center rounded-full bg-green-50 border border-green-100 text-green-800
          cursor-pointer hover:bg-green-100 transition-colors
          ${large ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'}`}
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <ShieldCheck size={large ? 18 : 14} className="mr-1.5 text-green-600" />
        <span className="font-medium">Marked Healthy by {count} Women Guests</span>
        <HelpCircle size={large ? 14 : 12} className="ml-1.5 text-green-600/70" />
      </div>
      
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 w-60 p-3 bg-white shadow-lg rounded-lg border border-gray-200 z-10 text-xs">
          <div className="font-medium text-gray-900 mb-1.5">Based on reviews from verified women travelers</div>
          
          <div className="text-gray-600 mb-2">
            Women guests have rated this place highly for:
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((keyword, index) => (
              <span key={index} className="px-1.5 py-0.5 bg-green-50 text-green-800 rounded">
                {keyword}
              </span>
            ))}
          </div>
          
          <div className="text-gray-500 mt-2 text-2xs">
            This badge appears when 3+ women guests rate the listing 4+ stars and mention safety or cleanliness.
          </div>
          
          {/* Tooltip triangle */}
          <div className="absolute w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45 -bottom-2 left-5"></div>
        </div>
      )}
    </div>
  );
};

export default HealthyBadge;