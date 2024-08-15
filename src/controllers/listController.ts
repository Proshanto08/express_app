import { Request, Response } from 'express';
import { createList, getAllLists, getListById, updateList, deleteList } from '../services/listService';
import { IList } from '../models/listModel';

export const createListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, folderId } = req.body;
    const list: IList = await createList(name, folderId);
    res.json(list);
  } catch (err) {
    console.error('Error creating list:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const getAllListsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const lists: IList[] = await getAllLists();
    res.json(lists);
  } catch (err) {
    console.error('Error fetching lists:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const getListByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const list: IList | null = await getListById(req.params.id);
    if (!list) {
      res.json({ error: 'List not found' });
      return;
    }
    res.json(list);
  } catch (err) {
    console.error('Error fetching list:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const updateListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;
    const list: IList | null = await updateList(req.params.id, name);
    if (!list) {
      res.json({ error: 'List not found' });
      return;
    }
    res.json(list);
  } catch (err) {
    console.error('Error updating list:', err);
    res.json({ error: 'Internal Server Error' });
  }
};

export const deleteListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const list: IList | null = await deleteList(req.params.id);
    if (!list) {
      res.json({ error: 'List not found' });
      return;
    }
    res.json({ message: 'List deleted successfully' });
  } catch (err) {
    console.error('Error deleting list:', err);
    res.json({ error: 'Internal Server Error' });
  }
};
