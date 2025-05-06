import React, { useState, useEffect } from 'react';
import { Property } from './types';
import { properties } from './data/mockData';

// Components
import Header from './components/layout/Header';
import HomeHero from './components/home/HomeHero';
import FiltersBar from './components/filters/FiltersBar';
import PropertyCard from './components/listings/PropertyCard';
import PropertyDetails from './components/listings/PropertyDetails';

const App: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Effect to filter properties based on selected category
  useEffect(() => {
    let result = [...properties];
    
    // Apply category filter if selected
    if (selectedCategory) {
      // In a real app, we'd filter by category
      // This is a mock implementation
    }
    
    setFilteredProperties(result);
  }, [selectedCategory]);
  
  // Handle property selection
  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    window.scrollTo(0, 0);
  };
  
  // Handle property save/unsave
  const handleHeartClick = (id: string) => {
    setFilteredProperties(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isSaved: !p.isSaved } : p
      )
    );
  };
  
  // Handle back button from property details
  const handleBackToListing = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {!selectedProperty ? (
        // Home page with listings
        <>
          {/* Hero section */}
          <HomeHero />
          
          {/* Filters bar */}
          <FiltersBar 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          
          {/* Property listings */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map(property => (
                <div 
                  key={property.id}
                  onClick={() => handlePropertyClick(property)}
                  className="cursor-pointer"
                >
                  <PropertyCard 
                    property={property}
                    onHeartClick={(id) => {
                      handleHeartClick(id);
                      // Prevent the property click event from firing
                      event?.stopPropagation();
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* No results message */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-700 mb-4">No listings found</p>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        // Property details page
        <div className="container mx-auto px-4 py-24">
          {/* Back button */}
          <button 
            onClick={handleBackToListing}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to listings
          </button>
          
          <PropertyDetails property={selectedProperty} />
        </div>
      )}
    </div>
  );
};

export default App;