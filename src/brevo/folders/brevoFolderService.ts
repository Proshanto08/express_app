import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://api.brevo.com/v3';
const API_KEY = process.env.BREVO_API_KEY;

const brevoClient = axios.create({
  baseURL: API_URL,
  headers: {
    'api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

interface BrevoResponse {
  status: number;
  data?: any;
  message?: string;
}

export const createFolder = async (name: string): Promise<BrevoResponse> => {
  try {
    const response: AxiosResponse = await brevoClient.post('/contacts/folders', { name });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const getFolders = async (): Promise<BrevoResponse> => {
  try {
    const response: AxiosResponse = await brevoClient.get('/contacts/folders');
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const getFolderById = async (id: number): Promise<BrevoResponse> => {
  try {
    const response: AxiosResponse = await brevoClient.get(`/contacts/folders/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const updateFolder = async (id: number, name: string): Promise<BrevoResponse> => {
  try {
    const response: AxiosResponse = await brevoClient.put(`/contacts/folders/${id}`, { name });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const deleteFolder = async (id: number): Promise<BrevoResponse> => {
  try {
    const response: AxiosResponse = await brevoClient.delete(`/contacts/folders/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message };
    }
    return { status: 500, message: 'Unknown error' };
  }
};

export const getListsInFolder = async (folderId: number): Promise<BrevoResponse> => {
  try {
    const response: AxiosResponse = await brevoClient.get(`/contacts/folders/${folderId}/lists`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, message: error.response?.data?.message || 'Unknown error' };
    }
    return { status: 500, message: 'Unknown error' };
  }
};
