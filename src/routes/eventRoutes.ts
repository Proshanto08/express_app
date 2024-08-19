import { Router } from 'express';
import { createEventController, getEventsController } from '../controllers/eventController';

const router = Router();

router.post('/events', createEventController);
router.get('/events', getEventsController);

export default router;
