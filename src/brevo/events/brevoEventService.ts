import axios, { AxiosResponse } from 'axios';

const brevoClient = axios.create({
  baseURL: 'https://api.brevo.com/v3',
  headers: {
    'api-key': process.env.BREVO_API_KEY || '',
    'Content-Type': 'application/json',
  },
});

interface IEventIdentifiers {
  email_id?: string;
  ext_id?: string;
}

interface IContactProperties {
  [key: string]: any;
}

interface IEventProperties {
  [key: string]: any;
}

interface ICreateEventParams {
  event_name: string;
  event_date?: string;
  identifiers: IEventIdentifiers;
  contact_properties?: IContactProperties;
  event_properties?: IEventProperties;
}

interface ICreateEventResponse {
  status: number;
  message: string;
  errorDetails?: any;
}

export const createEvent = async (params: ICreateEventParams): Promise<ICreateEventResponse> => {
  try {
    await brevoClient.post('/events', params);

    return {
      status: 200,
      message: 'Event successfully posted',
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message || 'Unknown error occurred',
        errorDetails: error.response.data,
      };
    }

    return {
      status: 500,
      message: 'An unexpected error occurred',
    };
  }
};
