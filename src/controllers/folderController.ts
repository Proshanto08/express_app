import { Request, Response } from 'express';
import { createFolder, getAllFolders, getFolderById, updateFolder, deleteFolder } from '../services/folderService';

export const createFolderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    const folder = await createFolder(name);
    res.json(folder);
  } catch (err) {
    console.error('Error creating folder:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const getAllFoldersController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const folders = await getAllFolders();
    res.json(folders);
  } catch (err) {
    console.error('Error fetching folders:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const getFolderByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const folder = await getFolderById(req.params.id);

    if (!folder) {
      res.json({ error: 'Folder not found' });
      return;
    }

    res.json(folder);
  } catch (err) {
    console.error('Error fetching folder:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const updateFolderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    const folder = await updateFolder(req.params.id, name);

    if (!folder) {
      res.json({ error: 'Folder not found' });
      return;
    }

    res.json(folder);
  } catch (err) {
    console.error('Error updating folder:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const deleteFolderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const folder = await deleteFolder(req.params.id);

    if (!folder) {
      res.json({ error: 'Folder not found' });
      return;
    }

    res.json({ message: 'Folder deleted successfully' });
  } catch (err) {
    console.error('Error deleting folder:', err);
    res.json({ error: 'Internal Server Error' });
  }
};
