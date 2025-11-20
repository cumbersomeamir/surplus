import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  username: string;
  itemId: string; // Reference to the item
  itemData: {
    id: string;
    title: string;
    subtitle: string;
    collectWindow: string;
    distance: string;
    currentPrice: string;
    originalPrice?: string;
    imageUri: string;
    rating?: string;
    reviewCount?: number;
    badge?: string;
    availabilityLabel?: string;
    description?: string;
    category?: string;
    address?: string;
    collectionExperience?: number;
    foodQuality?: number;
    variety?: number;
    quantity?: number;
    isSellingFast?: boolean;
    collectionDay?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      index: true,
    },
    itemId: {
      type: String,
      required: [true, 'Item ID is required'],
      trim: true,
    },
    itemData: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one favorite per user per item
FavoriteSchema.index({ username: 1, itemId: 1 }, { unique: true });

export const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema);

