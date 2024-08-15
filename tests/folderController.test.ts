import request from 'supertest';
import app from '../src/app';
import { createFolder, getAllFolders, getFolderById, updateFolder, deleteFolder } from '../src/services/folderService';

jest.mock('../src/services/folderService');

describe('Folder Controller', () => {

  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      // Intentionally empty
    });
    
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createFolderController', () => {
    it('should create a new folder and return it', async () => {
      const mockFolder = { id: '1', name: 'New Folder' };
      (createFolder as jest.Mock).mockResolvedValue(mockFolder);

      const response = await request(app)
        .post('/api/folders')
        .send({ name: 'New Folder' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFolder);
      expect(createFolder).toHaveBeenCalledWith('New Folder');
    });

    it('should handle errors when creating a folder', async () => {
      (createFolder as jest.Mock).mockRejectedValue(new Error('Error creating folder'));

      const response = await request(app)
        .post('/api/folders')
        .send({ name: 'New Folder' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('getAllFoldersController', () => {
    it('should return all folders', async () => {
      const mockFolders = [{ id: '1', name: 'Folder 1' }, { id: '2', name: 'Folder 2' }];
      (getAllFolders as jest.Mock).mockResolvedValue(mockFolders);

      const response = await request(app).get('/api/folders');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFolders);
      expect(getAllFolders).toHaveBeenCalled();
    });

    it('should handle errors when fetching folders', async () => {
      (getAllFolders as jest.Mock).mockRejectedValue(new Error('Error fetching folders'));

      const response = await request(app).get('/api/folders');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('getFolderByIdController', () => {
    it('should return the folder with the given ID', async () => {
      const mockFolder = { id: '1', name: 'Folder 1' };
      (getFolderById as jest.Mock).mockResolvedValue(mockFolder);

      const response = await request(app).get('/api/folders/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFolder);
      expect(getFolderById).toHaveBeenCalledWith('1');
    });

    it('should return an error if the folder is not found', async () => {
      (getFolderById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/api/folders/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ error: 'Folder not found' });
    });

    it('should handle errors when fetching a folder by ID', async () => {
      (getFolderById as jest.Mock).mockRejectedValue(new Error('Error fetching folder'));

      const response = await request(app).get('/api/folders/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('updateFolderController', () => {
    it('should update the folder with the given ID', async () => {
      const mockFolder = { id: '1', name: 'Updated Folder' };
      (updateFolder as jest.Mock).mockResolvedValue(mockFolder);

      const response = await request(app)
        .put('/api/folders/1')
        .send({ name: 'Updated Folder' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFolder);
      expect(updateFolder).toHaveBeenCalledWith('1', 'Updated Folder');
    });

    it('should return an error if the folder is not found', async () => {
      (updateFolder as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/api/folders/1')
        .send({ name: 'Updated Folder' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ error: 'Folder not found' });
    });

    it('should handle errors when updating a folder', async () => {
      (updateFolder as jest.Mock).mockRejectedValue(new Error('Error updating folder'));

      const response = await request(app)
        .put('/api/folders/1')
        .send({ name: 'Updated Folder' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('deleteFolderController', () => {
    it('should delete the folder with the given ID', async () => {
      const mockFolder = { id: '1', name: 'Folder 1' };
      (deleteFolder as jest.Mock).mockResolvedValue(mockFolder);

      const response = await request(app).delete('/api/folders/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Folder deleted successfully' });
      expect(deleteFolder).toHaveBeenCalledWith('1');
    });

    it('should return an error if the folder is not found', async () => {
      (deleteFolder as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/api/folders/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ error: 'Folder not found' });
    });

    it('should handle errors when deleting a folder', async () => {
      (deleteFolder as jest.Mock).mockRejectedValue(new Error('Error deleting folder'));

      const response = await request(app).delete('/api/folders/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });
});
