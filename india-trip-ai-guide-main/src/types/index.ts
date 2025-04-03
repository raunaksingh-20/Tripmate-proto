
export interface City {
  id: string;
  name: string;
  state: string;
  description: string;
  image: string;
  bestTimeToVisit: string;
  highlights: string[];
  categories: ("historical" | "spiritual" | "adventure" | "beach" | "hill station" | "wildlife" | "cultural")[];
}

export interface UserPreferences {
  budget: "budget" | "mid-range" | "luxury";
  interests: string[];
  dietaryRestrictions: string[];
  accessibilityNeeds: string[];
  travelStyle: "slow" | "fast" | "balanced";
}

export interface Attraction {
  id: string;
  cityId: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  timeNeeded: number; // In hours
  openingHours: string;
  location: string;
}

export interface Transportation {
  type: "flight" | "train" | "bus" | "taxi" | "auto" | "metro";
  from: string;
  to: string;
  duration: number; // In minutes
  price: number;
  frequency: string;
  provider: string;
}
