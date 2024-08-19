import axios from 'axios';

interface IContactAttributes {
  [key: string]: any; 
}

interface IApiResponse {
  status: number;
  data?: any;
  message?: string;
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
      return false; 
    }
    throw error; 
  }
};

export const createContact = async (
  email?: string, 
  extId?: string, 
  SMS?: string, 
  whatsapp?: string, 
  landlineNumber?: string, 
  attributes?: IContactAttributes, 
  listIds?: number[]
): Promise<IApiResponse> => {
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
      };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const getAllContacts = async (): Promise<IApiResponse> => {
  try {
    const response = await brevoClient.get('/contacts');
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'Unknown error',
      };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const getContact = async (identifier: string): Promise<IApiResponse> => {
  try {
    const response = await brevoClient.get(`/contacts/${identifier}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'Unknown error',
      };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const updateContact = async (
  identifier: string, 
  attributes?: IContactAttributes, 
  listIds?: number[]
): Promise<IApiResponse> => {
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

    await brevoClient.put(`/contacts/${identifier}`, { attributes, listIds });
    return {
      status: 204,
      message:  'Contact successfully updated'
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'Unknown error',
      };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const deleteContact = async (identifier: string): Promise<IApiResponse> => {
  try {
    await brevoClient.delete(`/contacts/${identifier}`);
    return {
      status: 204,
      message:  'Contact successfully updated'
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'Unknown error',
      };
    }
    return { status: 500, message: 'Unknown error' };
  }
};
