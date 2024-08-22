// routes/eventRoutes.ts
import { Router } from 'express';
import { handleTrackEvent } from './mixpanelController';

const router = Router();

router.post('/track', handleTrackEvent);

export default router;
