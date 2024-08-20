import { Router } from 'express';
import { handleCreateEvent } from './brevoEventController'; // Adjust the import path as needed

const router = Router();

router.post('/events', handleCreateEvent);

export default router;
