import { Request, Response } from 'express';
import { Item, IItem } from '../models/Item.model';
import { StatusCodes } from 'http-status-codes';

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemData: Partial<IItem> = req.body;

    const item = new Item(itemData);
    await item.save();

    // Format item to match frontend BagData structure
    const formattedItem = {
      id: item._id.toString(),
      title: item.title,
      subtitle: item.subtitle,
      collectWindow: item.collectWindow,
      distance: item.distance,
      currentPrice: item.currentPrice,
      originalPrice: item.originalPrice,
      imageUri: item.imageUri,
      rating: item.rating,
      reviewCount: item.reviewCount,
      badge: item.badge,
      availabilityLabel: item.availabilityLabel,
      description: item.description,
      category: item.category,
      address: item.address,
      collectionExperience: item.collectionExperience,
      foodQuality: item.foodQuality,
      variety: item.variety,
      quantity: item.quantity,
      isSellingFast: item.isSellingFast,
      collectionDay: item.collectionDay,
    };

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: formattedItem,
      message: 'Item created successfully',
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message || 'Failed to create item',
      error: error.errors || error,
    });
  }
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const query = category && category !== 'All' ? { category } : {};

    const items = await Item.find(query).sort({ createdAt: -1 });

    // Format items to match frontend BagData structure
    const formattedItems = items.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      subtitle: item.subtitle,
      collectWindow: item.collectWindow,
      distance: item.distance,
      currentPrice: item.currentPrice,
      originalPrice: item.originalPrice,
      imageUri: item.imageUri,
      rating: item.rating,
      reviewCount: item.reviewCount,
      badge: item.badge,
      availabilityLabel: item.availabilityLabel,
      description: item.description,
      category: item.category,
      address: item.address,
      collectionExperience: item.collectionExperience,
      foodQuality: item.foodQuality,
      variety: item.variety,
      quantity: item.quantity,
      isSellingFast: item.isSellingFast,
      collectionDay: item.collectionDay,
    }));

    res.status(StatusCodes.OK).json({
      success: true,
      data: formattedItems,
      count: formattedItems.length,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to fetch items',
      error,
    });
  }
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Item not found',
      });
      return;
    }

    // Format item to match frontend BagData structure
    const formattedItem = {
      id: item._id.toString(),
      title: item.title,
      subtitle: item.subtitle,
      collectWindow: item.collectWindow,
      distance: item.distance,
      currentPrice: item.currentPrice,
      originalPrice: item.originalPrice,
      imageUri: item.imageUri,
      rating: item.rating,
      reviewCount: item.reviewCount,
      badge: item.badge,
      availabilityLabel: item.availabilityLabel,
      description: item.description,
      category: item.category,
      address: item.address,
      collectionExperience: item.collectionExperience,
      foodQuality: item.foodQuality,
      variety: item.variety,
      quantity: item.quantity,
      isSellingFast: item.isSellingFast,
      collectionDay: item.collectionDay,
    };

    res.status(StatusCodes.OK).json({
      success: true,
      data: formattedItem,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to fetch item',
      error,
    });
  }
};

