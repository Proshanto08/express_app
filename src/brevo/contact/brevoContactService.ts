import { initializeBrevoClient } from '../../config/brevoConfig';
import { CreateContact, UpdateContact } from 'sib-api-v3-sdk';

interface IApiResponse {
  status: number;
  errorCode?: string;
  message?: string;
  data: any;
}

export const getAllContacts = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.getContacts(limit, offset, sort );
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

export const createContact = async (
  email: string,
  attributes: object,
  listIds?: number[],
  updateEnabled?: boolean
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const contact = new CreateContact();
    contact.email = email;
    contact.attributes = attributes;
    if (listIds) contact.listIds = listIds;
    if (updateEnabled) contact.updateEnabled = updateEnabled;

    const response = await apiInstance.createContact(contact);
    return {
      status: 201,
      data: response,
      message: 'Contact successfully created',
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


export const getContactById = async (
  identifier: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.getContactInfo(identifier);
    return {
      status: 200,
      data: response,
      message: 'Contact details retrieved successfully',
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

export const updateContact = async (
  identifier: string,
  email?: string,
  attributes?: object,
  listIds?: number[],
  updateEnabled?: boolean
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const contact = new UpdateContact();
    if (email) contact.email = email;
    if (attributes) contact.attributes = attributes;
    if (listIds) contact.listIds = listIds;
    if (updateEnabled) contact.updateEnabled = updateEnabled;

    await apiInstance.updateContact(identifier, contact);
    return {
      status: 204,
      data: {},
      message: 'Contact successfully updated',
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

export const deleteContact = async (
  identifier: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    await apiInstance.deleteContact(identifier);
    return {
      status: 204,
      data: {},
      message: 'Contact successfully deleted',
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
