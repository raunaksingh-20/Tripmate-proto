import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CityDetail from '@/components/CityDetail';
import { getCityById } from '../data/cities';
import { City } from '../types';

const CityPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (id) {
      const cityData = getCityById(id);
      if (cityData) {
        setCity(cityData);
      } else {
        // City not found, redirect to home
        navigate('/');
      }
    }
    setLoading(false);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-india-saffron border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading city information...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!city) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">City Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the city you're looking for.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-india-saffron text-white rounded-md hover:bg-india-saffron/90 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <CityDetail city={city} />
      
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
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Explore Cities</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About India</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Travel Tips</a></li>
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

export default CityPage;
