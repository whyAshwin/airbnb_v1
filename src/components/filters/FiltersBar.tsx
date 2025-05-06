import React from 'react';
import { categories } from '../../data/mockData';
import { Sliders } from 'lucide-react';

interface FiltersBarProps {
  selectedCategory: string | null;
  onCategorySelect: (id: string | null) => void;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="border-b sticky top-[80px] bg-white z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Scrollable categories */}
          <div className="flex-1 flex items-center space-x-8 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(selectedCategory === category.id ? null : category.id)}
                className={`flex flex-col items-center min-w-[56px] group ${
                  selectedCategory === category.id 
                    ? 'text-black border-b-2 border-black pb-2' 
                    : 'text-gray-500 hover:text-black hover:border-b-2 hover:border-gray-200 pb-2'
                }`}
              >
                <span className="text-2xl mb-1">{getCategoryIcon(category.icon)}</span>
                <span className="text-xs whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Right side filters */}
          <div className="flex items-center gap-4 ml-4 flex-shrink-0">
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300">
              <Sliders size={16} />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getCategoryIcon = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    'umbrella': '☂️',
    'mountain': '⛰️',
    'tree': '🌳',
    'building': '🏙️',
    'droplets': '💧',
    'snowflake': '❄️',
    'palmtree': '🌴',
    'home': '🏡',
    'diamond': '💎',
    'palette': '🎨'
  };
  
  return iconMap[iconName] || '🏠';
};

export default FiltersBar;