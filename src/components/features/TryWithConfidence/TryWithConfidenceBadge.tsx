import React, { useState } from 'react';
import { Shield, Info, MessageCircle } from 'lucide-react';

interface TryWithConfidenceBadgeProps {
  large?: boolean;
}

const TryWithConfidenceBadge: React.FC<TryWithConfidenceBadgeProps> = ({ large = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <div className="relative inline-flex">
      <div 
        className={`inline-flex items-center rounded-full bg-blue-50 border border-blue-100 text-blue-800
          cursor-pointer hover:bg-blue-100 transition-colors
          ${large ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Shield size={large ? 18 : 14} className="mr-1.5 text-blue-600" />
        <span className="font-medium">Try With Confidence</span>
        <Info size={large ? 14 : 12} className="ml-1.5 text-blue-600/70" />
      </div>
      
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 w-72 p-3 bg-white shadow-lg rounded-lg border border-gray-200 z-50 text-xs">
          <div className="font-medium text-gray-900 mb-2">Peace of Mind Guarantee</div>
          
          <ul className="text-gray-600 space-y-2 mb-3">
            <li className="flex items-start">
              <span className="text-blue-600 inline-block mr-1.5">✓</span>
              <span>Full refund before check-in if you have safety/quality concerns</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 inline-block mr-1.5">✓</span>
              <span>Quick relocation support with curated alternative stays</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 inline-block mr-1.5">✓</span>
              <span>Priority 24/7 customer support via chat or WhatsApp</span>
            </li>
          </ul>
          
          <button
            onClick={() => setShowSupportModal(true)}
            className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle size={14} />
            <span>Need Help?</span>
          </button>
          
          <div className="text-gray-500 mt-2 text-2xs">
            Available for eligible new listings with host videos and quality verification.
          </div>
          
          {/* Tooltip triangle */}
          <div className="absolute w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45 -bottom-2 left-5"></div>
        </div>
      )}
      
      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">How can we help?</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium">Report a safety/quality concern</div>
                <div className="text-sm text-gray-500">Get a full refund before check-in</div>
              </button>
              
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium">Find alternative nearby stays</div>
                <div className="text-sm text-gray-500">We'll help you relocate quickly</div>
              </button>
              
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium">Talk to 24/7 Support</div>
                <div className="text-sm text-gray-500">Connect with priority customer service</div>
              </button>
            </div>
            
            <button 
              onClick={() => setShowSupportModal(false)}
              className="w-full mt-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryWithConfidenceBadge;