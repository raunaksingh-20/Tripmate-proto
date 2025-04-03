
import React from 'react';
import { City } from '../types';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Star, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CityDetailProps {
  city: City;
}

const CityDetail: React.FC<CityDetailProps> = ({ city }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <div 
        className="h-80 lg:h-96 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${city.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent">
          <div className="container mx-auto h-full flex flex-col justify-end p-6 lg:p-12">
            <div className="flex items-center text-white/80 mb-2">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{city.state}, India</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">{city.name}</h1>
            <div className="flex items-center text-white/90 mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="mr-4">Best time to visit: {city.bestTimeToVisit}</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400/50 mr-1" />
                <span className="ml-1">4.2</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {city.categories.map((category, index) => (
                <span 
                  key={index}
                  className="text-xs px-3 py-1 rounded-full bg-white/20 text-white"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="attractions">Attractions</TabsTrigger>
                <TabsTrigger value="plan">Plan Your Visit</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold mb-4">About {city.name}</h2>
                  <p className="text-gray-700 mb-6">{city.description}</p>
                  <p className="text-gray-700">
                    {city.name} offers visitors a captivating blend of history, culture, and authentic Indian experiences. Whether you're exploring ancient monuments, sampling local cuisine, or immersing yourself in the vibrant atmosphere, this city provides a genuine taste of India's rich heritage.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {city.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-india-saffron/10 flex items-center justify-center text-india-saffron mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{highlight}</h4>
                          <p className="text-sm text-gray-600">Must-visit attraction</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Best Time to Visit</h3>
                  <p className="text-gray-700">
                    The ideal time to visit {city.name} is during {city.bestTimeToVisit} when the weather is pleasant for sightseeing and outdoor activities. This period offers comfortable temperatures and less rainfall, making it perfect for exploring the city's attractions.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="attractions" className="space-y-6">
                <div className="text-center p-8">
                  <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                  <p className="text-gray-600 mb-4">
                    We're working on adding detailed information about attractions in {city.name}.
                  </p>
                  <Button variant="outline">
                    Get Notified When Available
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="plan" className="space-y-6">
                <div className="text-center p-8">
                  <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                  <p className="text-gray-600 mb-4">
                    Our AI-powered trip planner for {city.name} will be available shortly.
                  </p>
                  <Button variant="outline">
                    Get Notified When Available
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Plan Your Trip to {city.name}</h3>
              <div className="space-y-4">
                <Button className="w-full">
                  Generate Itinerary
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full">
                  Find Accommodations
                </Button>
                <Button variant="outline" className="w-full">
                  Explore Transportation
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Weather in {city.name}</h3>
              <div className="text-center">
                <div className="text-5xl font-light mb-2">32°C</div>
                <p className="text-gray-600">Partly Cloudy</p>
                <div className="flex justify-between mt-4 text-sm">
                  <div>
                    <div className="font-medium">Min</div>
                    <div>26°C</div>
                  </div>
                  <div>
                    <div className="font-medium">Max</div>
                    <div>38°C</div>
                  </div>
                  <div>
                    <div className="font-medium">Humidity</div>
                    <div>65%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-india-saffron/10 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Travel Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-india-saffron text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Carry a water bottle and stay hydrated</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-india-saffron text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Dress modestly when visiting religious sites</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-india-saffron text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Bargain at local markets but be respectful</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-india-saffron text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Try local street food, but from hygienic vendors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetail;
