import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Map, Compass } from 'lucide-react';

const RecommendationEngine: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: "mid-range",
    interests: [],
    dietaryRestrictions: [],
    accessibilityNeeds: [],
    travelStyle: "balanced"
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const interestOptions = [
    "Historical Sites", "Religious Places", "Food & Cuisine", 
    "Adventure", "Nature", "Shopping", "Arts & Culture",
    "Architecture", "Wildlife", "Beaches", "Nightlife"
  ];
  
  const dietaryOptions = [
    "Vegetarian", "Vegan", "Halal", "Gluten-Free", 
    "Lactose-Free", "Nut Allergy"
  ];
  
  const accessibilityOptions = [
    "Wheelchair Access", "Limited Mobility", 
    "Vision Impairment", "Hearing Impairment"
  ];
  
  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => {
      if (prev.interests.includes(interest)) {
        return {
          ...prev,
          interests: prev.interests.filter(i => i !== interest)
        };
      } else {
        return {
          ...prev,
          interests: [...prev.interests, interest]
        };
      }
    });
  };
  
  const handleDietaryToggle = (option: string) => {
    setPreferences(prev => {
      if (prev.dietaryRestrictions.includes(option)) {
        return {
          ...prev,
          dietaryRestrictions: prev.dietaryRestrictions.filter(i => i !== option)
        };
      } else {
        return {
          ...prev,
          dietaryRestrictions: [...prev.dietaryRestrictions, option]
        };
      }
    });
  };
  
  const handleAccessibilityToggle = (option: string) => {
    setPreferences(prev => {
      if (prev.accessibilityNeeds.includes(option)) {
        return {
          ...prev,
          accessibilityNeeds: prev.accessibilityNeeds.filter(i => i !== option)
        };
      } else {
        return {
          ...prev,
          accessibilityNeeds: [...prev.accessibilityNeeds, option]
        };
      }
    });
  };

  const handleRedirectToRecommendationApp = () => {
    window.open('https://tour-recommendation-model-57axfvngzrjczksjq59eeo.streamlit.app/', '_blank');
  };
  
  return (
    <section id="recommendation-engine" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="bg-india-saffron/10 text-india-saffron rounded-full px-3 py-1 text-sm font-medium">
              AI-Powered Trip Planning
            </span>
          </div>
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-india-saffron mr-2" />
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-india-saffron to-india-green">
              Yatra Guru
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your intelligent companion for discovering the perfect Indian adventure. Our advanced AI analyzes your preferences 
            to create personalized itineraries tailored to your unique travel style.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Compass className="h-5 w-5 text-india-saffron mr-2" />
                <h3 className="font-medium">Personalized Journeys</h3>
              </div>
              <p className="text-sm text-gray-500">Custom itineraries based on your interests, budget, and travel style</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Map className="h-5 w-5 text-india-saffron mr-2" />
                <h3 className="font-medium">Hidden Gems</h3>
              </div>
              <p className="text-sm text-gray-500">Discover off-the-beaten-path destinations that match your preferences</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 text-india-saffron mr-2" />
                <h3 className="font-medium">Smart Planning</h3>
              </div>
              <p className="text-sm text-gray-500">Optimized routes and schedules to make the most of your time in India</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="mt-8 bg-india-saffron hover:bg-india-saffron/90"
          >
            {isFormOpen ? "Hide Preferences" : "Create My Perfect Trip"}
          </Button>
        </div>
        
        {isFormOpen && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto animate-fade-in border border-india-saffron/20">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
              Your Travel Preferences
            </h3>
            
            <div className="space-y-8">
              {/* Budget Section */}
              <div>
                <h4 className="text-lg font-medium mb-4">Budget Level</h4>
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between">
                    <span>Budget</span>
                    <span>Mid-Range</span>
                    <span>Luxury</span>
                  </div>
                  <Slider
                    defaultValue={[1]}
                    max={2}
                    step={1}
                    onValueChange={(values) => {
                      const budgetMap = ["budget", "mid-range", "luxury"];
                      setPreferences(prev => ({
                        ...prev,
                        budget: budgetMap[values[0]] as any
                      }));
                    }}
                  />
                </div>
              </div>
              
              {/* Travel Style Section */}
              <div>
                <h4 className="text-lg font-medium mb-4">Travel Style</h4>
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between">
                    <span>Relaxed, few attractions</span>
                    <span>Balanced</span>
                    <span>Fast-paced, many attractions</span>
                  </div>
                  <Slider
                    defaultValue={[1]}
                    max={2}
                    step={1}
                    onValueChange={(values) => {
                      const styleMap = ["slow", "balanced", "fast"];
                      setPreferences(prev => ({
                        ...prev,
                        travelStyle: styleMap[values[0]] as any
                      }));
                    }}
                  />
                </div>
              </div>
              
              {/* Interests Section */}
              <div>
                <h4 className="text-lg font-medium mb-4">Your Interests</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`interest-${interest}`}
                        checked={preferences.interests.includes(interest)}
                        onCheckedChange={() => handleInterestToggle(interest)}
                      />
                      <label 
                        htmlFor={`interest-${interest}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Dietary Restrictions */}
              <div>
                <h4 className="text-lg font-medium mb-4">Dietary Restrictions</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`diet-${option}`}
                        checked={preferences.dietaryRestrictions.includes(option)}
                        onCheckedChange={() => handleDietaryToggle(option)}
                      />
                      <label 
                        htmlFor={`diet-${option}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Accessibility Needs */}
              <div>
                <h4 className="text-lg font-medium mb-4">Accessibility Needs</h4>
                <div className="grid grid-cols-2 gap-3">
                  {accessibilityOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`access-${option}`}
                        checked={preferences.accessibilityNeeds.includes(option)}
                        onCheckedChange={() => handleAccessibilityToggle(option)}
                      />
                      <label 
                        htmlFor={`access-${option}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={handleRedirectToRecommendationApp}
                  className="bg-india-saffron hover:bg-india-saffron/90 text-white px-6 py-2 rounded-md flex items-center space-x-2"
                >
                  <span>Launch Yatra Guru</span>
                  <Sparkles className="h-4 w-4" />
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  This will open our AI-powered trip planner in a new window
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendationEngine;
