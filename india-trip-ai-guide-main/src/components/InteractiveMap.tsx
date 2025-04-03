import React, { useState, useEffect, useRef } from 'react';
import { cities, getCityById } from '@/data/cities';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MapPin, Filter, X, Calendar, Compass, Luggage, Cloud, Sun, CloudRain, Thermometer, Bus, Train, Car, Info, Share2, Check } from 'lucide-react';

// Approximate coordinates for major Indian cities
const cityCoordinates: Record<string, [number, number]> = {
  "delhi": [28.6, 77.2],
  "jaipur": [26.9, 75.8],
  "mumbai": [19.1, 72.9],
  "agra": [27.2, 78.0],
  "varanasi": [25.3, 83.0],
  "goa": [15.3, 74.0],
  "udaipur": [24.6, 73.7],
  "darjeeling": [27.0, 88.3],
  "shimla": [31.1, 77.2],
  "rishikesh": [30.1, 78.3],
  "amritsar": [31.6, 74.9],
  "kochi": [9.9, 76.3],
  "bangalore": [12.9, 77.6],
  "kolkata": [22.6, 88.4],
  "jaisalmer": [26.9, 70.9],
  "leh-ladakh": [34.2, 77.6]
};

// India map boundaries (approximate)
const indiaBounds = {
  north: 37.0, // Northern tip
  south: 8.0,  // Southern tip
  west: 68.0,  // Western border
  east: 97.0   // Eastern border
};

const categoryColors: Record<string, string> = {
  "historical": "#FF5722",
  "cultural": "#673AB7",
  "spiritual": "#FFC107",
  "beach": "#03A9F4",
  "hill station": "#4CAF50",
  "adventure": "#E91E63",
  "wildlife": "#795548"
};

interface InteractiveMapProps {
  onCitySelect?: (cityId: string) => void;
}

// Get packing suggestions based on city categories and best time to visit
const getPackingSuggestions = (city: any) => {
  const suggestions: string[] = [
    "Comfortable walking shoes",
    "Sunscreen and sunglasses",
    "Reusable water bottle",
  ];
  
  // Add suggestions based on categories
  if (city.categories.includes("beach")) {
    suggestions.push("Swimwear", "Beach towel", "Flip-flops");
  }
  
  if (city.categories.includes("hill station")) {
    suggestions.push("Light jacket/sweater", "Rain jacket", "Hiking shoes");
  }
  
  if (city.categories.includes("spiritual")) {
    suggestions.push("Modest clothing for temples", "Head covering", "Slip-on shoes");
  }
  
  if (city.categories.includes("adventure")) {
    suggestions.push("Sturdy footwear", "Quick-dry clothing", "First aid kit");
  }
  
  // Season-specific suggestions
  if (city.bestTimeToVisit.toLowerCase().includes("october") || 
      city.bestTimeToVisit.toLowerCase().includes("november") || 
      city.bestTimeToVisit.toLowerCase().includes("december") || 
      city.bestTimeToVisit.toLowerCase().includes("january") || 
      city.bestTimeToVisit.toLowerCase().includes("february") || 
      city.bestTimeToVisit.toLowerCase().includes("march")) {
    suggestions.push("Light layers for cooler evenings");
  }
  
  if (city.bestTimeToVisit.toLowerCase().includes("april") || 
      city.bestTimeToVisit.toLowerCase().includes("may") || 
      city.bestTimeToVisit.toLowerCase().includes("june")) {
    suggestions.push("Light, breathable clothing", "Hat for sun protection", "Electrolyte packets");
  }
  
  if (city.bestTimeToVisit.toLowerCase().includes("july") || 
      city.bestTimeToVisit.toLowerCase().includes("august") || 
      city.bestTimeToVisit.toLowerCase().includes("september")) {
    suggestions.push("Umbrella or rain jacket", "Waterproof bag cover", "Quick-dry clothing");
  }
  
  // Return unique suggestions (no duplicates)
  return [...new Set(suggestions)];
};

