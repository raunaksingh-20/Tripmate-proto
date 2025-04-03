import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToExploreCities = (e: React.MouseEvent) => {
    // Only scroll if we're on the home page
    if (location.pathname === '/') {
      e.preventDefault();
      const exploreCitiesSection = document.getElementById('explore-cities');
      if (exploreCitiesSection) {
        exploreCitiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and brand */}
        <Link to="/" className="flex items-center space-x-2" onClick={scrollToTop}>
          <img src={logo} alt="Tripmate Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-india-saffron to-india-green">
            Tripmate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-india-saffron transition-colors"
            onClick={scrollToTop}
          >
            Home
          </Link>
          <Link 
            to={location.pathname === '/' ? '#explore-cities' : '/#explore-cities'} 
            className="text-gray-700 hover:text-india-saffron transition-colors"
            onClick={scrollToExploreCities}
          >
            Explore Cities
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-india-saffron transition-colors">
            About India
          </Link>
          <div className="relative w-64">
            <Input 
              placeholder="Search cities, attractions..." 
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 border-t mt-2 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-india-saffron py-2 transition-colors"
              onClick={() => {
                scrollToTop();
                setIsMenuOpen(false);
              }}
            >
              Home
            </Link>
            <Link 
              to={location.pathname === '/' ? '#explore-cities' : '/#explore-cities'}
              className="text-gray-700 hover:text-india-saffron py-2 transition-colors"
              onClick={(e) => {
                if (location.pathname === '/') {
                  scrollToExploreCities(e);
                }
                setIsMenuOpen(false);
              }}
            >
              Explore Cities
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-india-saffron py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About India
            </Link>
            <div className="relative">
              <Input 
                placeholder="Search cities, attractions..." 
                className="pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
