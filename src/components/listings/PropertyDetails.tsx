import React, { useState } from 'react';
import { Star, Share, Heart, MapPin, Users, Bed, Bath, Home, CalendarDays, ChevronRight } from 'lucide-react';
import { Property } from '../../types';
import HealthyBadge from '../features/HealthyTag/HealthyBadge';
import TryWithConfidenceBadge from '../features/TryWithConfidence/TryWithConfidenceBadge';
import HostVideoPlayer from '../features/HostVideo/HostVideoPlayer';
import FeatureBoostBadge from '../features/BoostFeature/FeatureBoostBadge';

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const [isSaved, setIsSaved] = useState(property.isSaved);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(property.price * 80); // Converting to approximate INR
  
  return (
    <div className="bg-white">
      {/* Property title section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{property.title}</h1>
        
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center text-sm space-x-3">
            <div className="flex items-center">
              <Star size={16} className="text-gray-800 fill-gray-800 mr-1" />
              {property.isFeatureBoost ? (
                <span className="font-medium">-</span>
              ) : (
                <>
                  <span className="font-medium">{property.rating}</span>
                  <span className="mx-1">•</span>
                  <span className="text-gray-600 underline">{Math.min(Math.floor(Math.random() * 3) + 1, property.reviews)} ratings</span>
                </>
              )}
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="text-gray-700 mr-1" />
              <span className="text-gray-700">{property.location}</span>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-2 sm:mt-0">
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
              <Share size={16} className="mr-1" />
              <span>Share</span>
            </button>
            <button 
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart size={16} className={`mr-1 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust badges (if applicable) */}
      {(property.healthyMarkedByWomen || property.tryWithConfidence || property.isFeatureBoost) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {property.healthyMarkedByWomen && property.healthyMarkedByWomen >= 3 && (
            <HealthyBadge count={property.healthyMarkedByWomen} large />
          )}
          
          {property.tryWithConfidence && (
            <TryWithConfidenceBadge large />
          )}
          
          {property.isFeatureBoost && (
            <FeatureBoostBadge large />
          )}
        </div>
      )}
      
      {/* Property images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden mb-8">
        <div className="aspect-[4/3] md:aspect-square">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:grid grid-cols-2 gap-2">
          <div className="aspect-square">
            <img 
              src={property.images[1]} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square">
            <img 
              src={property.images[2]} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column: Property details */}
        <div className="lg:col-span-2">
          {/* Host info */}
          <div className="flex justify-between items-center pb-6 border-b">
            <div>
              <h2 className="text-xl font-semibold">
                Hosted by {property.host.name}
              </h2>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <Users size={16} className="mr-1" />
                <span>{property.maxGuests} guests</span>
                <span className="mx-1">•</span>
                <Bed size={16} className="mr-1" />
                <span>{property.beds} beds</span>
                <span className="mx-1">•</span>
                <Bath size={16} className="mr-1" />
                <span>{property.bathrooms} baths</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow">
                <img 
                  src={property.host.image} 
                  alt={property.host.name}
                  className="w-full h-full object-cover" 
                />
                {property.host.isSuperhost && (
                  <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
                    <Star size={10} className="fill-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Property description */}
          <div className="py-6 border-b">
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>
          
          {/* Host video (if available) */}
          {property.hostVideo && (
            <div className="py-6 border-b">
              <h2 className="text-lg font-semibold mb-3">Get to Know the Property and the Host</h2>
              <div className="max-w-md">
                <HostVideoPlayer hostVideo={property.hostVideo} />
              </div>
            </div>
          )}
          
          {/* Amenities */}
          <div className="py-6 border-b">
            <h2 className="text-lg font-semibold mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center py-1">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 text-xs">•</span>
                  </div>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 px-6 py-2 border border-gray-800 rounded-lg text-gray-800 font-medium text-sm hover:bg-gray-50">
              Show all amenities
            </button>
          </div>
          
          {/* Try with confidence details (if applicable) */}
          {property.tryWithConfidence && (
            <div className="py-6 border-b bg-blue-50 rounded-lg px-4 my-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                  <Shield size={24} className="text-blue-700" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-blue-900 mb-2">Try With Confidence Program</h2>
                  <p className="text-blue-800 mb-3">
                    This is a newer listing with fewer reviews, but it meets our quality standards and comes with these guarantees:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-blue-700">
                      <CheckCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                      <span>100% refund if you're not satisfied</span>
                    </li>
                    <li className="flex items-start text-blue-700">
                      <CheckCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                      <span>Free cancellation up to check-in time</span>
                    </li>
                    <li className="flex items-start text-blue-700">
                      <CheckCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                      <span>Priority 24/7 customer support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right column: Booking widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 border border-gray-200 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xl font-semibold">{formattedPrice}</span>
                <span className="text-gray-600"> night</span>
              </div>
              <div className="flex items-center text-sm">
                <Star size={14} className="text-gray-800 fill-gray-800 mr-1" />
                {property.isFeatureBoost ? (
                  <span>-</span>
                ) : (
                  <>
                    <span>{property.rating}</span>
                    <span className="mx-1">•</span>
                    <span className="text-gray-600 underline">{Math.min(Math.floor(Math.random() * 3) + 1, property.reviews)} ratings</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Date picker */}
            <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
              <div className="grid grid-cols-2 divide-x divide-gray-300">
                <div className="p-3">
                  <div className="text-xs font-medium uppercase text-gray-500">CHECK-IN</div>
                  <div className="mt-1">Add date</div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-medium uppercase text-gray-500">CHECKOUT</div>
                  <div className="mt-1">Add date</div>
                </div>
              </div>
              <div className="border-t border-gray-300 p-3">
                <div className="text-xs font-medium uppercase text-gray-500">GUESTS</div>
                <div className="mt-1 flex justify-between items-center">
                  <div>1 guest</div>
                  <ChevronRight size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
            
            {/* Reserve button */}
            <button className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
              Reserve
            </button>
            
            {/* Price breakdown */}
            <div className="mt-4">
              <div className="flex justify-between py-2">
                <div className="underline">{formattedPrice} x 5 nights</div>
                <div>{new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0
                }).format(property.price * 80 * 5)}</div>
              </div>
              <div className="flex justify-between py-2">
                <div className="underline">Cleaning fee</div>
                <div>₹1,500</div>
              </div>
              <div className="flex justify-between py-2">
                <div className="underline">Airbnb service fee</div>
                <div>₹2,000</div>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-300 mt-4 font-semibold">
                <div>Total before taxes</div>
                <div>{new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0
                }).format(property.price * 80 * 5 + 1500 + 2000)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Need to define this as it's used inside the component but not imported
const Shield = (props: any) => <div {...props} />;
const CheckCircle = (props: any) => <div {...props} />;

export default PropertyDetails;