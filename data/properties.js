// Properties data for the real estate application

import { house1, house2, house4, house5 } from "@/public/assets/images";

// Helper function to generate random rating
const getRandomRating = (min = 3, max = 5) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

// Helper function to generate random date within last year
const getRandomDate = () => {
  const start = new Date(2024, 0, 1); // Start of 2024
  const end = new Date(); // Current date
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Main properties array
export const properties = [
  {
    id: 1,
    title: 'Luxury Oceanfront Villa',
    price: '$3,250,000',
    location: 'Malibu, California',
    beds: 5,
    baths: 4.5,
    sqft: 5200,
    image: {house5},
    type: 'For Sale',
    yearBuilt: 2020,
    rating: 4.9,
    featured: true,
    dateListed: '2024-03-15',
    features: ['ocean view', 'pool', 'gym', 'garage', 'garden', 'kitchen'],
    description: 'Stunning oceanfront villa with panoramic views, modern amenities, and luxurious finishes throughout.'
  },
  {
    id: 2,
    title: 'Modern Downtown Loft',
    price: '$1,850,000',
    location: 'New York, NY',
    beds: 3,
    baths: 2.5,
    sqft: 2800,
    image: '/assets/images/house1.jpg',
    type: 'For Sale',
    yearBuilt: 2019,
    rating: 4.7,
    featured: true,
    dateListed: '2024-04-22',
    features: ['city view', 'rooftop', 'elevator', 'gym', 'kitchen'],
    description: 'Sleek downtown loft with floor-to-ceiling windows, high-end finishes, and premium location.'
  },
  {
    id: 3,
    title: 'Mountain View Chalet',
    price: '$2,450,000',
    location: 'Aspen, Colorado',
    beds: 6,
    baths: 5,
    sqft: 6800,
    image: '/assets/images/house2.jpg',
    type: 'For Sale',
    yearBuilt: 2018,
    rating: 4.8,
    featured: true,
    dateListed: '2024-02-10',
    features: ['mountain view', 'fireplace', 'hot tub', 'garage', 'kitchen'],
    description: 'Luxury chalet with breathtaking mountain views, perfect for year-round mountain living.'
  },
  {
    id: 4,
    title: 'Beachfront Paradise',
    price: '$4,750,000',
    location: 'Miami Beach, Florida',
    beds: 7,
    baths: 6.5,
    sqft: 8200,
    image: '/assets/images/house4.jpg',
    type: 'For Sale',
    yearBuilt: 2021,
    rating: 4.9,
    featured: true,
    dateListed: '2024-05-05',
    features: ['beachfront', 'pool', 'dock', 'gym', 'home theater', 'kitchen'],
    description: 'Exclusive beachfront estate with private beach access, infinity pool, and luxury amenities.'
  },
  {
    id: 5,
    title: 'Historic Townhouse',
    price: '$2,100,000',
    location: 'Boston, Massachusetts',
    beds: 4,
    baths: 3.5,
    sqft: 3800,
    image: {house5},
    type: 'For Sale',
    yearBuilt: 1920,
    rating: 4.6,
    dateListed: '2024-01-18',
    features: ['historic', 'fireplace', 'garden', 'hardwood floors', 'kitchen'],
    description: 'Beautifully restored historic townhouse with modern amenities in a prime location.'
  },
  {
    id: 6,
    title: 'Modern Farmhouse',
    price: '$1,750,000',
    location: 'Austin, Texas',
    beds: 5,
    baths: 4,
    sqft: 4200,
    image: '/assets/images/house1.jpg',
    type: 'For Sale',
    yearBuilt: 2020,
    rating: 4.7,
    dateListed: '2024-03-30',
    features: ['farmhouse', 'porch', 'pool', 'barn', 'kitchen'],
    description: 'Charming modern farmhouse with open floor plan, chef\'s kitchen, and resort-style backyard.'
  },
  {
    id: 7,
    title: 'Penthouse with City Views',
    price: '$3,500,000',
    location: 'Chicago, Illinois',
    beds: 4,
    baths: 4.5,
    sqft: 4800,
    image: '/assets/images/house2.jpg',
    type: 'For Sale',
    yearBuilt: 2019,
    rating: 4.8,
    featured: true,
    dateListed: '2024-04-15',
    features: ['city view', 'rooftop', 'doorman', 'gym', 'kitchen'],
    description: 'Luxury penthouse with panoramic city views, high-end finishes, and premium amenities.'
  },
  {
    id: 8,
    title: 'Desert Oasis',
    price: '$2,950,000',
    location: 'Scottsdale, Arizona',
    beds: 6,
    baths: 5.5,
    sqft: 6200,
    image: '/assets/images/house4.jpg',
    type: 'For Sale',
    yearBuilt: 2021,
    rating: 4.9,
    dateListed: '2024-02-28',
    features: ['mountain view', 'pool', 'spa', 'golf course', 'kitchen'],
    description: 'Spectacular desert retreat with mountain views, resort-style pool, and modern architecture.'
  },
  {
    id: 9,
    title: 'Waterfront Cottage',
    price: '$1,250,000',
    location: 'Cape Cod, Massachusetts',
    beds: 3,
    baths: 2,
    sqft: 2200,
    image: {house5},
    type: 'For Sale',
    yearBuilt: 2018,
    rating: 4.5,
    dateListed: '2024-05-10',
    features: ['waterfront', 'dock', 'beach access', 'fireplace', 'kitchen'],
    description: 'Charming waterfront cottage with private dock and stunning water views in a peaceful setting.'
  },
  {
    id: 10,
    title: 'Luxury High-Rise Condo',
    price: '$2,800,000',
    location: 'San Francisco, California',
    beds: 3,
    baths: 3.5,
    sqft: 3200,
    image: '/assets/images/house1.jpg',
    type: 'For Sale',
    yearBuilt: 2022,
    rating: 4.8,
    featured: true,
    dateListed: '2024-04-05',
    features: ['city view', 'doorman', 'gym', 'rooftop deck', 'kitchen'],
    description: 'Sophisticated high-rise living with breathtaking city and bay views in the heart of San Francisco.'
  },
  {
    id: 11,
    title: 'Rustic Mountain Cabin',
    price: '$1,450,000',
    location: 'Park City, Utah',
    beds: 4,
    baths: 3,
    sqft: 3800,
    image: '/assets/images/house2.jpg',
    type: 'For Sale',
    yearBuilt: 2017,
    rating: 4.6,
    dateListed: '2024-03-20',
    features: ['mountain view', 'hot tub', 'fireplace', 'garage', 'kitchen'],
    description: 'Charming rustic cabin with modern amenities, perfect for year-round mountain living.'
  },
  {
    id: 12,
    title: 'Luxury Penthouse Suite',
    price: '$5,200,000',
    location: 'Miami, Florida',
    beds: 5,
    baths: 5.5,
    sqft: 6800,
    image: '/assets/images/house4.jpg',
    type: 'For Sale',
    yearBuilt: 2023,
    rating: 5.0,
    featured: true,
    dateListed: '2024-05-01',
    features: ['ocean view', 'pool', 'gym', 'concierge', 'kitchen'],
    description: 'Ultra-luxury penthouse with panoramic ocean views, private pool, and resort-style amenities.'
  }
];

// Export featured properties (first 6 properties with featured: true)
export const featuredProperties = properties.filter(prop => prop.featured).slice(0, 6);

// Add random dates and ratings to properties for sorting
properties.forEach(property => {
  if (!property.dateListed) {
    property.dateListed = getRandomDate().toISOString().split('T')[0];
  }
  if (!property.rating) {
    property.rating = getRandomRating();
  }
});

export default properties;

export const topProperties = [
  {
    id: 4,
    title: 'Luxury Villa with Ocean View',
    price: '$1,250,000',
    location: 'Malibu, California',
    beds: 5,
    baths: 4.5,
    sqft: 4200,
    image: {house5},
    featured: true,
    type: 'For Sale',
    yearBuilt: 2020
  },
  {
    id: 5,
    title: 'Luxury Villa with Ocean View',
    price: '$1,250,000',
    location: 'Malibu, California',
    beds: 5,
    baths: 4.5,
    sqft: 4200,
    image: {house5},
    featured: true,
    type: 'For Sale',
    yearBuilt: 2020
  },
  // Add more featured properties...
];

export const topSellers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Top Agent',
    sales: 245,
    image: {house1},
    rating: 4.9
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Top Agent',
    sales: 245,
    image: {house1},
    rating: 4.9
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'Top Agent',
    sales: 245,
    image: {house1},
    rating: 4.9
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    role: 'Top Agent',
    sales: 245,
    image: {house1},
    rating: 4.9
  },
  {
    id: 5,
    name: 'Sarah Johnson',
    role: 'Top Agent',
    sales: 245,
    image: {house1},
    rating: 4.9
  },
  {
    id: 6,
    name: 'Sarah Johnson',
    role: 'Top Agent',
    sales: 245,
    image: {house1},
    rating: 4.9
  },
  // Add more top sellers...
];

