import { Router } from 'express';

import { healthController } from '../controllers/health.controller';
import { createItem, getItems, getItemById } from '../controllers/item.controller';
import { createOnboarding, getOnboardingByUsername } from '../controllers/onboarding.controller';

export const router = Router();

router.get('/health', healthController);

// Item routes
router.post('/items', createItem);
router.get('/items', getItems);
router.get('/items/:id', getItemById);

// Onboarding routes
router.post('/onboarding', createOnboarding);
router.get('/onboarding/:username', getOnboardingByUsername);

