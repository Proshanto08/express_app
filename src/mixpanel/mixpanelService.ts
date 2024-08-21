import axios from 'axios';
import { mixpanelConfig } from '../config/mixpanelConfig';

interface IEventProperties {
    [key: string]: any;
}

interface IApiResponse {
    status: number;
    errorCode?: string;
    message?: string;
    data?: any;
}

export const trackEvent = async (eventName: string, properties: IEventProperties): Promise<IApiResponse> => {
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
        const response = await axios.post(`${mixpanelConfig.apiUrl}/track`, data, { 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return { 
            status: response.status, 
            data: response.data, 
            message: 'Event tracked successfully' 
        };
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        return {
            status: error.response?.status || 500,
            errorCode: errorResponse.code || 'UNKNOWN_ERROR',
            message: errorResponse.message || 'Failed to track event',
            data: errorResponse,
        };
    }
};

export const createIdentity = async (distinctId: string, userProperties: any): Promise<IApiResponse> => {
    const data = new URLSearchParams({
        data: JSON.stringify({
            distinct_id: distinctId,
            properties: userProperties,
            token: mixpanelConfig.projectToken,
        }),
    }).toString();

    try {
        const response = await axios.post(`${mixpanelConfig.apiUrl}/track`, data, { 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return { 
            status: response.status, 
            data: response.data, 
            message: 'Identity created successfully' 
        };
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        return {
            status: error.response?.status || 500,
            errorCode: errorResponse.code || 'UNKNOWN_ERROR',
            message: errorResponse.message || 'Failed to create identity',
            data: errorResponse,
        };
    }
};

export const createAlias = async (distinctId: string, alias: string): Promise<IApiResponse> => {
    const data = new URLSearchParams({
        data: JSON.stringify({
            distinct_id: distinctId,
            alias: alias,
            token: mixpanelConfig.projectToken,
        }),
    }).toString();

    try {
        const response = await axios.post(`${mixpanelConfig.apiUrl}/track`, data, { 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return { 
            status: response.status, 
            data: response.data, 
            message: 'Alias created successfully' 
        };
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        return {
            status: error.response?.status || 500,
            errorCode: errorResponse.code || 'UNKNOWN_ERROR',
            message: errorResponse.message || 'Failed to create alias',
            data: errorResponse,
        };
    }
};

export const mergeIdentities = async (identities: any[]): Promise<IApiResponse> => {
    const data = new URLSearchParams({
        data: JSON.stringify({
            identities: identities,
            token: mixpanelConfig.projectToken,
        }),
    }).toString();

    try {
        const response = await axios.post(`${mixpanelConfig.apiUrl}/import`, data, { 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return { 
            status: response.status, 
            data: response.data, 
            message: 'Identities merged successfully' 
        };
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        return {
            status: error.response?.status || 500,
            errorCode: errorResponse.code || 'UNKNOWN_ERROR',
            message: errorResponse.message || 'Failed to merge identities',
            data: errorResponse,
        };
    }
};