export const latestProperties = [
  {
    id: 1,
    title: 'Modern Downtown Loft',
    price: '$850,000',
    location: 'New York, NY',
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: {house2},
    featured: false,
    type: 'For Sale',
    yearBuilt: 2019,
    dateAdded: '2023-06-15'
  },
  {
    id: 2,
    title: 'Modern Downtown Loft',
    price: '$850,000',
    location: 'New York, NY',
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: {house2},
    featured: false,
    type: 'For Sale',
    yearBuilt: 2019,
    dateAdded: '2023-06-15'
  },
  {
    id: 3,
    title: 'Modern Downtown Loft',
    price: '$850,000',
    location: 'New York, NY',
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: {house2},
    featured: false,
    type: 'For Sale',
    yearBuilt: 2019,
    dateAdded: '2023-06-15'
  },
  {
    id: 4,
    title: 'Modern Downtown Loft',
    price: '$850,000',
    location: 'New York, NY',
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: {house2},
    featured: false,
    type: 'For Sale',
    yearBuilt: 2019,
    dateAdded: '2023-06-15'
  },
  // Add more latest properties...
];

export const recentlySold = [
  {
    id: 1,
    title: 'Beachfront Mansion',
    price: '$3,200,000',
    soldPrice: '$3,100,000',
    location: 'Miami Beach, FL',
    beds: 6,
    baths: 5.5,
    sqft: 5800,
    image: {house4},
    dateSold: '2023-05-28'
  },
  {
    id: 2,
    title: 'Beachfront Mansion',
    price: '$3,200,000',
    soldPrice: '$3,100,000',
    location: 'Miami Beach, FL',
    beds: 6,
    baths: 5.5,
    sqft: 5800,
    image: {house4},
    dateSold: '2023-05-28'
  },
  {
    id: 3,
    title: 'Beachfront Mansion',
    price: '$3,200,000',
    soldPrice: '$3,100,000',
    location: 'Miami Beach, FL',
    beds: 6,
    baths: 5.5,
    sqft: 5800,
    image: {house4},
    dateSold: '2023-05-28'
  },
  {
    id: 4,
    title: 'Beachfront Mansion',
    price: '$3,200,000',
    soldPrice: '$3,100,000',
    location: 'Miami Beach, FL',
    beds: 6,
    baths: 5.5,
    sqft: 5800,
    image: {house4},
    dateSold: '2023-05-28'
  },
  // Add more recently sold properties...
];
