// src/services/mixpanel.service.ts

import axios from 'axios';
import { mixpanelConfig } from '../config/mixpanel.config';

interface EventProperties {
    [key: string]: any;
}

export class MixpanelService {
    private readonly headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    public async trackEvent(eventName: string, properties: EventProperties): Promise<void> {
        const data = new URLSearchParams({
            data: JSON.stringify({
                event: eventName,
                properties: {
                    ...properties,
                    token: mixpanelConfig.projectToken,
                },
            }),
        }).toString();

        try {
            await axios.post(mixpanelConfig.apiUrl, data, { headers: this.headers });
        } catch (error) {
            console.error('Error tracking event to Mixpanel:', error);
        }
    }
}
