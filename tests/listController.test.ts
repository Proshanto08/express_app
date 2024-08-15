import request from 'supertest';
import express from 'express';
import { 
  createListController, 
  getAllListsController, 
  getListByIdController, 
  updateListController, 
  deleteListController 
} from '../src/controllers/listController';
import { 
  createList, 
  getAllLists, 
  getListById, 
  updateList, 
  deleteList 
} from '../src/services/listService';

// Mock the listService functions
jest.mock('../src/services/listService');

const app = express();
app.use(express.json());

// Define routes for testing
app.post('/lists', createListController);
app.get('/lists', getAllListsController);
app.get('/lists/:id', getListByIdController);
app.put('/lists/:id', updateListController);
app.delete('/lists/:id', deleteListController);

describe('List Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a list', async () => {
    const mockList = { id: '1', name: 'Test List', folderId: 'folder1' };
    (createList as jest.Mock).mockResolvedValue(mockList);

    const response = await request(app).post('/lists').send({ name: 'Test List', folderId: 'folder1' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockList);
  });

  it('should get all lists', async () => {
    const mockLists = [{ id: '1', name: 'Test List', folderId: 'folder1' }];
    (getAllLists as jest.Mock).mockResolvedValue(mockLists);

    const response = await request(app).get('/lists');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockLists);
  });

  it('should get a list by ID', async () => {
    const mockList = { id: '1', name: 'Test List', folderId: 'folder1' };
    (getListById as jest.Mock).mockResolvedValue(mockList);

    const response = await request(app).get('/lists/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockList);
  });

  it('should return an error if list not found by ID', async () => {
    (getListById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/lists/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'List not found' });
  });

  it('should update a list', async () => {
    const mockList = { id: '1', name: 'Updated List', folderId: 'folder1' };
    (updateList as jest.Mock).mockResolvedValue(mockList);

    const response = await request(app).put('/lists/1').send({ name: 'Updated List' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockList);
  });

  it('should return an error if list not found for update', async () => {
    (updateList as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put('/lists/1').send({ name: 'Updated List' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'List not found' });
  });

  it('should delete a list', async () => {
    const mockList = { id: '1', name: 'Test List', folderId: 'folder1' };
    (deleteList as jest.Mock).mockResolvedValue(mockList);

    const response = await request(app).delete('/lists/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'List deleted successfully' });
  });

  it('should return an error if list not found for deletion', async () => {
    (deleteList as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete('/lists/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'List not found' });
  });
});