// Get weather indicators based on best time to visit
const getWeatherInfo = (city: any) => {
  const bestTime = city.bestTimeToVisit.toLowerCase();
  
  // Default values
  let icon = <Sun className="text-amber-500" />;
  let temp = "Moderate";
  let humidity = "Moderate";
  let rainfall = "Low";
  
  // Winter months (October to March)
  if (bestTime.includes("october") || 
      bestTime.includes("november") || 
      bestTime.includes("december") || 
      bestTime.includes("january") || 
      bestTime.includes("february") || 
      bestTime.includes("march")) {
    
    icon = <Sun className="text-amber-500" />;
    temp = "Mild to Cool";
    humidity = "Low";
    rainfall = "Very Low";
    
    // Hill stations have different winter weather
    if (city.categories.includes("hill station")) {
      icon = <Cloud className="text-slate-500" />;
      temp = "Cold";
      humidity = "Low";
      rainfall = "Possible Snow";
    }
  }
  
  // Summer months (April to June)
  if (bestTime.includes("april") || 
      bestTime.includes("may") || 
      bestTime.includes("june")) {
    
    icon = <Thermometer className="text-red-600" />;
    temp = "Hot to Very Hot";
    humidity = "Moderate";
    rainfall = "Very Low";
    
    // Hill stations have milder summers
    if (city.categories.includes("hill station")) {
      icon = <Sun className="text-amber-500" />;
      temp = "Pleasant";
      humidity = "Moderate";
      rainfall = "Low";
    }
    
    // Beach destinations are humid
    if (city.categories.includes("beach")) {
      humidity = "High";
    }
  }
  
  // Monsoon months (July to September)
  if (bestTime.includes("july") || 
      bestTime.includes("august") || 
      bestTime.includes("september")) {
    
    icon = <CloudRain className="text-blue-600" />;
    temp = "Warm";
    humidity = "High";
    rainfall = "High";
  }
  
  return { icon, temp, humidity, rainfall };
};

