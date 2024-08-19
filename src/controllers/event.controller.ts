// src/controllers/event.controller.ts

import { Request, Response } from 'express';
import { MixpanelService } from '../services/mixpanel.service';

export class EventController {
    private mixpanelService: MixpanelService;

    constructor() {
        this.mixpanelService = new MixpanelService();
    }

    public trackEvent = async (req: Request, res: Response): Promise<void> => {
        const { eventName, properties } = req.body;

        if (!eventName || !properties) {
            res.status(400).json({ error: 'Event name and properties are required.' });
            return;
        }

        try {
            await this.mixpanelService.trackEvent(eventName, properties);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to track event.' });
        }
    };
}
