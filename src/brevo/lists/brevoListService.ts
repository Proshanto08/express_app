import axios from 'axios';

const API_URL = 'https://api.brevo.com/v3';
const API_KEY = process.env.BREVO_API_KEY;

const brevoClient = axios.create({
  baseURL: API_URL,
  headers: {
    'api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

interface IApiResponse  {
  status: number;
  data?: any;
  message?: string;
}

export const createList = async (name: string, folderId: number): Promise<IApiResponse> => {
  try {
    const response = await brevoClient.post('/contacts/lists', { name, folderId });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message || 'Unknown error' };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const getLists = async (): Promise<IApiResponse> => {
  try {
    const response = await brevoClient.get('/contacts/lists');
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message || 'Unknown error' };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const getListById = async (id: number): Promise<IApiResponse> => {
  try {
    const response = await brevoClient.get(`/contacts/lists/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message || 'Unknown error' };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const updateList = async (id: number, name: string): Promise<IApiResponse> => {
  try {
    const response = await brevoClient.put(`/contacts/lists/${id}`, { name });
    return { status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message || 'Unknown error' };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const deleteList = async (id: number): Promise<IApiResponse> => {
  try {
    const response = await brevoClient.delete(`/contacts/lists/${id}`);
    return { status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message || 'Unknown error' };
    }
    return { status: 500, message: 'Unknown error' };
  }
};
