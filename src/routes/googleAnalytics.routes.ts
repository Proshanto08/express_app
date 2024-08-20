// src/routes/googleAnalytics.routes.ts

import { Router } from 'express';
import { GoogleAnalyticsController } from '../controllers/googleAnalytics.controller';

const router = Router();
const googleAnalyticsController = new GoogleAnalyticsController();

router.post('/track', googleAnalyticsController.trackEvent);

export default router;
