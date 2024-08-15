import request from 'supertest';
import express from 'express';
import { createFolderController, getAllFoldersController, getFolderByIdController, updateFolderController, deleteFolderController } from '../src/controllers/folderController';
import { createFolder, getAllFolders, getFolderById, updateFolder, deleteFolder } from '../src/services/folderService';

jest.mock('../src/services/folderService');

const app = express();
app.use(express.json());

app.post('/folders', createFolderController);
app.get('/folders', getAllFoldersController);
app.get('/folders/:id', getFolderByIdController);
app.put('/folders/:id', updateFolderController);
app.delete('/folders/:id', deleteFolderController);

describe('Folder Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a folder', async () => {
    const mockFolder = { id: '1', name: 'Test Folder' };
    (createFolder as jest.Mock).mockResolvedValue(mockFolder);

    const response = await request(app).post('/folders').send({ name: 'Test Folder' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFolder);
  });

  it('should get all folders', async () => {
    const mockFolders = [{ id: '1', name: 'Test Folder' }];
    (getAllFolders as jest.Mock).mockResolvedValue(mockFolders);

    const response = await request(app).get('/folders');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFolders);
  });

  it('should get a folder by ID', async () => {
    const mockFolder = { id: '1', name: 'Test Folder' };
    (getFolderById as jest.Mock).mockResolvedValue(mockFolder);

    const response = await request(app).get('/folders/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFolder);
  });

  it('should return an error if folder not found by ID', async () => {
    (getFolderById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/folders/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'Folder not found' });
  });

  it('should update a folder', async () => {
    const mockFolder = { id: '1', name: 'Updated Folder' };
    (updateFolder as jest.Mock).mockResolvedValue(mockFolder);

    const response = await request(app).put('/folders/1').send({ name: 'Updated Folder' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFolder);
  });

  it('should return an error if folder not found for update', async () => {
    (updateFolder as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put('/folders/1').send({ name: 'Updated Folder' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'Folder not found' });
  });

  it('should delete a folder', async () => {
    const mockFolder = { id: '1', name: 'Test Folder' };
    (deleteFolder as jest.Mock).mockResolvedValue(mockFolder);

    const response = await request(app).delete('/folders/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Folder deleted successfully' });
  });

  it('should return an error if folder not found for deletion', async () => {
    (deleteFolder as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete('/folders/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'Folder not found' });
  });
});
