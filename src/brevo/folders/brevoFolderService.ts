import { initializeBrevoClient } from '../../config/brevoConfig';

interface IApiResponse {
  status: number;
  errorCode?: string;
  message?: string;
  data: any;
}

export const createFolder = async (name: string): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.createFolder({ name });
    return {
      status: 201,
      data: response,
      message: 'Folder successfully created',
    };
  } catch (error: any) {
    return {
      status: error.status,
      errorCode: error.errorCode,
      message: error.message,
      data: {},
    };
  }
};

// // Get All Folders
// export const getFolders = async (): Promise<IApiResponse> => {
//   const apiInstance = initializeBrevoClient();

//   try {
//     const data = await apiInstance.getFolders();
//     return {
//       status: 200,
//       data: data,
//       message: 'Folders retrieved successfully',
//     };
//   } catch (error: any) {
//     console.error('Error retrieving folders:', error);

//     return {
//       status: error.status || 500,
//       errorCode: 'BREVO_API_ERROR',
//       message: error.response?.body?.message || 'An unknown error occurred while retrieving folders.',
//       data: {},
//     };
//   }
// };

// // Get a Folder by ID
// export const getFolderById = async (id: number): Promise<IApiResponse> => {
//   const apiInstance = initializeBrevoClient();

//   try {
//     const data = await apiInstance.getFolder(id);
//     return {
//       status: 200,
//       data: data,
//       message: 'Folder retrieved successfully',
//     };
//   } catch (error: any) {
//     console.error(`Error retrieving folder with ID ${id}:`, error);

//     return {
//       status: error.status || 500,
//       errorCode: 'BREVO_API_ERROR',
//       message: error.response?.body?.message || `An unknown error occurred while retrieving folder with ID ${id}.`,
//       data: {},
//     };
//   }
// };

// // Update a Folder
// export const updateFolder = async (id: number, name: string): Promise<IApiResponse> => {
//   const apiInstance = initializeBrevoClient();
//   let updateFolder = new SibApiV3Sdk.CreateUpdateFolder();
//   updateFolder.name = name;

//   try {
//     const data = await apiInstance.updateFolder(id, updateFolder);
//     return {
//       status: 200,
//       data: data,
//       message: 'Folder updated successfully',
//     };
//   } catch (error: any) {
//     console.error(`Error updating folder with ID ${id}:`, error);

//     return {
//       status: error.status || 500,
//       errorCode: 'BREVO_API_ERROR',
//       message: error.response?.body?.message || `An unknown error occurred while updating folder with ID ${id}.`,
//       data: {},
//     };
//   }
// };

// // Delete a Folder
// export const deleteFolder = async (id: number): Promise<IApiResponse> => {
//   const apiInstance = initializeBrevoClient();

//   try {
//     const data = await apiInstance.deleteFolder(id);
//     return {
//       status: 204,
//       data: data,
//       message: 'Folder deleted successfully',
//     };
//   } catch (error: any) {
//     console.error(`Error deleting folder with ID ${id}:`, error);

//     return {
//       status: error.status || 500,
//       errorCode: 'BREVO_API_ERROR',
//       message: error.response?.body?.message || `An unknown error occurred while deleting folder with ID ${id}.`,
//       data: {},
//     };
//   }
// };

// // Get Lists in a Folder
// export const getListsInFolder = async (folderId: number): Promise<IApiResponse> => {
//   const apiInstance = initializeBrevoClient();

//   try {
//     const data = await apiInstance.getFolderLists(folderId);
//     return {
//       status: 200,
//       data: data,
//       message: 'Lists retrieved successfully',
//     };
//   } catch (error: any) {
//     console.error(`Error retrieving lists in folder with ID ${folderId}:`, error);

//     return {
//       status: error.status || 500,
//       errorCode: 'BREVO_API_ERROR',
//       message: error.response?.body?.message || `An unknown error occurred while retrieving lists in folder with ID ${folderId}.`,
//       data: {},
//     };
//   }
// };




// export const getFolders = async (): Promise<IApiResponse> => {
//   try {
//     const response: AxiosResponse = await brevoClient.get('/contacts/folders');
//     return { status: response.status, data: response.data };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return { status: error.response?.status || 500, message: error.response?.data?.message };
//     }
//     return { status: 500, message: 'Unknown error' };
//   }
// };

// export const getFolderById = async (id: number): Promise<IApiResponse> => {
//   try {
//     const response: AxiosResponse = await brevoClient.get(`/contacts/folders/${id}`);
//     return { status: response.status, data: response.data };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return { status: error.response?.status || 500, message: error.response?.data?.message };
//     }
//     return { status: 500, message: 'Unknown error' };
//   }
// };

// export const updateFolder = async (id: number, name: string): Promise<IApiResponse> => {
//   try {
//     const response: AxiosResponse = await brevoClient.put(`/contacts/folders/${id}`, { name });
//     return { status: response.status, data: response.data };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return { status: error.response?.status || 500, message: error.response?.data?.message };
//     }
//     return { status: 500, message: 'Unknown error' };
//   }
// };

// export const deleteFolder = async (id: number): Promise<IApiResponse> => {
//   try {
//     const response: AxiosResponse = await brevoClient.delete(`/contacts/folders/${id}`);
//     return { status: response.status, data: response.data };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return { status: error.response?.status || 500, message: error.response?.data?.message };
//     }
//     return { status: 500, message: 'Unknown error' };
//   }
// };

// export const getListsInFolder = async (folderId: number): Promise<IApiResponse> => {
//   try {
//     const response: AxiosResponse = await brevoClient.get(`/contacts/folders/${folderId}/lists`);
//     return { status: response.status, data: response.data };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return { status: error.response?.status || 500, message: error.response?.data?.message || 'Unknown error' };
//     }
//     return { status: 500, message: 'Unknown error' };
//   }
// };
