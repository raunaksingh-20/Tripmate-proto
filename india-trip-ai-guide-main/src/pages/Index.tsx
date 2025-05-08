import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PopularCities from '@/components/PopularCities';
import InteractiveMap from '@/components/InteractiveMap';
//import Chatbot from '@/components/Chatbot';

const Index: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToExploreCities = (e: React.MouseEvent) => {
    e.preventDefault();
    const exploreCitiesSection = document.getElementById('explore-cities');
    if (exploreCitiesSection) {
      exploreCitiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle city selection from the map
  const handleCitySelect = (cityId: string) => {
    // Navigate to the city page in the future, for now scroll to explore section
    const exploreCitiesSection = document.getElementById('explore-cities');
    if (exploreCitiesSection) {
      exploreCitiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 max-w-4xl mx-auto text-center">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-india-saffron to-india-green">Welcome to Tripmate</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Discover the magic of India with our AI-powered travel companion. Whether you're planning a spiritual journey 
              through ancient temples, an adventure trip in the Himalayas, a cultural exploration in vibrant cities, or a 
              relaxing beach getaway in Goa, we'll help you create the perfect itinerary tailored to your preferences and interests.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              From the snow-capped Himalayas in the north to the tropical beaches of Goa in the west, from the bustling streets 
              of Delhi to the serene backwaters of Kerala in the south, India offers a diverse range of experiences waiting to be explored. 
              Our platform combines local expertise with cutting-edge AI technology to provide recommendations that match your travel style.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With Tripmate and our Yatra Guru AI engine, navigate through India's rich tapestry of cultures, cuisines, landscapes, 
              and traditions with confidence. Whether you're a first-time visitor or returning explorer, we'll help you discover 
              hidden gems and create memories that will last a lifetime.
            </p>
          </section>
        </div>
      </div>
      
      {/* Interactive Map Section */}
      <div className="container mx-auto px-4 py-8">
        <InteractiveMap onCitySelect={handleCitySelect} />
      </div>
      
      <PopularCities />
      
      <Chatbot />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tripmate</h3>
              <p className="text-gray-400">
                Your AI-powered companion for discovering the best of India.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white" onClick={scrollToTop}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#explore-cities" className="text-gray-400 hover:text-white" onClick={scrollToExploreCities}>
                    Explore Cities
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About India
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Travel Tips</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@tripmate.com</li>
                <li>+91 1234567890</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Tripmate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
