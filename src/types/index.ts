export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  host: {
    name: string;
    image: string;
    isSuperhost: boolean;
  };
  amenities: string[];
  type: string;
  beds: number;
  bathrooms: number;
  maxGuests: number;
  isSaved: boolean;
  
  // New features
  hostVideo?: HostVideo;
  healthyMarkedByWomen?: number;
  tryWithConfidence?: boolean;
  boostEligible?: boolean;
  isFirstTimeFriendly?: boolean;
  isFeatureBoost?: boolean;
}

export interface HostVideo {
  url: string;
  caption: string;
  keywords: string[];
  hostTraits?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface FilterOption {
  id: string;
  name: string;
  isSelected: boolean;
}

export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export interface SearchFilters {
  location: string;
  dateRange: DateRange;
  guests: number;
  propertyType: string[];
  priceRange: [number, number];
  amenities: string[];
  isFirstTimeFriendly: boolean;
}