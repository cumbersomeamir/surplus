import mongoose, { Schema, Document } from 'mongoose';

export interface IOnboarding extends Document {
  username: string;
  motivations: string[]; // Selected motivations from step 1
  collectionTimes: string[]; // Selected collection times from step 2
  pushNotificationsEnabled: boolean; // From step 3
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OnboardingSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      index: true,
      unique: true,
    },
    motivations: {
      type: [String],
      default: [],
    },
    collectionTimes: {
      type: [String],
      default: [],
    },
    pushNotificationsEnabled: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Onboarding = mongoose.model<IOnboarding>('Onboarding', OnboardingSchema);

