import { Request, Response } from 'express';
import { createList, getAllLists, getListById, updateList, deleteList } from '../services/listService';
import { IList } from '../models/listModel';

// Create a new list
export const createListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, folderId } = req.body;

    const list: IList = await createList(name, folderId);
    res.status(201).json(list);
  } catch (err) {
    console.error('Error creating list:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all lists
export const getAllListsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const lists: IList[] = await getAllLists();
    res.status(200).json(lists);
  } catch (err) {
    console.error('Error fetching lists:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a list by ID
export const getListByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const list: IList | null = await getListById(req.params.id);
    if (!list) {
      res.status(404).json({ error: 'List not found' });
      return;
    }
    res.status(200).json(list);
  } catch (err) {
    console.error('Error fetching list:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a list by ID
export const updateListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;

    const list: IList | null = await updateList(req.params.id, name);
    if (!list) {
      res.status(404).json({ error: 'List not found' });
      return;
    }
    res.status(200).json(list);
  } catch (err) {
    console.error('Error updating list:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a list by ID
export const deleteListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const list: IList | null = await deleteList(req.params.id);
    if (!list) {
      res.status(404).json({ error: 'List not found' });
      return;
    }
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (err) {
    console.error('Error deleting list:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


