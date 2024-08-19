// src/routes/event.routes.ts

import { Router } from 'express';
import { EventController } from '../controllers/event.controller';

const router = Router();
const eventController = new EventController();

router.post('/track', eventController.trackEvent);

export default router;
