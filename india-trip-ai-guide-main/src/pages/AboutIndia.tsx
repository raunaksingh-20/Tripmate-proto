import React from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AboutIndia: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">About India</h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Discover the incredible diversity and rich cultural heritage of India
          </p>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
              <TabsTrigger value="travel">Travel Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop" 
                  alt="India Taj Mahal" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-2xl font-semibold mb-4">Incredible India</h2>
              <p className="text-gray-700 mb-4">
                India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area, the second-most populous country, and the most populous democracy in the world. Home to the ancient Indus Valley Civilization and a region of historic trade routes and vast empires, the Indian subcontinent was identified with its commercial and cultural wealth for much of its long history.
              </p>
              
              <p className="text-gray-700 mb-4">
                India's rich and multi-layered cultures, from ancient temples to colonial architecture and vibrant street life, make it one of the most diverse and unique travel destinations in the world. The country offers something for every type of traveler, from spiritual seekers to adventure enthusiasts, culinary explorers, and history buffs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <p className="text-gray-600">
                    India has 22 officially recognized languages, with Hindi and English as the official languages of the central government.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Religion</h3>
                  <p className="text-gray-600">
                    Hinduism, Buddhism, Jainism, and Sikhism originated in India, while Islam, Christianity, Judaism, and Zoroastrianism have shaped its cultural heritage.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Currency</h3>
                  <p className="text-gray-600">
                    The Indian Rupee (₹) is the official currency, with notes available in denominations of ₹5, ₹10, ₹20, ₹50, ₹100, ₹200, ₹500, and ₹2000.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="culture" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Rich Cultural Heritage</h2>
              <p className="text-gray-700 mb-4">
                India's culture is among the world's oldest, with civilization in India beginning about 4,500 years ago. Throughout its history, India has been enriched by waves of migration that were absorbed into the Indian way of life.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-medium mb-3">Arts & Crafts</h3>
                  <p className="text-gray-700">
                    India's artistic traditions are ancient and diverse. From intricate temple carvings to delicate miniature paintings, vibrant textiles, and elaborate jewelry, Indian craftsmanship is renowned worldwide. Each region has its distinctive styles and techniques passed down through generations, such as Madhubani paintings from Bihar, Rajasthani puppets, Kashmiri carpets, and Kerala's wooden sculptures.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Music & Dance</h3>
                  <p className="text-gray-700">
                    Classical dance forms like Bharatanatyam, Kathak, Odissi, and Kathakali tell ancient stories through precise movements and expressions. Indian classical music with its two main traditions—Hindustani in the north and Carnatic in the south—uses complex melodic frameworks called ragas and rhythmic cycles called talas. Folk music and dance vary widely across regions, reflecting local cultures and traditions.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mb-3">Festivals & Celebrations</h3>
              <p className="text-gray-700 mb-6">
                India celebrates countless festivals throughout the year, reflecting its religious diversity and cultural richness. Major celebrations include:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Diwali</h4>
                  <p className="text-gray-600 text-sm">
                    The Festival of Lights symbolizes the victory of light over darkness, celebrated with oil lamps, fireworks, family gatherings, and sweets.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Holi</h4>
                  <p className="text-gray-600 text-sm">
                    The colorful spring festival where people throw vibrant powders and water at each other, celebrating the triumph of good over evil.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Durga Puja</h4>
                  <p className="text-gray-600 text-sm">
                    A major celebration in eastern India honoring the goddess Durga with elaborate pandals (temporary structures), art, music, and cultural performances.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mb-3">Culinary Traditions</h3>
              <p className="text-gray-700">
                Indian cuisine is as diverse as its culture, with each region boasting unique specialties, flavors, and cooking techniques. From the rich, creamy curries of Punjab to the coconut-infused dishes of Kerala, the street food of Mumbai to the royal cuisine of Rajasthan, food in India is an important part of cultural identity and social bonding. The masterful use of spices, developed over thousands of years, creates complex flavors that have made Indian food globally beloved.
              </p>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">A Journey Through Time</h2>
              <p className="text-gray-700 mb-6">
                India's history spans thousands of years, from ancient civilizations to colonial rule and independence. This rich historical tapestry has shaped the country's architecture, culture, and social fabric.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-2">Ancient India (3300 BCE - 500 CE)</h3>
                  <p className="text-gray-700">
                    India's history begins with the Indus Valley Civilization, one of the world's oldest urban cultures. This sophisticated society had planned cities with advanced drainage systems, standardized weights, and a script that remains undeciphered. Following this era came the Vedic Period, which saw the composition of the Vedas—ancient texts that form the foundation of Hinduism. The Maurya and Gupta Empires later established political unity across much of the subcontinent, fostering advancements in science, mathematics, astronomy, religion, and philosophy.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Medieval Period (500 CE - 1500 CE)</h3>
                  <p className="text-gray-700">
                    This era saw the rise of regional kingdoms and the introduction of Islam through Arab traders and later invasions. The Delhi Sultanate and Mughal Empire brought Persian and Central Asian influences to Indian culture, architecture, and governance. Grand monuments like the Taj Mahal, Red Fort, and Fatehpur Sikri date from this period. Meanwhile, Hindu kingdoms in southern India preserved classical traditions, creating magnificent temples and contributing to literature, music, and art.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Colonial Era (1500 CE - 1947)</h3>
                  <p className="text-gray-700">
                    European powers began establishing trading posts in India in the 16th century. The British East India Company gradually expanded its influence, eventually leading to direct British rule after the Indian Rebellion of 1857. Colonial rule transformed India's economy, education system, and administrative structure, while also sparking nationalist movements. Leaders like Mahatma Gandhi, Jawaharlal Nehru, and Subhas Chandra Bose led the struggle for independence through various means.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Modern India (1947 - Present)</h3>
                  <p className="text-gray-700">
                    India gained independence on August 15, 1947, with partition creating the separate nations of India and Pakistan. Under the leadership of Prime Minister Nehru, India established itself as a secular, democratic republic. The country has since developed into one of the world's fastest-growing economies and a significant global power, while navigating challenges of social inequality, religious tensions, and regional conflicts.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="geography" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Diverse Landscapes</h2>
              <p className="text-gray-700 mb-6">
                India's geography is incredibly diverse, spanning snowy mountains, fertile plains, arid deserts, dense forests, and tropical beaches. This geographical variety contributes to the country's biodiversity and regional cultural differences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-medium mb-3">Major Geographical Regions</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><span className="font-medium">The Himalayas:</span> The world's highest mountain range forms India's northern border, creating a natural barrier and influencing climate patterns across the subcontinent.</li>
                    <li><span className="font-medium">Indo-Gangetic Plain:</span> A fertile alluvial plain fed by the Ganges, Indus, and Brahmaputra rivers, supporting dense populations and agricultural production.</li>
                    <li><span className="font-medium">Deccan Plateau:</span> A large triangular plateau in central and southern India, bounded by mountain ranges on two sides.</li>
                    <li><span className="font-medium">Thar Desert:</span> Located in the northwestern part of India, it's one of the world's most populated desert areas.</li>
                    <li><span className="font-medium">Coastal Plains:</span> Narrow strips running along both the eastern and western coasts, offering different landscapes and ecosystems.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Climate</h3>
                  <p className="text-gray-700 mb-4">
                    India's climate ranges from alpine in the northern heights to tropical in the southern regions. Most of the country experiences three distinct seasons:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><span className="font-medium">Summer (March-June):</span> Hot and dry in most parts, with temperatures exceeding 40°C (104°F) in many areas.</li>
                    <li><span className="font-medium">Monsoon (June-September):</span> The southwest monsoon brings heavy rainfall across the country, vital for agriculture but sometimes causing floods and landslides.</li>
                    <li><span className="font-medium">Winter (October-February):</span> Mild to cold temperatures in most regions, with snowfall in the Himalayan states. This is generally the most pleasant time for travel.</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mb-3">Rivers and Water Bodies</h3>
              <p className="text-gray-700 mb-4">
                Rivers hold immense cultural and religious significance in India, apart from their ecological and economic importance. The Ganges, considered sacred in Hinduism, flows through the northern plains. Other major rivers include the Yamuna, Brahmaputra, Godavari, Krishna, and Narmada. India is bounded by the Arabian Sea to the west, the Bay of Bengal to the east, and the Indian Ocean to the south, giving it a coastline stretching over 7,500 kilometers.
              </p>
              
              <h3 className="text-xl font-medium mb-3">Biodiversity</h3>
              <p className="text-gray-700">
                India is one of 17 megadiverse countries, hosting an extraordinary variety of flora and fauna, including iconic species like the Bengal tiger, Indian elephant, one-horned rhinoceros, and peacock (the national bird). The country's diverse habitats support about 8% of all recorded species, including over 45,000 plant species and 91,000 animal species. Conservation efforts include numerous national parks and wildlife sanctuaries, such as Jim Corbett National Park, Kaziranga, Ranthambore, and the Sundarbans.
              </p>
            </TabsContent>
            
            <TabsContent value="travel" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Essential Travel Information</h2>
              <p className="text-gray-700 mb-6">
                Planning a trip to India requires some preparation. Here's essential information to help you make the most of your journey through this fascinating country.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-3">Visa Requirements</h3>
                  <p className="text-gray-700 mb-2">
                    Most international travelers need a visa to enter India. The e-Tourist Visa is available for citizens of over 160 countries and can be applied for online. Processing typically takes 3-5 business days, though it's advisable to apply at least two weeks before your trip.
                  </p>
                  <p className="text-gray-700">
                    Check the official Indian Visa Online website for the most current information and to apply: <a href="https://indianvisaonline.gov.in" className="text-india-saffron hover:underline" target="_blank" rel="noopener noreferrer">indianvisaonline.gov.in</a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Best Time to Visit</h3>
                  <p className="text-gray-700">
                    The ideal time to visit varies by region:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
                    <li><span className="font-medium">Northern India:</span> October to March, when the weather is cool and dry.</li>
                    <li><span className="font-medium">Southern India:</span> November to February offers relief from the heat and humidity.</li>
                    <li><span className="font-medium">Himalayan Regions:</span> April to June for Kashmir and Himachal; June to September for Ladakh.</li>
                    <li><span className="font-medium">Monsoon Season (June-September):</span> Travel can be challenging during heavy rains, but some areas like Kerala have their special charm.</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-medium mb-3">Health and Safety</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Vaccinations</h4>
                    <p className="text-gray-600 text-sm">
                      Consult your doctor or a travel health professional for recommended vaccinations. Typically, these include Hepatitis A and B, Typhoid, and Tetanus. Yellow Fever certification is required if arriving from infected areas.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Food and Water Safety</h4>
                    <p className="text-gray-600 text-sm">
                      Drink only bottled or purified water. Be cautious with street food—choose vendors with high turnover and where food is freshly prepared. Carrying hand sanitizer and basic medications for stomach issues is advisable.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Personal Safety</h4>
                    <p className="text-gray-600 text-sm">
                      Exercise normal precautions regarding personal belongings. Women travelers should dress modestly, especially at religious sites. Using registered taxis or ride-sharing apps is recommended for transportation.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Emergency Contacts</h4>
                    <p className="text-gray-600 text-sm">
                      Police: 100 | Ambulance: 102 | Tourist Police Helpline: 1363
                      Keep your embassy/consulate contacts handy and consider travel insurance that covers medical emergencies.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-medium mb-3">Transportation</h3>
                <p className="text-gray-700 mb-4">
                  India offers various transportation options to suit different budgets and preferences:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><span className="font-medium">Flights:</span> Domestic airlines connect major cities and many smaller ones. Budget carriers like IndiGo, SpiceJet, and Air India Express offer affordable options.</li>
                  <li><span className="font-medium">Trains:</span> Indian Railways provides an extensive network and is an authentic way to experience the country. Classes range from basic to luxury. Book through the official IRCTC website or app.</li>
                  <li><span className="font-medium">Buses:</span> State-run and private buses connect cities and towns. For longer journeys, opt for air-conditioned or sleeper services.</li>
                  <li><span className="font-medium">Local Transport:</span> Metros operate in major cities. Auto-rickshaws and taxis are available everywhere—use meters or negotiate fares beforehand.</li>
                  <li><span className="font-medium">Car Rentals:</span> Consider hiring a car with a driver rather than self-driving, especially in unfamiliar areas.</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-3">Cultural Etiquette</h3>
                <p className="text-gray-700 mb-4">
                  Understanding and respecting local customs will enhance your experience:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Remove shoes before entering homes and religious places.</li>
                  <li>Dress modestly, especially at religious sites. Covering shoulders and knees is appropriate.</li>
                  <li>Ask permission before photographing people, and be aware that photography may be prohibited in some religious sites and museums.</li>
                  <li>When eating with hands (traditional in many parts), use only your right hand.</li>
                  <li>Public displays of affection are generally frowned upon.</li>
                  <li>The Indian head wobble (a side-to-side tilt) can mean yes, I understand, or thank you—context matters.</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AboutIndia; 