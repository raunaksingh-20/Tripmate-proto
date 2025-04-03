
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPreferences } from '../types';

interface UserProfileProps {
  isLoggedIn?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ isLoggedIn = false }) => {
  const dummyUser = {
    name: "Guest User",
    email: "",
    preferences: {
      budget: "mid-range",
      interests: ["Historical Sites", "Food & Cuisine"],
      dietaryRestrictions: ["Vegetarian"],
      accessibilityNeeds: [],
      travelStyle: "balanced"
    } as UserPreferences
  };
  
  const getInterestsList = (interests: string[]): string => {
    if (interests.length === 0) return "Not specified";
    return interests.join(", ");
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl mx-auto">
          {dummyUser.name.charAt(0)}
        </div>
        <h3 className="text-xl font-semibold mt-3">{dummyUser.name}</h3>
        {isLoggedIn && <p className="text-gray-500">{dummyUser.email}</p>}
      </div>
      
      {!isLoggedIn ? (
        <div className="text-center space-y-3">
          <p className="text-gray-600 mb-4">
            Sign in to get personalized recommendations and save your favorite places.
          </p>
          <Button className="w-full">Sign In</Button>
          <Button variant="outline" className="w-full">Create Account</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="font-medium">Your Travel Preferences</h4>
          
          <div>
            <span className="text-gray-500 text-sm">Budget Level</span>
            <p className="capitalize">{dummyUser.preferences.budget}</p>
          </div>
          
          <div>
            <span className="text-gray-500 text-sm">Travel Style</span>
            <p className="capitalize">{dummyUser.preferences.travelStyle}</p>
          </div>
          
          <div>
            <span className="text-gray-500 text-sm">Interests</span>
            <p>{getInterestsList(dummyUser.preferences.interests)}</p>
          </div>
          
          <div>
            <span className="text-gray-500 text-sm">Dietary Restrictions</span>
            <p>{getInterestsList(dummyUser.preferences.dietaryRestrictions)}</p>
          </div>
          
          <div>
            <span className="text-gray-500 text-sm">Accessibility Needs</span>
            <p>
              {dummyUser.preferences.accessibilityNeeds.length > 0 
                ? getInterestsList(dummyUser.preferences.accessibilityNeeds)
                : "None specified"}
            </p>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            Edit Preferences
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
