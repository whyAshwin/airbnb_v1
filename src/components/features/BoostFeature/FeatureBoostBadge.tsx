import React, { useState } from 'react';
import { Star, Clock } from 'lucide-react';

interface FeatureBoostBadgeProps {
  large?: boolean;
}

const FeatureBoostBadge: React.FC<FeatureBoostBadgeProps> = ({ large = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-flex">
      <div 
        className={`inline-flex items-center rounded-full bg-amber-50 border border-amber-100 text-amber-800
          cursor-pointer hover:bg-amber-100 transition-colors
          ${large ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Star size={large ? 18 : 14} className="mr-1.5 text-amber-600" fill="currentColor" />
        <span className="font-medium">Featured New Stay</span>
        <Clock size={large ? 14 : 12} className="ml-1.5 text-amber-600/70" />
      </div>
      
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 w-60 p-3 bg-white shadow-lg rounded-lg border border-gray-200 z-50 text-xs">
          <div className="font-medium text-gray-900 mb-1.5">Discover New Gems</div>
          
          <div className="text-gray-600 mb-2">
            This property is being highlighted as a promising new listing because it meets our quality standards:
          </div>
          
          <ul className="text-gray-600 space-y-1.5 mb-2">
            <li className="flex items-start">
              <span className="text-amber-600 inline-block mr-1.5">•</span>
              <span>Host has uploaded an introduction video</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 inline-block mr-1.5">•</span>
              <span>Offers "Try With Confidence" guarantee</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 inline-block mr-1.5">•</span>
              <span>New listing with high potential</span>
            </li>
          </ul>
          
          <div className="text-gray-500 text-2xs">
            Featured listings rotate periodically to give promising new hosts fair visibility.
          </div>
          
          {/* Tooltip triangle */}
          <div className="absolute w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45 -bottom-2 left-5"></div>
        </div>
      )}
    </div>
  );
};

export default FeatureBoostBadge;