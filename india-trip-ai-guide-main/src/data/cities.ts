import { City } from "../types";
import darjeelingImg from '../assets/Darjeeling.jpg';
import udaipurImg from '../assets/Udaipur.jpg';
import varanasiImg from '../assets/Varanasi.jpg';
import rishikeshImg from '../assets/Rishikesh.jpg';
import amritsarImg from '../assets/Amritsar.jpg';
import kochiImg from '../assets/kochi.jpg';
import jaisalmerImg from '../assets/jaisalmer.jpg';
import lehLadakhImg from '../assets/leh-ladakh.jpg';

export const cities: City[] = [
  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi",
    description: "The capital city of India, Delhi is a blend of ancient and modern with historical monuments, government buildings, and vibrant markets.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
    bestTimeToVisit: "October to March",
    highlights: [
      "Red Fort",
      "Qutub Minar",
      "India Gate",
      "Humayun's Tomb",
      "Lotus Temple"
    ],
    categories: ["historical", "cultural"]
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    description: "Known as the Pink City, Jaipur is famous for its stunning pink-hued buildings and palaces, part of India's Golden Triangle.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop",
    bestTimeToVisit: "October to March",
    highlights: [
      "Hawa Mahal",
      "Amber Fort",
      "City Palace",
      "Jantar Mantar",
      "Jal Mahal"
    ],
    categories: ["historical", "cultural"]
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    description: "India's financial capital and home to Bollywood, Mumbai is a bustling metropolis with beautiful colonial architecture and beaches.",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1000&auto=format&fit=crop",
    bestTimeToVisit: "October to February",
    highlights: [
      "Gateway of India",
      "Marine Drive",
      "Elephanta Caves",
      "Chhatrapati Shivaji Terminus",
      "Juhu Beach"
    ],
    categories: ["cultural", "beach"]
  },
  {
    id: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    description: "Home to the iconic Taj Mahal, Agra is a historic city with magnificent Mughal-era architecture and monuments.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop",
    bestTimeToVisit: "October to March",
    highlights: [
      "Taj Mahal",
      "Agra Fort",
      "Fatehpur Sikri",
      "Mehtab Bagh",
      "Itimad-ud-Daulah"
    ],
    categories: ["historical"]
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    description: "One of the world's oldest continuously inhabited cities, Varanasi is a spiritual center on the banks of the Ganges River.",
    image: varanasiImg,
    bestTimeToVisit: "October to March",
    highlights: [
      "Dashashwamedh Ghat",
      "Kashi Vishwanath Temple",
      "Sarnath",
      "Assi Ghat",
      "Evening Aarti"
    ],
    categories: ["spiritual", "cultural"]
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    description: "India's beach paradise with a unique Portuguese heritage, known for golden beaches, seafood, and vibrant nightlife.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
    bestTimeToVisit: "November to February",
    highlights: [
      "Calangute Beach",
      "Basilica of Bom Jesus",
      "Fort Aguada",
      "Dudhsagar Falls",
      "Anjuna Flea Market"
    ],
    categories: ["beach", "cultural"]
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    description: "Known as the City of Lakes, Udaipur is famous for its palaces, temples, and romantic ambiance.",
    image: udaipurImg,
    bestTimeToVisit: "September to March",
    highlights: [
      "Lake Palace",
      "City Palace",
      "Lake Pichola",
      "Jagdish Temple",
      "Saheliyon Ki Bari"
    ],
    categories: ["historical", "cultural"]
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    description: "A picturesque hill station famous for its tea plantations, sweeping Himalayan views, and the Darjeeling Himalayan Railway.",
    image: darjeelingImg,
    bestTimeToVisit: "April to June, September to November",
    highlights: [
      "Tiger Hill",
      "Darjeeling Himalayan Railway",
      "Tea Gardens",
      "Batasia Loop",
      "Peace Pagoda"
    ],
    categories: ["hill station"]
  },
  {
    id: "shimla",
    name: "Shimla",
    state: "Himachal Pradesh",
    description: "Former summer capital of British India, Shimla is a popular hill station known for its colonial architecture, pedestrian-friendly Mall Road, and panoramic mountain views.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop",
    bestTimeToVisit: "March to June, September to November",
    highlights: [
      "The Ridge",
      "Mall Road",
      "Christ Church",
      "Jakhu Temple",
      "Kufri"
    ],
    categories: ["hill station", "cultural"]
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    description: "Nestled in the foothills of the Himalayas, Rishikesh is known as the 'Yoga Capital of the World' and is a spiritual hub with ashrams, temples, and adventure activities along the Ganges River.",
    image: rishikeshImg,
    bestTimeToVisit: "September to April",
    highlights: [
      "Laxman Jhula",
      "Triveni Ghat",
      "Rafting on the Ganges",
      "Beatles Ashram",
      "Parmarth Niketan"
    ],
    categories: ["spiritual", "adventure"]
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    description: "Home to the sacred Golden Temple, Amritsar is a city with deep historical and religious significance for Sikhs, known for its vibrant culture and delicious Punjabi cuisine.",
    image: amritsarImg,
    bestTimeToVisit: "October to March",
    highlights: [
      "Golden Temple (Harmandir Sahib)",
      "Jallianwala Bagh",
      "Wagah Border Ceremony",
      "Partition Museum",
      "Gobindgarh Fort"
    ],
    categories: ["spiritual", "cultural", "historical"]
  },
  {
    id: "kochi",
    name: "Kochi",
    state: "Kerala",
    description: "A charming port city on the southwest coast of India with a unique blend of Dutch, Portuguese, and British colonial influences, known for its historic Fort Kochi area and Chinese fishing nets.",
    image: kochiImg,
    bestTimeToVisit: "October to March",
    highlights: [
      "Chinese Fishing Nets",
      "Fort Kochi",
      "Mattancherry Palace",
      "St. Francis Church",
      "Kathakali Performances"
    ],
    categories: ["cultural", "historical"]
  },
  {
    id: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    description: "India's Silicon Valley, Bangalore is a cosmopolitan city known for its pleasant climate, tech industry, craft beer scene, and beautiful gardens.",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop",
    bestTimeToVisit: "October to February",
    highlights: [
      "Lalbagh Botanical Garden",
      "Cubbon Park",
      "Bangalore Palace",
      "ISKCON Temple",
      "UB City"
    ],
    categories: ["cultural"]
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    description: "The cultural capital of India, Kolkata is known for its colonial architecture, literary heritage, and vibrant festivals, especially Durga Puja.",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop",
    bestTimeToVisit: "October to March",
    highlights: [
      "Victoria Memorial",
      "Howrah Bridge",
      "Park Street",
      "College Street",
      "Dakshineswar Kali Temple"
    ],
    categories: ["cultural", "historical"]
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer",
    state: "Rajasthan",
    description: "Known as the 'Golden City' due to its yellow sandstone architecture, Jaisalmer is a desert city with a stunning fort, intricate havelis, and the vast Thar Desert.",
    image: jaisalmerImg,
    bestTimeToVisit: "October to March",
    highlights: [
      "Jaisalmer Fort",
      "Patwon Ki Haveli",
      "Desert Safari",
      "Gadisar Lake",
      "Sam Sand Dunes"
    ],
    categories: ["historical", "cultural", "adventure"]
  },
  {
    id: "leh",
    name: "Leh-Ladakh",
    state: "Ladakh",
    description: "A high-altitude desert region with stunning landscapes of mountains, valleys, and lakes, Leh-Ladakh offers breathtaking natural beauty and Tibetan Buddhist culture.",
    image: lehLadakhImg,
    bestTimeToVisit: "June to September",
    highlights: [
      "Pangong Lake",
      "Nubra Valley",
      "Magnetic Hill",
      "Thiksey Monastery",
      "Khardung La Pass"
    ],
    categories: ["adventure", "spiritual"]
  }
];

export const getRecommendedCities = (
  interests: string[] = [],
  season: string = "any"
): City[] => {
  if (interests.length === 0 && season === "any") {
    return cities.slice(0, 8); // Return top 8 cities instead of 4
  }

  const filteredCities = cities.filter(city => {
    // Check if any category matches user interests
    const hasMatchingInterest = interests.length === 0 || 
      city.categories.some(category => interests.includes(category));

    // Check if current season is good for visiting
    const isGoodSeason = season === "any" || city.bestTimeToVisit.toLowerCase().includes(season.toLowerCase());

    return hasMatchingInterest && isGoodSeason;
  });

  return filteredCities.slice(0, 8); // Return top 8 matched cities instead of 4
};

export const getCityById = (id: string): City | undefined => {
  return cities.find(city => city.id === id);
};
