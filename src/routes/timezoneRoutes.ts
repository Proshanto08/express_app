import { Router } from 'express';
import { getTimezonesController } from '../controllers/timezoneController';

const router = Router();

router.get('/timezones', getTimezonesController);

export default router;
