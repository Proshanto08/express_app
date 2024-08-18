import axios from 'axios';

// Define a type for the attributes if you know the structure
interface ContactAttributes {
  [key: string]: any; // Replace 'any' with more specific types if possible
}

interface ApiResponse<T = any> {
  status: number;
  data?: T;
  message?: string;
  errorDetails?: any;
}

const brevoClient = axios.create({
  baseURL: 'https://api.brevo.com/v3',
  headers: {
    'api-key': process.env.BREVO_API_KEY, 
    'Content-Type': 'application/json',
  },
});

export const checkListExists = async (listId: number): Promise<boolean> => {
  try {
    const response = await brevoClient.get(`/contacts/lists/${listId}`);
    return response.status === 200;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false; // List does not exist
    }
    throw error; // Rethrow other errors
  }
};

export const createContact = async (
  email?: string, 
  extId?: string, 
  SMS?: string, 
  whatsapp?: string, 
  landlineNumber?: string, 
  attributes?: ContactAttributes, 
  listIds?: number[]
): Promise<ApiResponse> => {
  try {
    if (!email && !extId && !SMS && !whatsapp && !landlineNumber) {
      throw new Error('Please provide at least one contact identifier value (email, ext_id, SMS, WHATSAPP, LANDLINE_NUMBER, EXT_ID)');
    }

    if (listIds && listIds.length > 0) {
      for (const listId of listIds) {
        const listExists = await checkListExists(listId);
        if (!listExists) {
          return {
            status: 400,
            message: `List ID ${listId} does not exist`
          };
        }
      }
    }

    const response = await brevoClient.post('/contacts', { email, extId, SMS, whatsapp, landlineNumber, attributes, listIds });
    return { status: response.status, data: response.data };
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

export const getAllContacts = async (): Promise<ApiResponse> => {
  try {
    const response = await brevoClient.get('/contacts');
    return { status: response.status, data: response.data };
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

export const getContact = async (identifier: string): Promise<ApiResponse> => {
  try {
    const response = await brevoClient.get(`/contacts/${identifier}`);
    return { status: response.status, data: response.data };
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

export const updateContact = async (
  identifier: string, 
  attributes?: ContactAttributes, 
  listIds?: number[]
): Promise<ApiResponse> => {
  try {
    if (listIds && listIds.length > 0) {
      for (const listId of listIds) {
        const listExists = await checkListExists(listId);
        if (!listExists) {
          return {
            status: 400,
            message: `List ID ${listId} does not exist`
          };
        }
      }
    }

    const response = await brevoClient.put(`/contacts/${identifier}`, { attributes, listIds });
    return { status: response.status, data: response.data };
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

export const deleteContact = async (identifier: string): Promise<ApiResponse> => {
  try {
    const response = await brevoClient.delete(`/contacts/${identifier}`);
    return { status: response.status };
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
