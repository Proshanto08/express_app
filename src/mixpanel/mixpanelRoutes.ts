import { Router } from 'express';
import {trackEvent ,clearDistinctId} from './mixpanelController';

const router = Router();

router.post('/track-event', trackEvent);
router.post('/clear-distinct-id', clearDistinctId);


export default router;
