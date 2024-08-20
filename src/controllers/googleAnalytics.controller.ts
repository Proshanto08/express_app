// src/controllers/googleAnalytics.controller.ts

import { Request, Response } from 'express';
import { GoogleAnalyticsService } from '../services/googleAnalytics.service';

export class GoogleAnalyticsController {
    private googleAnalyticsService: GoogleAnalyticsService;

    constructor() {
        this.googleAnalyticsService = new GoogleAnalyticsService();
    }

    public trackEvent = async (req: Request, res: Response): Promise<void> => {
        const { category, action, label, value } = req.body;

        if (!category || !action) {
            res.status(400).json({ error: 'Category and action are required.' });
            return;
        }

        try {
            await this.googleAnalyticsService.trackEvent(category, action, label, value);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to track event.' });
        }
    };
}
