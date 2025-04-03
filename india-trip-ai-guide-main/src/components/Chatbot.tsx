import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import RaahgirImage from '@/assets/Raahgir.PNG';
import { cities, getCityById } from '../data/cities';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! I'm Raahgir, your AI travel guide for India. How can I help you plan your perfect Indian adventure?",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Pro tip: Check out our AI-powered 'Yatra Guru' recommendation engine for personalized trip planning! It's the heart of our platform.",
      sender: 'bot',
      timestamp: new Date(Date.now() + 1000)
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasRecommendedApp, setHasRecommendedApp] = useState(false);
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Use the cities data to generate predefined responses
  const cityResponses: Record<string, string[]> = {};
  
  // Generate responses for each city
  cities.forEach(city => {
    const cityResponse = [
      `${city.name} in ${city.state} is a must-visit destination in India. ${city.description} The best time to visit is ${city.bestTimeToVisit}. Top highlights include ${city.highlights.slice(0, 3).join(', ')}, and more. It's perfect for travelers interested in ${city.categories.join(', ')}.`
    ];
    cityResponses[city.id.toLowerCase()] = cityResponse;
    cityResponses[city.name.toLowerCase()] = cityResponse;
  });
  
  // Sample predefined responses based on keywords
  const predefinedResponses: Record<string, string[]> = {
    'hello': [
      "Namaste! How can I help you plan your India trip today?",
      "Hello there! Ready to explore the wonders of India?"
    ],
    'hi': [
      "Namaste! I'm Raahgir, your AI guide for traveling in India. How can I assist you today?",
      "Hi there! Excited to help you discover incredible India. What would you like to know?"
    ],
    'recommend': [
      "For detailed, personalized recommendations, I suggest trying our 'Yatra Guru' AI recommendation engine. Would you like me to take you there? It can build a customized itinerary based on your preferences."
    ],
    'itinerary': [
      "Creating a perfect itinerary is our specialty! Our 'Yatra Guru' AI recommendation engine can build a personalized travel plan just for you. Would you like me to show you how to use it?"
    ],
    'plan': [
      "For comprehensive trip planning, I recommend using our 'Yatra Guru' AI engine. It can create a personalized itinerary based on your interests, budget, and travel dates. Would you like to try it?"
    ],
    'best time': [
      "The best time to visit India depends on the region. North India is best from October to March to avoid extreme heat and monsoons. South India is good year-round, but December to February offers the most pleasant weather. The Himalayan regions are best visited from March to June."
    ],
    'food': [
      "Indian cuisine is incredibly diverse! North India is known for rich curries and bread like naan and roti. South India offers lighter dishes like dosas, idlis, and coconut-based curries. Street food like chaat, pani puri, and vada pav are must-tries. Don't miss regional specialties - Bengali sweets, Goan seafood, or Punjabi tandoori dishes!"
    ],
    'budget': [
      "India can be very budget-friendly. Budget travelers can get by on $25-30 per day, including accommodation in hostels or budget guesthouses, street food, and local transportation. Mid-range travelers should budget $50-100 per day for nicer hotels and restaurants. Luxury experiences start from $150-200 per day."
    ],
    'safe': [
      "India is generally safe for tourists, though you should take standard precautions. It's advisable to respect local customs, dress modestly (especially at religious sites), be cautious with street food and tap water, and use registered taxis or ride-sharing apps. Solo female travelers should take extra precautions, especially at night."
    ],
    'visa': [
      "Most international travelers need a visa to visit India. The e-Tourist Visa is available for citizens of over 160 countries and can be applied for online. Processing typically takes 3-5 business days. The e-visa allows stays of up to 90 days from the date of entry for tourism purposes."
    ],
    'travel tips': [
      "Here are some essential India travel tips: 1) Drink only bottled water, 2) Dress modestly, especially at religious sites, 3) Bargain at markets but do so respectfully, 4) Be prepared for spicy food and carry stomach medication, 5) Use registered taxis or ride-sharing apps, 6) Keep digital copies of important documents, 7) Purchase a local SIM card for affordable data, 8) Always carry some cash as not all places accept cards."
    ],
    'transport': [
      "India offers various transportation options. Domestic flights connect major cities, while trains are an authentic and economical way to travel long distances (book in advance on IRCTC). For shorter trips, buses (government and private) are available. Within cities, use metros where available, auto-rickshaws, taxis, or ride-hailing apps. Renting a car with driver is recommended over self-driving for tourists."
    ],
    'festivals': [
      "India celebrates numerous colorful festivals year-round. Don't miss Diwali (Festival of Lights) in October/November, Holi (Festival of Colors) in March, Durga Puja in September/October in Kolkata, Pushkar Camel Fair in November, and Onam in Kerala in August/September. These celebrations offer incredible cultural experiences with music, dance, food, and rituals."
    ],
    'shopping': [
      "India is a shopper's paradise with unique handicrafts from different regions. Look for silk sarees in Varanasi, blue pottery in Jaipur, pashmina shawls in Kashmir, bronze and stone sculptures in Tamil Nadu, spices in Kerala, and jewelry throughout the country. Government-endorsed Cottage Emporiums offer fixed prices and authentic items, while local markets provide bargaining opportunities."
    ],
    'golden triangle': [
      "India's Golden Triangle is the popular tourist circuit connecting Delhi, Agra, and Jaipur. This route covers some of India's most iconic attractions: Delhi's historical monuments, the Taj Mahal in Agra, and Jaipur's palaces and forts. The entire circuit can be completed in 5-7 days and gives visitors a taste of India's Mughal and Rajput heritage, architecture, and culture."
    ],
    'historical': [
      `India has incredible historical sites. Here are top historical destinations: ${cities.filter(c => c.categories.includes('historical')).slice(0, 5).map(c => c.name).join(', ')}. Would you like details about any of these places?`
    ],
    'adventure': [
      `For adventure seekers, India offers thrilling experiences. Top adventure destinations include: ${cities.filter(c => c.categories.includes('adventure')).slice(0, 5).map(c => c.name).join(', ')}. Would you like to know more about any of these places?`
    ],
    'spiritual': [
      `India is a spiritual haven with sacred sites across the country. Top spiritual destinations include: ${cities.filter(c => c.categories.includes('spiritual')).slice(0, 5).map(c => c.name).join(', ')}. Would you like specific information about any of these places?`
    ],
    'beach': [
      `India has beautiful beaches along its vast coastline. Popular beach destinations include: ${cities.filter(c => c.categories.includes('beach')).slice(0, 5).map(c => c.name).join(', ')}. Would you like to know more about any of these coastal paradises?`
    ],
    'hill station': [
      `India's hill stations offer cool retreats from the heat. Top hill stations include: ${cities.filter(c => c.categories.includes('hill station')).slice(0, 5).map(c => c.name).join(', ')}. Would you like details about any of these mountain getaways?`
    ],
    'cultural': [
      `India has a rich tapestry of cultures. Top cultural destinations include: ${cities.filter(c => c.categories.includes('cultural')).slice(0, 5).map(c => c.name).join(', ')}. Would you like to learn more about any of these culturally vibrant places?`
    ],
    // Add all city responses
    ...cityResponses
  };
  
  // Generic knowledge about India regions
  const indianRegions = {
    north: {
      description: "North India includes Delhi, Rajasthan, Uttar Pradesh, Himachal Pradesh, and more. It's known for the Himalayas, Mughal architecture including the Taj Mahal, Rajput palaces, and rich Punjabi cuisine.",
      majorCities: ["Delhi", "Jaipur", "Agra", "Amritsar", "Shimla", "Varanasi", "Rishikesh"],
      cuisine: "North Indian cuisine features bread like naan and paratha, rich curries, tandoori dishes, and sweets like jalebi and gulab jamun.",
      weather: "Best visited from October to March. Summers (April-June) are very hot, followed by monsoon (July-September). Winter (December-February) can be cold, especially in the mountains."
    },
    south: {
      description: "South India comprises Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana. Known for ancient temples, tropical beaches, serene backwaters, and lush hill stations.",
      majorCities: ["Chennai", "Bangalore", "Hyderabad", "Kochi", "Mysore", "Pondicherry", "Madurai"],
      cuisine: "South Indian cuisine offers dosas, idlis, sambhar, coconut-based curries, and filter coffee. Each state has its unique specialties.",
      weather: "Best visited from November to February. Temperatures are generally more moderate than the north, with heat peaking in April-May. Monsoons affect different parts from June to September."
    },
    east: {
      description: "East India includes West Bengal, Odisha, Bihar, Jharkhand, and the Seven Sister states of the Northeast. Known for diverse cultures, tea plantations, tribal traditions, and Buddhist heritage.",
      majorCities: ["Kolkata", "Darjeeling", "Guwahati", "Shillong", "Gangtok", "Puri", "Bodhgaya"],
      cuisine: "East Indian cuisine is known for fish dishes, rice, sweets like rasgulla and sandesh, and the use of mustard.",
      weather: "Best visited from October to March. Summers are hot and humid, monsoon (June-September) brings heavy rainfall."
    },
    west: {
      description: "West India comprises Gujarat, Maharashtra, and Goa. Known for coastal areas, commercial centers, Portuguese influence in Goa, and diverse landscapes.",
      majorCities: ["Mumbai", "Goa", "Ahmedabad", "Pune", "Surat", "Rajkot", "Udaipur"],
      cuisine: "Western Indian cuisine varies greatly: Maharashtrian has spicy vada pav, Gujarati offers sweet-savory vegetarian dishes, while Goan features seafood with Portuguese influence.",
      weather: "Best visited from October to March. Summer temperatures are high, followed by heavy monsoon rainfall from June to September."
    },
    central: {
      description: "Central India includes Madhya Pradesh and Chhattisgarh. Known for ancient temples, tiger reserves, tribal cultures, and historical sites.",
      majorCities: ["Bhopal", "Indore", "Raipur", "Jabalpur", "Gwalior", "Ujjain", "Khajuraho"],
      cuisine: "Central Indian cuisine offers unique dishes like poha, bhutte ka kees (corn dish), and street foods like jalebi and dal bafla.",
      weather: "Best visited from October to March. Summers are extremely hot, while monsoon (July-September) brings moderate rainfall."
    }
  };
  
  // Generate response based on user input
  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check if we should recommend the AI planner app
    const planningKeywords = ['recommend', 'suggestion', 'itinerary', 'plan', 'help me', 'where should', 'best places'];
    const shouldRecommendApp = !hasRecommendedApp && planningKeywords.some(keyword => lowerInput.includes(keyword));
    
    if (shouldRecommendApp) {
      setHasRecommendedApp(true);
      return "I can help with basic questions, but for truly personalized recommendations, you should use our 'Yatra Guru' AI recommendation engine. It's the heart of our platform and can create a custom travel plan based on your preferences. Would you like to try it now?";
    }
    
    // Special handling for Taj Mahal queries
    if (lowerInput.includes('taj mahal') || lowerInput.includes('taj')) {
      const agraCity = cities.find(city => city.id === 'agra');
      if (agraCity) {
        return `The Taj Mahal is India's most iconic monument, located in ${agraCity.name}, ${agraCity.state}. It's a stunning white marble mausoleum built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. The Taj Mahal is recognized as a UNESCO World Heritage Site and one of the New Seven Wonders of the World.

The best time to visit is ${agraCity.bestTimeToVisit}. While at Agra, you can also explore other attractions like ${agraCity.highlights.filter(h => h !== "Taj Mahal").join(', ')}.

I recommend visiting at sunrise for the most magical experience with fewer crowds.`;
      }
    }
    
    // Check for questions about specific cities
    for (const city of cities) {
      if (lowerInput.includes(city.id.toLowerCase()) || lowerInput.includes(city.name.toLowerCase())) {
        // Return detailed information about the city
        return `${city.name} in ${city.state} is a wonderful destination! ${city.description} 
The best time to visit is ${city.bestTimeToVisit}. 
Top attractions include: ${city.highlights.join(', ')}. 
It's ideal for travelers interested in ${city.categories.join(', ')}.`;
      }
    }
    
    // Check for questions about categories (historical, beach, etc.)
    const categoryKeywords = ['historical', 'spiritual', 'adventure', 'beach', 'hill station', 'wildlife', 'cultural'];
    for (const category of categoryKeywords) {
      if (lowerInput.includes(category)) {
        const matchingCities = cities.filter(city => city.categories.includes(category as any)).slice(0, 5);
        if (matchingCities.length > 0) {
          return `Great ${category} destinations in India include: ${matchingCities.map(c => c.name).join(', ')}. Would you like specific information about any of these places?`;
        }
      }
    }
    
    // Check for questions about cities or states
    const cityStateQuestionPatterns = [
      /what (is|are) .* (in|about) ([\w\s]+)/i,
      /tell me about ([\w\s]+)/i,
      /how (is|to get to) ([\w\s]+)/i,
      /where is ([\w\s]+)/i,
      /visit ([\w\s]+)/i,
      /best .* (in|of) ([\w\s]+)/i,
      /information .* (about|on) ([\w\s]+)/i
    ];
    
    // Check for question patterns about cities/states
    for (const pattern of cityStateQuestionPatterns) {
      const match = lowerInput.match(pattern);
      if (match) {
        // Extract potential city/state name
        let locationName = match[match.length - 1].toLowerCase().trim();
        
        // Special handling for Taj Mahal
        if (locationName.includes('taj mahal') || locationName === 'taj') {
          const agraCity = cities.find(city => city.id === 'agra');
          if (agraCity) {
            return `The Taj Mahal is India's most iconic monument, located in ${agraCity.name}, ${agraCity.state}. It's a stunning white marble mausoleum built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. The Taj Mahal is recognized as a UNESCO World Heritage Site and one of the New Seven Wonders of the World.

The best time to visit is ${agraCity.bestTimeToVisit}. While at Agra, you can also explore other attractions like ${agraCity.highlights.filter(h => h !== "Taj Mahal").join(', ')}.

I recommend visiting at sunrise for the most magical experience with fewer crowds.`;
          }
        }
        
        // Check if the extracted location matches any of our cities
        const matchedCity = cities.find(city => 
          city.name.toLowerCase() === locationName || 
          city.id.toLowerCase() === locationName
        );
        
        if (matchedCity) {
          return `${matchedCity.name} in ${matchedCity.state} is a wonderful destination! ${matchedCity.description} 
The best time to visit is ${matchedCity.bestTimeToVisit}. 
Top attractions include: ${matchedCity.highlights.join(', ')}. 
It's ideal for travelers interested in ${matchedCity.categories.join(', ')}.`;
        }
        
        // First check if the extracted location is in our predefined responses
        for (const [keyword, responses] of Object.entries(predefinedResponses)) {
          if (locationName.includes(keyword) || keyword.includes(locationName)) {
            return responses[Math.floor(Math.random() * responses.length)];
          }
        }
        
        // If we don't have specific predefined info, try the generic knowledge base
        return generateGenericLocationResponse(locationName);
      }
    }
    
    // Check if the input directly mentions a city or state (without question pattern)
    for (const [keyword, responses] of Object.entries(predefinedResponses)) {
      if (lowerInput.includes(keyword)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Default responses if no keywords match
    const defaultResponses = [
      "That's a great question about India! To provide more specific information, could you tell me which region or cities you're most interested in visiting?",
      "India is incredibly diverse with so much to offer. Are you interested in cultural experiences, adventure activities, spiritual journeys, or culinary explorations?",
      "I'd be happy to help with that. Could you provide a bit more detail about your interests or specific questions about India?",
      "For that query, I recommend checking out the city guides on this website. You can find detailed information about popular destinations like Delhi, Jaipur, Varanasi, and many more.",
      "That's a fascinating aspect of Indian travel! Would you like recommendations for specific destinations that offer these experiences?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };
  
  // Generate generic response for cities/states not covered in predefined responses
  const generateGenericLocationResponse = (location: string): string => {
    // Check for region match
    for (const [region, info] of Object.entries(indianRegions)) {
      if (location.includes(region)) {
        return info.description;
      }
      
      if (info.majorCities.some(city => city.toLowerCase() === location)) {
        return `${location.charAt(0).toUpperCase() + location.slice(1)} is a major city in the ${region} region of India. ${info.description.split('.')[0]}. The region is known for ${info.cuisine.split('.')[0].toLowerCase()} and ${info.weather.split('.')[0].toLowerCase()}.`;
      }
    }
    
    // If we recognize it's a place in India but don't have specific info
    return `${location.charAt(0).toUpperCase() + location.slice(1)} is a destination in India. I don't have specific details about this location, but I can help you plan a trip there using our Yatra Guru recommendation engine, which has access to a more comprehensive database of Indian destinations. Would you like to use the recommendation engine?`;
  };
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Check for keywords related to AI recommendation engine
    const lowerInput = inputMessage.toLowerCase();
    const aiKeywords = ['yatra guru', 'recommendation engine', 'ai tool', 'try it', 'recommendation', 'ai engine', 'smart planner'];
    
    if (aiKeywords.some(keyword => lowerInput.includes(keyword)) || 
        (hasRecommendedApp && ['yes', 'sure', 'okay', 'ok', 'show me'].some(word => lowerInput.includes(word)))) {
      
      // Simulate bot typing and response with recommendation link
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Great! Here's a direct link to our 'Yatra Guru' AI recommendation engine. It's the most advanced part of our platform and will help you create a perfect itinerary tailored to your needs.",
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
        
        // Add a follow-up message with action button in a short delay
        setTimeout(() => {
          const actionResponse: Message = {
            id: messages.length + 3,
            text: "<action-button>Launch Yatra Guru</action-button>",
            sender: 'bot',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, actionResponse]);
          setIsTyping(false);
        }, 1000);
        
      }, 1000 + Math.random() * 1000);
      
    } else {
      // Normal response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: generateResponse(inputMessage),
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
  };
  
  // Auto-scroll to the most recent message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleChatbot = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsOpen(false);
    }
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  // Format time as HH:MM
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      {!isOpen && (
        <div className="flex flex-col items-end">
          <div className="bg-white rounded-lg px-3 py-1 shadow-md mb-2 text-india-saffron font-medium">
            Chat with Raahgir!
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-india-saffron animate-ping opacity-30"></div>
            <Button 
              onClick={toggleChatbot} 
              className="w-16 h-16 rounded-full bg-india-saffron hover:bg-india-saffron/90 shadow-lg flex items-center justify-center p-0 border-2 border-white relative z-10"
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={RaahgirImage} alt="Raahgir" className="w-full h-full object-cover" />
              </div>
            </Button>
          </div>
        </div>
      )}
      
      {/* Chatbot interface */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl flex flex-col ${isMinimized ? 'h-16' : 'h-[450px]'} w-[350px] border border-gray-200 overflow-hidden transition-all duration-300`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-india-saffron to-india-green p-3 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img src={RaahgirImage} alt="Raahgir" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold">Raahgir - Your India Guide</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:text-white hover:bg-white/20" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:text-white hover:bg-white/20" onClick={toggleChatbot}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Chat area - only shown when not minimized */}
          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'bot' && (
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                          <img src={RaahgirImage} alt="Raahgir" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === 'user' 
                            ? 'bg-india-saffron text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {message.text.includes("<action-button>") ? (
                          <div className="flex items-center justify-center my-1">
                            <a 
                              href="https://tour-recommendation-model-57axfvngzrjczksjq59eeo.streamlit.app/" 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 bg-india-saffron text-white px-4 py-2 rounded-md hover:bg-india-saffron/90 transition-colors"
                              onClick={() => {
                                toggleChatbot();
                              }}
                            >
                              <span>Launch Yatra Guru</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        <img src={RaahgirImage} alt="Raahgir" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none max-w-[80%] px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messageEndRef} />
                </div>
              </ScrollArea>
              
              {/* Input area */}
              <div className="border-t p-3 flex items-center space-x-2">
                <Input
                  placeholder="Ask about cities, attractions, or travel tips..."
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="icon" 
                  className="bg-india-saffron hover:bg-india-saffron/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot; 