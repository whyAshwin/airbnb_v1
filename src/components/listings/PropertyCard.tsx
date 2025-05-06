import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Property } from '../../types';
import HealthyBadge from '../features/HealthyTag/HealthyBadge';
import TryWithConfidenceBadge from '../features/TryWithConfidence/TryWithConfidenceBadge';
import FeatureBoostBadge from '../features/BoostFeature/FeatureBoostBadge';

interface PropertyCardProps {
  property: Property;
  onHeartClick?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property,
  onHeartClick = () => {},
}) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(property.price * 80); // Converting to approximate INR
  
  return (
    <div className="group">
      {/* Image carousel */}
      <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-2">
        {/* Make it look like a carousel even though we're just showing the first image */}
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Save button */}
        <button
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
          onClick={() => onHeartClick(property.id)}
        >
          <Heart size={20} className={property.isSaved ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
        </button>
        
        {/* Feature boost badge (if eligible) */}
        {property.isFeatureBoost && (
          <div className="absolute top-3 left-3">
            <FeatureBoostBadge />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div>
        {/* First row: Title and Rating */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-base text-gray-900 line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-sm">
            <Star size={14} className="text-gray-800 fill-gray-800 mr-1" />
            {property.isFeatureBoost ? (
              <span>-</span>
            ) : (
              <span>{property.rating} ({Math.min(Math.floor(Math.random() * 3) + 1, property.reviews)})</span>
            )}
          </div>
        </div>
        
        {/* Location */}
        <p className="text-gray-500 text-sm mb-1">{property.location}</p>
        
        {/* Trust badges */}
        <div className="flex flex-wrap gap-1.5 my-2">
          {property.healthyMarkedByWomen && property.healthyMarkedByWomen >= 3 && (
            <HealthyBadge count={property.healthyMarkedByWomen} />
          )}
          
          {property.tryWithConfidence && (
            <TryWithConfidenceBadge />
          )}
        </div>
        
        {/* Price */}
        <div className="mt-2">
          <span className="font-semibold">{formattedPrice}</span>
          <span className="text-gray-600"> night</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;