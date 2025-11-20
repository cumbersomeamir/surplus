import { Request, Response } from 'express';
import { Item, IItem } from '../models/Item.model';
import { StatusCodes } from 'http-status-codes';

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemData: Partial<IItem> = req.body;

    const item = new Item(itemData);
    await item.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: item,
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

    res.status(StatusCodes.OK).json({
      success: true,
      data: items,
      count: items.length,
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

    res.status(StatusCodes.OK).json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to fetch item',
      error,
    });
  }
};

