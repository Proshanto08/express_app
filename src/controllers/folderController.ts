import { Request, Response } from 'express';
import { createFolder, getAllFolders, getFolderById, updateFolder, deleteFolder } from '../services/folderService';
import { IFolder } from '../models/folderModel';

// Create a new folder
export const createFolderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    const folder: IFolder = await createFolder(name);
    res.status(201).json(folder);
  } catch (err) {
    console.error('Error creating folder:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all folders
export const getAllFoldersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const folders: IFolder[] = await getAllFolders();
    res.status(200).json(folders);
  } catch (err) {
    console.error('Error fetching folders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a folder by ID
export const getFolderByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const folder: IFolder | null = await getFolderById(req.params.id);
    if (!folder) {
      res.status(404).json({ error: 'Folder not found' });
      return;
    }
    res.status(200).json(folder);
  } catch (err) {
    console.error('Error fetching folder:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a folder by ID
export const updateFolderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;
 
    const folder: IFolder | null = await updateFolder(req.params.id, name);
    if (!folder) {
      res.status(404).json({ error: 'Folder not found' });
      return;
    }
    res.status(200).json(folder);
  } catch (err) {
    console.error('Error updating folder:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a folder by ID
export const deleteFolderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const folder: IFolder | null = await deleteFolder(req.params.id);
    if (!folder) {
      res.status(404).json({ error: 'Folder not found' });
      return;
    }
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (err) {
    console.error('Error deleting folder:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
