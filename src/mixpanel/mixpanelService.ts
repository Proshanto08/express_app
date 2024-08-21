import axios from 'axios';
import crypto from 'crypto';
import { mixpanelConfig } from '../config/mixpanelConfig'; // Ensure mixpanelConfig is correctly set up

interface EventProperties {
    [key: string]: any;
}

interface IApiResponse {
    status: number;
    errorCode?: string;
    message?: string;
    data?: any;
}

// Helper function to generate a distinct_id from IP address
const generateDistinctIdFromIp = (ip: string): string => {
    return crypto.createHash('md5').update(ip).digest('hex');
};

// Track Event
export const trackEvent = async (eventName: string, properties: EventProperties, ip?: string): Promise<IApiResponse> => {
    try {
        // Ensure IP is a string, fallback to an empty string if undefined
        const ipAddress = ip || '';

        // Generate distinct_id from IP address
        const distinctId = generateDistinctIdFromIp(ipAddress);

        // Ensure properties.distinct_id is set
        properties.distinct_id = distinctId;

        // Track event with Mixpanel
        await axios.post(mixpanelConfig.apiUrl, new URLSearchParams({
            data: JSON.stringify({
                event: eventName,
                properties: {
                    ...properties,
                    token: mixpanelConfig.projectToken,
                },
            }),
        }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        return { status: 200, data: { success: true }, message: 'Event tracked successfully' };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            errorCode: error.response?.data?.code,
            message: error.response?.data?.message || 'Failed to track event',
            data: {},
        };
    }
};

// Create Identity
export const createIdentity = async (identifiedId: string, anonId: string): Promise<IApiResponse> => {
    try {
        const response = await axios.post('https://api.mixpanel.com/track', new URLSearchParams({
            data: JSON.stringify({
                event: '$identify',
                properties: {
                    $identified_id: identifiedId,
                    $anon_id: anonId,
                    token: mixpanelConfig.projectToken,
                },
            }),
        }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        return { status: response.status, data: response.data, message: 'Identity created successfully' };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            errorCode: error.response?.data?.code,
            message: error.response?.data?.message || 'Failed to create identity',
            data: {},
        };
    }
};

// Create Alias
export const createAlias = async (distinctId: string, alias: string): Promise<IApiResponse> => {
    try {
        const response = await axios.post('https://api.mixpanel.com/track', new URLSearchParams({
            data: JSON.stringify({
                event: '$create_alias',
                properties: {
                    distinct_id: distinctId,
                    alias: alias,
                    token: mixpanelConfig.projectToken,
                },
            }),
        }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        return { status: response.status, data: response.data, message: 'Alias created successfully' };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            errorCode: error.response?.data?.code,
            message: error.response?.data?.message || 'Failed to create alias',
            data: {},
        };
    }
};

// Merge Identities
export const mergeIdentities = async (identifiedId: string, anonId: string): Promise<IApiResponse> => {
    try {
        const response = await axios.post('https://api.mixpanel.com/import', new URLSearchParams({
            data: JSON.stringify({
                event: '$merge',
                properties: {
                    $identified_id: identifiedId,
                    $anon_id: anonId,
                    token: mixpanelConfig.projectToken,
                },
            }),
        }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        return { status: response.status, data: response.data, message: 'Identities merged successfully' };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            errorCode: error.response?.data?.code,
            message: error.response?.data?.message || 'Failed to merge identities',
            data: {},
        };
    }
};
