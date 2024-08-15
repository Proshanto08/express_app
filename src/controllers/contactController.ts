import { Request, Response } from 'express';
import { createContact, getContactsByListId, getContactById, updateContact, deleteContact } from '../services/contactService';
import { IContact } from '../models/contactModel';

export const createContactController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, sms, whatsapp, company, timezone, listId } = req.body;

    const contact: IContact = await createContact(firstName, lastName, email, sms, whatsapp, company, timezone, listId);
    res.json(contact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const getContactsByListIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts: IContact[] = await getContactsByListId(req.params.listId);
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const getContactByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact: IContact | null = await getContactById(req.params.id);
    if (!contact) {
      res.json({ error: 'Contact not found' });
      return;
    }
    res.json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.json({ error: 'Internal Server Error' });
  }
};


export const updateContactController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, sms, whatsapp, company, timezone } = req.body;
    const contact: IContact | null = await updateContact(req.params.id, firstName, lastName, email, sms, whatsapp, company, timezone);
    if (!contact) {
      res.json({ error: 'Contact not found' });
      return;
    }
    res.json(contact);
  } catch (err) {
    console.error('Error updating contact:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const deleteContactController = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact: IContact | null = await deleteContact(req.params.id);
    if (!contact) {
      res.json({ error: 'Contact not found' });
      return;
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.json({ error: 'Internal Server Error' });
  }
};
