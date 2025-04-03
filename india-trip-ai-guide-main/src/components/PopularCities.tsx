import React, { useState } from 'react';
import CityCard from './CityCard';
import { cities, getRecommendedCities } from '../data/cities';
import { Button } from '@/components/ui/button';

const PopularCities: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("any");
  const [showAllCities, setShowAllCities] = useState<boolean>(false);
  
  const interestOptions = [
    { value: "historical", label: "Historical" },
    { value: "spiritual", label: "Spiritual" },
    { value: "adventure", label: "Adventure" },
    { value: "beach", label: "Beaches" },
    { value: "hill station", label: "Hill Stations" },
    { value: "wildlife", label: "Wildlife" },
    { value: "cultural", label: "Cultural" }
  ];
  
  const seasonOptions = [
    { value: "any", label: "Any Time" },
    { value: "winter", label: "Winter (Dec-Feb)" },
    { value: "summer", label: "Summer (Mar-Jun)" },
    { value: "monsoon", label: "Monsoon (Jul-Sep)" },
    { value: "autumn", label: "Autumn (Oct-Nov)" }
  ];
  
  const toggleInterest = (interest: string) => {
    setShowAllCities(false);
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  const handleSeasonChange = (season: string) => {
    setShowAllCities(false);
    setSelectedSeason(season);
  };
  
  const toggleShowAllCities = () => {
    setShowAllCities(!showAllCities);
  };
  
  // Get cities based on filter or show all if showAllCities is true
  const citiesToDisplay = showAllCities 
    ? cities 
    : getRecommendedCities(selectedInterests, selectedSeason);
  
  return (
    <section id="explore-cities" className="py-16 px-4 container mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Explore Popular Destinations
      </h2>
      
      <div className="mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-4 md:space-y-0">
          <div>
            <h3 className="text-lg font-medium mb-2">Find cities based on your interests:</h3>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest.value}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedInterests.includes(interest.value)
                      ? "bg-india-saffron text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => toggleInterest(interest.value)}
                >
                  {interest.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">When are you planning to visit?</h3>
            <select
              value={selectedSeason}
              onChange={(e) => handleSeasonChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-india-saffron"
            >
              {seasonOptions.map((season) => (
                <option key={season.value} value={season.value}>
                  {season.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {citiesToDisplay.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Button 
          variant="outline" 
          className="mx-auto"
          onClick={toggleShowAllCities}
        >
          {showAllCities ? "Show Recommended Destinations" : "View All Destinations"}
        </Button>
      </div>
    </section>
  );
};

export default PopularCities;
