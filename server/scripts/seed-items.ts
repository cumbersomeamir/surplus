import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Item } from '../src/models/Item.model';

dotenv.config({ path: '.env.staging' });

const seedItems = [
  {
    title: 'Pret - Trafalgar Square South',
    subtitle: 'Breakfast Bag',
    collectWindow: 'today 16:00 - 16:30',
    distance: '58 m',
    currentPrice: '£3.00',
    originalPrice: '£9.00',
    imageUri: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=800&q=80',
    rating: '4.9',
    availabilityLabel: 'Sold out',
    reviewCount: 45,
    description: 'A selection of delicious freshly made flatbreads, paninis, salad boxes, cakes, pastries and much more.',
    category: 'Meals',
    address: 'Trafalgar Square South, London',
    collectionExperience: 4.8,
    foodQuality: 4.9,
    collectionDay: 'Today',
  },
  {
    title: 'Sidequest Gamers Hub - Charing Cross',
    subtitle: 'Bubble Tea Surprise Bag',
    collectWindow: 'tomorrow 10:30 - 11:00',
    distance: '561 m',
    currentPrice: '£4.00',
    originalPrice: '£12.00',
    imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    rating: '4.7',
    availabilityLabel: 'New',
    reviewCount: 32,
    description: 'A selection of bubble teas and snacks from our gaming hub.',
    category: 'Drinks',
    address: 'Charing Cross, London',
    collectionExperience: 4.6,
    foodQuality: 4.7,
    collectionDay: 'Tomorrow',
  },
  {
    title: 'Caffè Nero - Trafalgar Sq',
    subtitle: 'Standard Bag',
    collectWindow: 'tomorrow 01:30 - 02:30',
    distance: '55 m',
    currentPrice: '£4.49',
    originalPrice: '£10.00',
    imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    rating: '4.2',
    availabilityLabel: '1 left',
    reviewCount: 20,
    description: 'A selection of delicious freshly made flatbreads, paninis, salad boxes, cakes, pastries and much more.',
    category: 'Meals',
    address: '60-61 Trafalgar Square, St. James\'s, London WC2N 5DS, UK',
    collectionExperience: 4.5,
    foodQuality: 4.2,
    collectionDay: 'Tomorrow',
  },
  {
    title: 'Pret - Trafalgar Square South',
    subtitle: 'Lunch Bag',
    collectWindow: 'today 20:00 - 20:30',
    distance: '58 m',
    currentPrice: '£4.00',
    originalPrice: '£12.00',
    imageUri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    rating: '4.3',
    availabilityLabel: 'Selling fast',
    reviewCount: 35,
    description: 'A selection of lunch items including soups, sandwiches, and salads.',
    category: 'Meals',
    address: 'Trafalgar Square South, London',
    collectionExperience: 4.4,
    foodQuality: 4.3,
    isSellingFast: true,
    collectionDay: 'Today',
  },
  {
    title: 'The Trafalgar St. James London, Curio Collection by Hilton - Victoria',
    subtitle: 'Small Baked goods',
    collectWindow: 'today 16:00 - 16:30',
    distance: '99 m',
    currentPrice: '£3.00',
    originalPrice: '£9.00',
    imageUri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    rating: '4.2',
    availabilityLabel: '2 left',
    reviewCount: 28,
    description: 'A selection of freshly baked pastries, croissants, and cakes.',
    category: 'Bread & pastries',
    address: 'Victoria, London',
    collectionExperience: 4.3,
    foodQuality: 4.2,
    collectionDay: 'Today',
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/surplus';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Insert seed items
    for (const itemData of seedItems) {
      const existingItem = await Item.findOne({ title: itemData.title, subtitle: itemData.subtitle });
      if (!existingItem) {
        const item = new Item(itemData);
        await item.save();
        console.log(`✅ Created item: ${itemData.title} - ${itemData.subtitle}`);
      } else {
        console.log(`⏭️  Skipped existing item: ${itemData.title} - ${itemData.subtitle}`);
      }
    }

    console.log('✅ Seed completed successfully');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();

