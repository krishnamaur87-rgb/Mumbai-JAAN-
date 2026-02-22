import type { MenuItem } from './types';

// Shared menu items used by both web and mobile app
export const MENU_ITEMS: MenuItem[] = [
  // Biryani
  {
    id: '1',
    name: 'Hyderabadi Biryani',
    price: 299,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940571ce?w=500&h=500&fit=crop',
    description: 'Authentic Hyderabadi biryani with fragrant basmati rice and tender meat',
  },
  {
    id: '2',
    name: 'Lucknowi Biryani',
    price: 329,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=500&h=500&fit=crop',
    description: 'Royal Lucknowi style biryani with marinated meat and fragrant spices',
  },
  {
    id: '3',
    name: 'Kacchi Biryani',
    price: 349,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1585937421612-a0f3cb41d00f?w=500&h=500&fit=crop',
    description: 'Traditional raw meat biryani cooked in sealed pot',
  },
  {
    id: '4',
    name: 'Paneer Biryani',
    price: 249,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop',
    description: 'Vegetarian delight with cottage cheese and aromatic rice',
  },
  // Appetizers
  {
    id: '5',
    name: 'Seekh Kabab',
    price: 199,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1606787620884-c3886b3f58e7?w=500&h=500&fit=crop',
    description: 'Grilled minced meat skewers with spices',
  },
  {
    id: '6',
    name: 'Shami Kabab',
    price: 189,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd0b5b1?w=500&h=500&fit=crop',
    description: 'Crispy patties of minced meat and lentils',
  },
  {
    id: '7',
    name: 'Samosa',
    price: 79,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1585238341710-4b4e6db51910?w=500&h=500&fit=crop',
    description: 'Golden fried pastry with spiced filling',
  },
  // Desserts
  {
    id: '8',
    name: 'Kheer',
    price: 99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    description: 'Rice pudding with cardamom and nuts',
  },
  {
    id: '9',
    name: 'Shahi Tukda',
    price: 129,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    description: 'Bread cream dessert with dry fruits',
  },
  // Beverages
  {
    id: '10',
    name: 'Masala Chai',
    price: 39,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1597318457413-6a2f9f2a7d6a?w=500&h=500&fit=crop',
    description: 'Aromatic Indian spiced tea',
  },
  {
    id: '11',
    name: 'Mango Lassi',
    price: 59,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1553305589-d2229ba7433b?w=500&h=500&fit=crop',
    description: 'Refreshing yogurt drink with mango',
  },
];

// Featured items for home page
export const FEATURED_ITEMS = [
  MENU_ITEMS[0], // Hyderabadi Biryani
  MENU_ITEMS[1], // Lucknowi Biryani
  MENU_ITEMS[3], // Paneer Biryani
];