// Get local transport information based on city
const getLocalTransport = (city: any) => {
  const transport = [];
  
  // Most cities have these transportation options
  const commonTransport = [
    { name: "Auto Rickshaw", icon: <Car size={14} className="mr-2" />, description: "Affordable for short distances" },
    { name: "Taxi", icon: <Car size={14} className="mr-2" />, description: "Convenient but pricier" },
  ];
  
  // Add common transport options to all cities
  transport.push(...commonTransport);
  
  // Metro cities
  if (["delhi", "mumbai", "bangalore", "kolkata"].includes(city.id)) {
    transport.push({ 
      name: "Metro", 
      icon: <Train size={14} className="mr-2" />, 
      description: "Fast and efficient way to travel across the city" 
    });
  }
  
  // Cities with good local train networks
  if (["mumbai", "kolkata"].includes(city.id)) {
    transport.push({ 
      name: "Local Trains", 
      icon: <Train size={14} className="mr-2" />, 
      description: "Economical but can be crowded" 
    });
  }
  
  // Cities with good bus networks
  if (["delhi", "mumbai", "bangalore", "kolkata", "jaipur"].includes(city.id)) {
    transport.push({ 
      name: "City Bus", 
      icon: <Bus size={14} className="mr-2" />, 
      description: "Covers most areas, economical option" 
    });
  }
  
  // Hill stations and some special areas
  if (["darjeeling", "shimla"].includes(city.id)) {
    transport.push({ 
      name: "Toy Train", 
      icon: <Train size={14} className="mr-2" />, 
      description: "Historic narrow-gauge railway, tourist attraction" 
    });
  }
  
  // Beach areas
  if (["goa"].includes(city.id)) {
    transport.push({ 
      name: "Scooter/Bike Rental", 
      icon: <span className="mr-2">🛵</span>, 
      description: "Popular and convenient way to explore" 
    });
  }
  
  // Boat areas
  if (["kochi", "varanasi"].includes(city.id)) {
    transport.push({ 
      name: "Ferry/Boat", 
      icon: <span className="mr-2">⛵</span>, 
      description: "Scenic way to cross waterways" 
    });
  }
  
  return transport;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onCitySelect }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Record<string, google.maps.Marker>>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  
  // Get all unique categories
  const allCategories = Array.from(
    new Set(cities.flatMap(city => city.categories))
  ).sort();
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Filter cities based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredCities(cities);
    } else {
      setFilteredCities(
        cities.filter(city => 
          city.categories.some(category => selectedCategories.includes(category))
        )
      );
    }
  }, [selectedCategories]);

  // Initialize Google Map
  useEffect(() => {
    if (!mapRef.current) return;
    
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 22.0, lng: 82.0 }, // Center of India
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      mapId: "8d193001f940fde3", // Use custom map ID
      styles: [
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#c9b2a6" }]
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#4d90fe" }, { weight: 2 }]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#b9d6f2" }]
        },
        {
          featureType: "landscape",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          featureType: "poi.park",
          stylers: [{ color: "#cadeaa" }]
        },
        {
          // Hide all labels to minimize visibility of watermark
          elementType: "labels.text",
          stylers: [{ visibility: "off" }]
        }
      ],
      restriction: {
        latLngBounds: indiaBounds,
        strictBounds: false
      }
    };
    
    const map = new google.maps.Map(mapRef.current, mapOptions);
    googleMapRef.current = map;
    infoWindowRef.current = new google.maps.InfoWindow();
    
    // Add markers when map is ready
    createMarkers();
    
    return () => {
      // Clean up markers
      Object.values(markersRef.current).forEach(marker => marker.setMap(null));
      markersRef.current = {};
    };
  }, []);
  
  // Create or update markers when filtered cities change
  useEffect(() => {
    if (!googleMapRef.current) return;
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.setMap(null));
    markersRef.current = {};
    
    // Create new markers for filtered cities
    createMarkers();
  }, [filteredCities]);
  
  // Create markers for filtered cities
  const createMarkers = () => {
    if (!googleMapRef.current) return;
    
    filteredCities.forEach(city => {
      if (!cityCoordinates[city.id]) return;
      
      const [lat, lng] = cityCoordinates[city.id];
      const primaryCategory = city.categories[0];
      const pinColor = categoryColors[primaryCategory] || "#333333";
      
      // Create custom marker icon
      const svgMarker = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: pinColor,
        fillOpacity: 0.7,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
        scale: 10
      };
      
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: googleMapRef.current,
        title: city.name,
        icon: svgMarker,
        animation: google.maps.Animation.DROP
      });
      
      // Add marker to ref for tracking
      markersRef.current[city.id] = marker;
      
      // Add event listeners
      marker.addListener("click", () => handleCityClick(city.id));
      marker.addListener("mouseover", () => {
        setHoveredCity(city.id);
        showInfoWindow(city, marker);
      });
      marker.addListener("mouseout", () => {
        setHoveredCity(null);
        if (infoWindowRef.current) infoWindowRef.current.close();
      });
    });
  };
  
  // Show info window when hovering over marker
  const showInfoWindow = (city: any, marker: google.maps.Marker) => {
    if (!infoWindowRef.current) return;
    
    const primaryCategory = city.categories[0];
    const pinColor = categoryColors[primaryCategory] || "#333333";
    
    const contentString = `
      <div style="max-width: 200px; padding: 8px;">
        <h3 style="margin: 0 0 5px; font-size: 16px; color: #333;">${city.name}</h3>
        <p style="margin: 0 0 5px; font-size: 12px; color: #666;">${city.state}</p>
        <div style="display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 5px;">
          ${city.categories.slice(0, 3).map(category => 
            `<span style="font-size: 10px; padding: 2px 6px; border-radius: 10px; background-color: ${categoryColors[category]}20; color: ${categoryColors[category]}">
              ${category.replace('-', ' ')}
            </span>`
          ).join('')}
        </div>
        <p style="margin: 0; font-size: 11px;">Best time: ${city.bestTimeToVisit}</p>
        <div style="font-size: 10px; text-align: center; padding-top: 5px; color: #777;">
          Click for more details
        </div>
      </div>
    `;
    
    infoWindowRef.current.setContent(contentString);
    infoWindowRef.current.open({
      anchor: marker,
      map: googleMapRef.current
    });
  };
  
  // Handle city click
  const handleCityClick = (cityId: string) => {
    setSelectedCity(cityId);
    
    // Center map on selected city
    if (googleMapRef.current && cityCoordinates[cityId]) {
      const [lat, lng] = cityCoordinates[cityId];
      googleMapRef.current.panTo({ lat, lng });
      googleMapRef.current.setZoom(7);
    }
    
    if (onCitySelect) {
      onCitySelect(cityId);
    }
  };
  
  // Get the selected city data
  const cityData = selectedCity ? getCityById(selectedCity) : null;
  
  // Handle share button click
  const handleShareCity = (cityId: string) => {
    const city = getCityById(cityId);
    if (!city) return;
    
    // Create a shareable text
    const shareText = `Check out ${city.name}, ${city.state} in India! ${city.description}

Best time to visit: ${city.bestTimeToVisit}
Top attractions: ${city.highlights.slice(0, 3).join(', ')}

Discover more at: ${window.location.origin}/city/${city.id}`;
    
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: `Discover ${city.name} - India Travel Guide`,
        text: shareText,
        url: `${window.location.origin}/city/${city.id}`,
      })
      .catch((error) => {
        console.log('Error sharing:', error);
        // Fall back to clipboard if sharing fails
        copyToClipboard(shareText);
      });
    } else {
      // Fall back to clipboard for browsers that don't support Web Share API
      copyToClipboard(shareText);
    }
  };
  
  // Helper function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };
  
  return (
    <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-xl p-6 border border-white/40 w-full max-w-6xl mx-auto mb-16">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-india-saffron to-india-green">
          Explore India's Top Destinations
        </h2>
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      {showFilters && (
        <div className="mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-md border border-gray-200">
          <h3 className="text-lg font-medium mb-3">Filter by Experience</h3>
          <div className="flex flex-wrap gap-3">
            {allCategories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                  className={`border-${categoryColors[category]}`}
                />
                <label 
                  htmlFor={`category-${category}`} 
                  className="text-sm font-medium text-gray-800 capitalize flex items-center"
                >
                  <span className={`w-3 h-3 mr-2 rounded-full`} style={{ backgroundColor: categoryColors[category] }}></span>
                  {category.replace('-', ' ')}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Google Maps Container */}
        <div className={`relative overflow-hidden rounded-lg border border-gray-200 h-[600px] ${selectedCity ? 'md:col-span-2' : 'md:col-span-3'}`}>
          <div ref={mapRef} className="w-full h-full"></div>
          
          {/* Semi-transparent overlay to hide watermark */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm p-3 rounded-md border border-gray-200 z-10">
            <div className="text-xs font-medium mb-2">Map Legend</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {Object.entries(categoryColors).map(([category, color]) => (
                <div key={category} className="flex items-center text-xs">
                  <span className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: color }}></span>
                  <span className="capitalize">{category.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* City Information Panel */}
        {selectedCity && cityData && (
          <div className="relative h-[600px] bg-white/20 backdrop-blur-md rounded-lg border border-white/40 p-4 overflow-auto">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2"
              onClick={() => setSelectedCity(null)}
            >
              <X size={18} />
            </Button>
            
            <div className="flex flex-col items-start">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{cityData.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <MapPin size={14} className="mr-1" />
                <span>{cityData.state}</span>
              </div>
            </div>
            
            <div className="h-48 w-full rounded-lg overflow-hidden mb-4">
              <img 
                src={cityData.image} 
                alt={cityData.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-gray-700 mb-4 text-sm">{cityData.description}</p>
            
            <div className="flex items-center mb-3">
              <Calendar size={16} className="text-india-saffron mr-2" />
              <span className="text-sm font-medium">Best Time to Visit:</span>
              <span className="ml-2 text-sm">{cityData.bestTimeToVisit}</span>
            </div>
            
            {/* Weather Indicators */}
            <div className="w-full mb-4 p-3 bg-white/60 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Cloud size={16} className="text-india-saffron mr-2" />
                Expected Weather:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(() => {
                  const { icon, temp, humidity, rainfall } = getWeatherInfo(cityData);
                  return (
                    <>
                      <div className="flex flex-col items-center justify-center p-2 bg-white/50 rounded-md">
                        <div className="mb-1">{icon}</div>
                        <span className="text-xs text-center">Condition</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-white/50 rounded-md">
                        <span className="font-medium text-sm mb-1">{temp}</span>
                        <span className="text-xs text-center">Temperature</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-white/50 rounded-md">
                        <span className="font-medium text-sm mb-1">{humidity}</span>
                        <span className="text-xs text-center">Humidity</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-white/50 rounded-md">
                        <span className="font-medium text-sm mb-1">{rainfall}</span>
                        <span className="text-xs text-center">Rainfall</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
            
            {/* Key Highlights Section */}
            <div className="mb-4 w-full">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Compass size={16} className="text-india-saffron mr-2" />
                Key Highlights:
              </h4>
              <ul className="grid grid-cols-1 gap-1">
                {cityData.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-india-saffron rounded-full mr-2"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4 w-full">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Luggage size={16} className="text-india-saffron mr-2" />
                What to Pack:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                {getPackingSuggestions(cityData).map((item, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-india-saffron rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Local Transport */}
            <div className="mb-4 w-full">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Bus size={16} className="text-india-saffron mr-2" />
                Getting Around:
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {getLocalTransport(cityData).map((transport, index) => (
                  <div key={index} className="flex items-start bg-white/50 p-2 rounded-md">
                    <div className="flex items-center">
                      {transport.icon}
                      <span className="font-medium text-sm">{transport.name}:</span>
                    </div>
                    <span className="text-xs ml-2">{transport.description}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-auto w-full">
              <h4 className="text-sm font-medium mb-2">Experiences:</h4>
              <div className="flex flex-wrap gap-2">
                {cityData.categories.map(category => (
                  <span 
                    key={category}
                    className="text-xs px-2 py-1 rounded-full capitalize"
                    style={{ 
                      backgroundColor: `${categoryColors[category]}30`,
                      color: categoryColors[category] 
                    }}
                  >
                    {category.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex w-full gap-2 mt-4">
              <Button 
                className="flex-1 bg-india-saffron/85 hover:bg-india-saffron text-white"
                onClick={() => {
                  // This could link to the city detail page in the future
                  if (onCitySelect) onCitySelect(cityData.id);
                }}
              >
                Explore {cityData.name}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="bg-white hover:bg-gray-100 border-gray-200"
                onClick={() => handleShareCity(cityData.id)}
                title="Share this destination"
              >
                {copySuccess ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
              </Button>
            </div>
            
            {copySuccess && (
              <div className="w-full mt-2 text-center">
                <span className="text-xs text-green-600">Information copied to clipboard!</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-center text-gray-600">
        Interactive map of India's top tourist destinations. Click on a city marker to learn more.
      </div>
    </div>
  );
};

export default InteractiveMap; 