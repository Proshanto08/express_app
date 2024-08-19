import request from 'supertest';
import express from 'express';
import { 
  createContactController, 
  getContactsByListIdController, 
  getContactByIdController, 
  updateContactController, 
  deleteContactController 
} from '../controllers/contactController';
import { 
  createContact, 
  getContactsByListId, 
  getContactById, 
  updateContact, 
  deleteContact 
} from '../services/contactService';


jest.mock('../services/contactService');

const app = express();
app.use(express.json());

app.post('/contacts', createContactController);
app.get('/contacts', getContactsByListIdController);
app.get('/contacts/:id', getContactByIdController);
app.put('/contacts/:id', updateContactController);
app.delete('/contacts/:id', deleteContactController);

describe('Contact Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a contact', async () => {
    const mockContact = { id: '1', firstName: 'Proshanto', lastName: 'Saha', email: 'proshanto@gmail.com' };
    (createContact as jest.Mock).mockResolvedValue(mockContact);

    const response = await request(app).post('/contacts').send({
      firstName: 'Proshanto',
      lastName: 'Saha',
      email: 'proshanto@gmail.com',
      sms: '1234567890',
      whatsapp: '0987654321',
      company: 'Company',
      timezone: 'UTC',
      listId: 'list1'
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockContact);
  });

  it('should get contacts by list ID', async () => {
    const mockContacts = [{ id: '1', firstName: 'Proshanto', lastName: 'Saha', email: 'proshanto@gmail.com' }];
    (getContactsByListId as jest.Mock).mockResolvedValue(mockContacts);

    const response = await request(app).get('/contacts').query({ listId: 'list1' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockContacts);
  });

  it('should get a contact by ID', async () => {
    const mockContact = { id: '1', firstName: 'Proshanto', lastName: 'Saha', email: 'proshanto@gmail.com' };
    (getContactById as jest.Mock).mockResolvedValue(mockContact);

    const response = await request(app).get('/contacts/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockContact);
  });

  it('should return an error if contact not found by ID', async () => {
    (getContactById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/contacts/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'Contact not found' });
  });

  it('should update a contact', async () => {
    const mockContact = { id: '1', firstName: 'Proshanto', lastName: 'Saha', email: 'proshanto@gmail.com' };
    (updateContact as jest.Mock).mockResolvedValue(mockContact);

    const response = await request(app).put('/contacts/1').send({
      firstName: 'Proshanto',
      lastName: 'Saha',
      email: 'proshanto@gmail.com',
      sms: '1234567890',
      whatsapp: '0987654321',
      company: 'Company',
      timezone: 'UTC'
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockContact);
  });

  it('should return an error if contact not found for update', async () => {
    (updateContact as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put('/contacts/1').send({
      firstName: 'Proshanto',
      lastName: 'Saha',
      email: 'proshanto@gmail.com',
      sms: '1234567890',
      whatsapp: '0987654321',
      company: 'Company',
      timezone: 'UTC'
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'Contact not found' });
  });

  it('should delete a contact', async () => {
    const mockContact = { id: '1', firstName: 'Proshanto', lastName: 'Saha', email: 'proshanto@gmail.com' };
    (deleteContact as jest.Mock).mockResolvedValue(mockContact);

    const response = await request(app).delete('/contacts/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Contact deleted successfully' });
  });

  it('should return an error if contact not found for deletion', async () => {
    (deleteContact as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete('/contacts/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'Contact not found' });
  });
});
