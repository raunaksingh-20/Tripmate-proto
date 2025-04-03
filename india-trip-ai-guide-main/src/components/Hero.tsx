import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Map, Compass } from 'lucide-react';

const Hero: React.FC = () => {
  const handleRedirectToRecommendationApp = () => {
    window.open('https://tour-recommendation-model-57axfvngzrjczksjq59eeo.streamlit.app/', '_blank');
  };

  return (
    <div className="relative h-auto min-h-[600px] sm:h-[700px] md:h-[800px] w-full overflow-hidden mandala-pattern py-8 sm:py-12 md:py-16">
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white py-6 sm:py-8 md:py-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 animate-fade-up">
          Discover <span className="text-india-gold">India</span>, Your Way
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-6 sm:mb-8 md:mb-10 animate-fade-up" style={{ animationDelay: "200ms" }}>
          Personalized travel recommendations powered by AI to help you explore India's most breathtaking destinations
        </p>
        
        {/* Yatra Guru Box */}
        <div className="w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-lg shadow-xl p-4 sm:p-6 md:p-8 animate-fade-up border border-white/40" style={{ animationDelay: "400ms" }}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4">
              <span className="bg-india-saffron/15 text-india-saffron rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium backdrop-blur-sm border border-india-saffron/25">
                AI-Powered Trip Planning
              </span>
            </div>
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-india-saffron mr-2" />
              <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-india-saffron to-india-green">
                Yatra Guru
              </h2>
            </div>
            <p className="text-gray-800 max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">
              Your intelligent companion for discovering the perfect Indian adventure. Our advanced AI analyzes your preferences 
              to create personalized itineraries tailored to your unique travel style.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              <div className="bg-white/25 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg shadow-sm border border-white/40">
                <div className="flex items-center mb-1 sm:mb-2">
                  <Compass className="h-4 w-4 sm:h-5 sm:w-5 text-india-saffron mr-1 sm:mr-2" />
                  <h3 className="font-medium text-gray-800 text-sm sm:text-base">Personalized Journeys</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-800">Custom itineraries based on your interests, budget, and travel style</p>
              </div>
              <div className="bg-white/25 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg shadow-sm border border-white/40">
                <div className="flex items-center mb-1 sm:mb-2">
                  <Map className="h-4 w-4 sm:h-5 sm:w-5 text-india-saffron mr-1 sm:mr-2" />
                  <h3 className="font-medium text-gray-800 text-sm sm:text-base">Hidden Gems</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-800">Discover off-the-beaten-path destinations that match your preferences</p>
              </div>
              <div className="bg-white/25 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg shadow-sm border border-white/40">
                <div className="flex items-center mb-1 sm:mb-2">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-india-saffron mr-1 sm:mr-2" />
                  <h3 className="font-medium text-gray-800 text-sm sm:text-base">Smart Planning</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-800">Optimized routes and schedules to make the most of your time in India</p>
              </div>
            </div>
            
            <Button 
              className="bg-india-saffron/85 hover:bg-india-saffron text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-md flex items-center justify-center mx-auto space-x-1 sm:space-x-2 text-sm sm:text-base backdrop-blur-sm shadow-md border border-india-saffron/40 mb-2" 
              onClick={handleRedirectToRecommendationApp}
            >
              <span>Create My Perfect Trip</span>
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
