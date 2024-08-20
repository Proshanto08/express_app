// src/services/googleAnalytics.service.ts

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class GoogleAnalyticsService {
    private readonly apiUrl = 'https://www.google-analytics.com/collect';
    private readonly trackingId = process.env.GA_TRACKING_ID || '';
    
    public async trackEvent(category: string, action: string, label?: string, value?: number): Promise<void> {
        if (!this.trackingId) {
            console.error('Google Analytics Tracking ID is missing.');
            return;
        }

        const params = new URLSearchParams({
            v: '1', // API Version.
            tid: this.trackingId, // Tracking ID.
            cid: '555', // Anonymous Client ID.
            t: 'event', // Event hit type.
            ec: category, // Event Category.
            ea: action, // Event Action.
            el: label || '', // Event label.
            ev: value ? value.toString() : '', // Event value.
        });

        try {
            await axios.post(this.apiUrl, params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        } catch (error) {
            console.error('Error tracking event to Google Analytics:', error);
        }
    }
}
