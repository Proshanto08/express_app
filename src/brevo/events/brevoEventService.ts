// brevoEventService.ts

import axios from 'axios';

const brevoClient = axios.create({
  baseURL: 'https://api.brevo.com/v3',
  headers: {
    'api-key': process.env.BREVO_API_KEY || '',
    'Content-Type': 'application/json',
  },
});

interface EventIdentifiers {
  email_id?: string;
  ext_id?: string;
}

interface ContactProperties {
  [key: string]: any;
}

interface EventProperties {
  [key: string]: any;
}

interface CreateEventParams {
  event_name: string;
  event_date?: string;
  identifiers: EventIdentifiers;
  contact_properties?: ContactProperties;
  event_properties?: EventProperties;
}

export const createEvent = async (params: CreateEventParams) => {
  try {
    const response = await brevoClient.post('/events', params);
    
    return {
      status: 200,
      message: 'Event successfully posted',
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'Unknown error',
        errorDetails: error.response?.data || {},
      };
    }
    return { status: 500, message: 'Unknown error' };
  }
};
