// src/routes/event.routes.ts

import { Router } from 'express';
import { trackEventController } from '../controllers/event.controller';

const router = Router();

router.post('/track-event', trackEventController);

export default router;
