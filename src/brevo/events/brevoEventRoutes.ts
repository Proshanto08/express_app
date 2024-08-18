import { Router } from 'express';
import { createEventController } from './brevoEventController';

const router = Router();

router.post('/events', createEventController);

export default router;
