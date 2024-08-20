// src/services/mixpanel.service.ts

import axios from 'axios';
import { mixpanelConfig } from '../config/mixpanelConfig';

interface EventProperties {
    [key: string]: any;
}

interface IApiResponse {
    status: number;
    errorCode?: string;
    message?: string;
    data?: any;
}

export const trackEvent = async (eventName: string, properties: EventProperties): Promise<IApiResponse> => {
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
        await axios.post(mixpanelConfig.apiUrl, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return { status: 200, data: { success: true }, message: 'Event tracked successfully' };
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        return {
            status: error.response?.status || 500,
            errorCode: errorResponse.code,
            message: errorResponse.message || 'Failed to track event',
            data: {},
        };
    }
};
