import { Request, Response } from 'express';
import { createContact, getContactsByListId, getContactById, updateContact, deleteContact } from '../services/contactService';
import { IContact } from '../models/contactModel';

// Create a new contact
export const createContactController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, sms, whatsapp, company, timezone, listId } = req.body;

    const contact: IContact = await createContact(firstName, lastName, email, sms, whatsapp, company, timezone, listId);
    res.status(201).json(contact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all contacts by list ID
export const getContactsByListIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts: IContact[] = await getContactsByListId(req.params.listId);
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a contact by ID
export const getContactByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact: IContact | null = await getContactById(req.params.id);
    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a contact by ID
export const updateContactController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, sms, whatsapp, company, timezone } = req.body;
    const contact: IContact | null = await updateContact(req.params.id, firstName, lastName, email, sms, whatsapp, company, timezone);
    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a contact by ID
export const deleteContactController = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact: IContact | null = await deleteContact(req.params.id);
    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
