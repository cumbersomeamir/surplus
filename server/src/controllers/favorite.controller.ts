import { Request, Response } from 'express';
import { Favorite, IFavorite } from '../models/Favorite.model';
import { Item } from '../models/Item.model';
import { StatusCodes } from 'http-status-codes';

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, itemId, itemData } = req.body;

    if (!username || !itemId) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Username and itemId are required',
      });
      return;
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({ username, itemId });

    if (existingFavorite) {
      res.status(StatusCodes.OK).json({
        success: true,
        data: existingFavorite,
        message: 'Item already in favorites',
      });
      return;
    }

    // If itemData not provided, try to fetch from Items collection
    let favoriteItemData = itemData;
    if (!favoriteItemData) {
      const item = await Item.findById(itemId);
      if (item) {
        favoriteItemData = item.toObject();
      }
    }

    const favorite = new Favorite({
      username,
      itemId,
      itemData: favoriteItemData || {},
    });

    await favorite.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: favorite,
      message: 'Item added to favorites',
    });
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: 'Item already in favorites',
      });
      return;
    }
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message || 'Failed to add favorite',
      error: error.errors || error,
    });
  }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, itemId } = req.body;

    if (!username || !itemId) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Username and itemId are required',
      });
      return;
    }

    const favorite = await Favorite.findOneAndDelete({ username, itemId });

    if (!favorite) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Favorite not found',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Item removed from favorites',
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to remove favorite',
      error,
    });
  }
};

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;

    if (!username) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Username is required',
      });
      return;
    }

    const favorites = await Favorite.find({ username }).sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({
      success: true,
      data: favorites,
      count: favorites.length,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to fetch favorites',
      error,
    });
  }
};

export const checkFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, itemId } = req.query;

    if (!username || !itemId) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Username and itemId are required',
      });
      return;
    }

    const favorite = await Favorite.findOne({ username, itemId: itemId as string });

    res.status(StatusCodes.OK).json({
      success: true,
      isFavorite: !!favorite,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to check favorite status',
      error,
    });
  }
};

