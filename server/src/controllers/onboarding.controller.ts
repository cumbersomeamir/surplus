import { Request, Response } from 'express';
import { Onboarding, IOnboarding } from '../models/Onboarding.model';
import { StatusCodes } from 'http-status-codes';

export const createOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const onboardingData: Partial<IOnboarding> = req.body;

    // Validate required fields
    if (!onboardingData.username) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Username is required',
      });
      return;
    }

    // Check if onboarding already exists for this username
    const existingOnboarding = await Onboarding.findOne({ username: onboardingData.username });

    if (existingOnboarding) {
      // Update existing onboarding
      existingOnboarding.motivations = onboardingData.motivations || [];
      existingOnboarding.collectionTimes = onboardingData.collectionTimes || [];
      existingOnboarding.pushNotificationsEnabled = onboardingData.pushNotificationsEnabled ?? false;
      existingOnboarding.completedAt = new Date();
      await existingOnboarding.save();

      res.status(StatusCodes.OK).json({
        success: true,
        data: existingOnboarding,
        message: 'Onboarding updated successfully',
      });
    } else {
      // Create new onboarding
      const onboarding = new Onboarding({
        username: onboardingData.username,
        motivations: onboardingData.motivations || [],
        collectionTimes: onboardingData.collectionTimes || [],
        pushNotificationsEnabled: onboardingData.pushNotificationsEnabled ?? false,
        completedAt: new Date(),
      });

      await onboarding.save();

      res.status(StatusCodes.CREATED).json({
        success: true,
        data: onboarding,
        message: 'Onboarding created successfully',
      });
    }
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message || 'Failed to save onboarding data',
      error: error.errors || error,
    });
  }
};

export const getOnboardingByUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;

    const onboarding = await Onboarding.findOne({ username });

    if (!onboarding) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Onboarding data not found',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: onboarding,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to fetch onboarding data',
      error,
    });
  }
};

