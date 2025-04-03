
import React from 'react';
import { Link } from 'react-router-dom';
import { City } from '../types';
import { MapPin } from 'lucide-react';

interface CityCardProps {
  city: City;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  return (
    <Link to={`/city/${city.id}`} className="city-card block h-80">
      <div 
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${city.image})` }}
      >
        <div className="city-card-overlay flex flex-col justify-end p-6 h-full">
          <h3 className="text-white text-2xl font-bold mb-1">{city.name}</h3>
          <div className="flex items-center text-white/80 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{city.state}</span>
          </div>
          <p className="text-white/90 text-sm line-clamp-2 mb-2">
            {city.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {city.categories.slice(0, 2).map((category, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-white/20 text-white"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
