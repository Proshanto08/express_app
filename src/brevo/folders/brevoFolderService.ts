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
    const errorResponse = JSON.parse(error.response.text);
    return {
      status: error.status,
      errorCode: errorResponse.code,
      message: errorResponse.message,
      data: {},
    };
  }
};


export const getFolders = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.getFolders(limit, offset, sort);
    return {
      status: 200,
      data: response,
      message: 'Folders retrieved successfully',
    };
  } catch (error: any) {
    const errorResponse = JSON.parse(error.response.text);
    return {
      status: error.status,
      errorCode: errorResponse.code,
      message: errorResponse.message,
      data: {},
    };
  }
};


export const getFolder = async (folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.getFolder(folderId);
    return {
      status: 200,
      data: response,
      message: 'Folder details retrieved successfully',
    };
  } catch (error: any) {
    const errorResponse = JSON.parse(error.response.text);
    return {
      status: error.status,
      errorCode: errorResponse.code,
      message: errorResponse.message,
      data: {},
    };
  }
};


export const updateFolder = async (folderId: number, name: string): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const updateFolderRequest = {
      name
    };

    await apiInstance.updateFolder(folderId, updateFolderRequest);

    return {
      status: 204,
      data: {},
      message: 'Folder successfully updated',
    };
  } catch (error: any) {
    const errorResponse = JSON.parse(error.response.text);
    return {
      status: error.status,
      errorCode: errorResponse.code,
      message: errorResponse.message,
      data: {},
    };
  }
};


export const deleteFolder = async (folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();


  try {
    await apiInstance.deleteFolder(folderId);
    return {
      status: 204,
      data: {},
      message: 'Folder successfully deleted',
    };
  } catch (error: any) {
    const errorResponse = JSON.parse(error.response.text);
    return {
      status: error.status,
      errorCode: errorResponse.code,
      message: errorResponse.message,
      data: {},
    };
  }
};


export const getFolderLists = async (folderId: number, limit?: number, offset?: number, sort?: string ): Promise<any> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.getFolderLists(folderId,limit, offset, sort);
    return {
      status: 200,
      data: response,
      message: 'Folder lists fetched successfully',
    };
  } catch (error: any) {
    const errorResponse = JSON.parse(error.response.text);
    return {
      status: error.status,
      errorCode: errorResponse.code,
      message: errorResponse.message,
      data: {},
    };
  }
};

