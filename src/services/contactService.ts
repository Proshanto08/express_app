import Contact from '../models/contactModel';
import List from '../models/listModel';
import { IContact } from '../models/contactModel';

 // Create the new contact
export const createContact = async (firstName: string, lastName: string, email: string, sms: string, whatsapp: string , company: string, timezone: string, listId: string): Promise<IContact> => {
  const contact = new Contact({ firstName, lastName, email, sms, whatsapp, company, timezone, listId });
  await contact.save();

  await List.findByIdAndUpdate(
    listId,
    { $push: { contacts: contact._id } },
    { new: true }
  );

  return contact;
};

export const getContactsByListId = async (listId: string): Promise<IContact[]> => {
  return await Contact.find({ listId });
};

export const getContactById = async (id: string): Promise<IContact | null> => {
  return await Contact.findById(id);
};

export const updateContact = async (id: string, firstName: string, lastName: string, email: string, sms: string, whatsapp: string, company: string, timezone: string ): Promise<IContact | null> => {
  return await Contact.findByIdAndUpdate(
    id,
    { firstName, lastName, email, sms, whatsapp, company, timezone },
    { new: true }
  );
};

export const deleteContact = async (id: string): Promise<IContact | null> => {
  return await Contact.findByIdAndDelete(id);
};
