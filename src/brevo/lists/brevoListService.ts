import { initializeBrevoClient } from '../../config/brevoConfig';
import { CreateList } from 'sib-api-v3-sdk';

interface IApiResponse {
  status: number;
  errorCode?: string;
  message?: string;
  data: any;
}

export const getAllLists = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
      const response = await apiInstance.getLists({ limit, offset, sort });
      return {
          status: 200,
          data: response,
          message: 'Lists retrieved successfully',
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

export const createList = async (name: string, folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const createList = new CreateList();
    createList.name = name;
    createList.folderId = folderId;

    const response = await apiInstance.createList(createList);
    return {
      status: 201,
      data: response,
      message: 'List successfully created',
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

export const getList = async (listId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.getList(listId);
    return {
      status: 200,
      data: response,
      message: 'List details retrieved successfully',
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

export const updateList = async (listId: number, name: string, folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const updateList = new CreateList();
    updateList.name = name;
    updateList.folderId = folderId;

    await apiInstance.updateList(listId, updateList);
    return {
      status: 204,
      data: {},
      message: 'List successfully updated',
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

export const deleteList = async (listId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    await apiInstance.deleteList(listId);
    return {
      status: 204,
      data: {},
      message: 'List successfully deleted',
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


export const getContactsFromList = async (
  listId: number,
  modifiedSince?: string,
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
      const response = await apiInstance.getContactsFromList(listId, {
          modifiedSince,
          limit,
          offset,
          sort
      });
      return {
          status: 200,
          data: response,
          message: 'Contacts retrieved successfully',
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

export const addContactsToList = async (
  listId: number,
  emails: string[]
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const contactEmails = { emails };
    const response = await apiInstance.addContactToList(listId, contactEmails);
    return {
      status: 201,
      data: response,
      message: 'Contacts added to the list successfully',
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

export const removeContactsFromList = async (
  listId: number,
  emails: string[],
  removeAll?: boolean
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const contactEmails = {
      emails,
      all: removeAll ? 'true' : 'false',
    };
    const response = await apiInstance.removeContactFromList(listId, contactEmails);
    return {
      status: 201,
      data: response,
      message: 'Contacts removed from the list successfully',
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
