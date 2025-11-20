import { Router } from 'express';

import { healthController } from '../controllers/health.controller';
import { createItem, getItems, getItemById } from '../controllers/item.controller';

export const router = Router();

router.get('/health', healthController);

// Item routes
router.post('/items', createItem);
router.get('/items', getItems);
router.get('/items/:id', getItemById);

