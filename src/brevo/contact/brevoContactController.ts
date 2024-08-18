import { Request, Response } from 'express';
import { createContact, getContact, updateContact, deleteContact, getAllContacts } from './brevoContactService';

export const createContactController = async (req: Request, res: Response): Promise<Response> => {
  const { email, extId, SMS, whatsapp, landlineNumber, attributes, listIds } = req.body;

  try {
    const result = await createContact(email, extId, SMS, whatsapp, landlineNumber, attributes, listIds);

    if (result.status === 201) {
      return res.status(201).json({ message: 'Contact successfully created', data: result.data });
    } else if (result.status === 400) {
      return res.status(400).json({ error: 'Bad request', message: result.message });
    } else {
      return res.status(result.status).json({ error: 'Internal server error', message: result.message });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', message: 'An unexpected error occurred' });
  }
};

export const getContactController = async (req: Request, res: Response): Promise<Response> => {
  const { identifier } = req.params;

  const result = await getContact(identifier);

  if (result.status === 200) {
    return res.status(200).json({ message: 'Contact retrieved successfully', data: result.data });
  } else if (result.status === 400) {
    return res.status(400).json({ error: 'Bad request', message: result.message });
  } else {
    return res.status(result.status).json({ error: 'Internal server error', message: result.message });
  }
};

export const updateContactController = async (req: Request, res: Response): Promise<Response> => {
  const { identifier } = req.params;
  const { attributes, listIds } = req.body;

  try {
    const result = await updateContact(identifier, attributes, listIds);

    if (result.status === 204) {
      return res.status(200).json({ message: 'Contact successfully updated', data: result.data });
    } else if (result.status === 400) {
      return res.status(400).json({ error: 'Bad request', message: result.message });
    } else {
      return res.status(result.status).json({ error: 'Internal server error', message: result.message });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', message: 'An unexpected error occurred' });
  }
};

export const deleteContactController = async (req: Request, res: Response): Promise<Response> => {
  const { identifier } = req.params;

  const result = await deleteContact(identifier);

  if (result.status === 204) {
    return res.status(200).json({ message: 'Contact successfully deleted' });
  } else if (result.status === 400) {
    return res.status(400).json({ error: 'Bad request', message: result.message });
  } else {
    return res.status(result.status).json({ error: 'Internal server error', message: result.message });
  }
};

export const getAllContactsController = async (_req: Request, res: Response): Promise<Response> => {
  const result = await getAllContacts();

  if (result.status === 200) {
    return res.status(200).json({ message: 'Contacts retrieved successfully', data: result.data });
  } else if (result.status === 400) {
    return res.status(400).json({ error: 'Bad request', message: result.message });
  } else {
    return res.status(result.status).json({ error: 'Internal server error', message: result.message });
  }
};
