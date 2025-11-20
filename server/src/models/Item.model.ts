import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  title: string; // Store name
  subtitle: string; // Item name
  collectWindow: string; // e.g., "today 16:00 - 16:30"
  distance: string; // e.g., "58 m"
  currentPrice: string; // e.g., "£4.00"
  originalPrice?: string; // e.g., "£12.00"
  imageUri: string;
  rating?: string; // e.g., "4.2"
  reviewCount?: number;
  badge?: string;
  availabilityLabel?: string; // e.g., "1 left", "Selling fast", "New"
  description?: string;
  category?: string; // e.g., "Meal", "Drinks", "Bread & pastries"
  address?: string;
  collectionExperience?: number;
  foodQuality?: number;
  variety?: number;
  quantity?: number;
  isSellingFast?: boolean;
  collectionDay?: string; // "Today" or "Tomorrow"
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Store name is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    collectWindow: {
      type: String,
      required: [true, 'Collection window is required'],
      trim: true,
    },
    distance: {
      type: String,
      required: [true, 'Distance is required'],
      trim: true,
    },
    currentPrice: {
      type: String,
      required: [true, 'Current price is required'],
      trim: true,
    },
    originalPrice: {
      type: String,
      trim: true,
    },
    imageUri: {
      type: String,
      required: [true, 'Image URI is required'],
      trim: true,
    },
    rating: {
      type: String,
      trim: true,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      trim: true,
    },
    availabilityLabel: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    collectionExperience: {
      type: Number,
      min: 0,
      max: 5,
    },
    foodQuality: {
      type: Number,
      min: 0,
      max: 5,
    },
    variety: {
      type: Number,
      min: 0,
      max: 5,
    },
    quantity: {
      type: Number,
      min: 0,
      max: 5,
    },
    isSellingFast: {
      type: Boolean,
      default: false,
    },
    collectionDay: {
      type: String,
      enum: ['Today', 'Tomorrow'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model<IItem>('Item', ItemSchema);

