import { Request, Response } from 'express';
import { createList, getLists, getListById, updateList, deleteList } from './brevoListService';

export const createListController = async (req: Request, res: Response): Promise<Response> => {
  const { name, folderId } = req.body;

  if (!folderId) {
    return res.status(400).json({ error: 'Bad request', message: 'Folder id is missing' });
  }

  const result = await createList(name, folderId);

  if (result.status === 201) {
    return res.status(201).json({ message: 'List successfully created', data: result.data });
  } else if (result.status === 400) {
    return res.status(400).json({ error: 'Bad request', message: result.message });
  } else {
    return res.status(result.status).json({ error: 'Internal server error', message: result.message });
  }
};

export const getListsController = async (_req: Request, res: Response): Promise<Response> => {
  const result = await getLists();

  if (result.status === 200) {
    return res.status(200).json({ message: 'Lists retrieved successfully', data: result.data });
  } else if (result.status === 400) {
    return res.status(400).json({ error: 'Bad request', message: result.message });
  } else {
    return res.status(result.status).json({ error: 'Internal server error', message: result.message });
  }
};

export const getListByIdController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const result = await getListById(Number(id));

  if (result.status === 200) {
    return res.status(200).json({ message: 'List details retrieved successfully', data: result.data });
  } else if (result.status === 400) {
    return res.status(400).json({ error: 'Bad request', message: result.message });
  } else {
    return res.status(result.status).json({ error: 'Internal server error', message: result.message });
  }
};

export const updateListController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await updateList(Number(id), name);

  if (result.status === 204) {
    return res.status(200).json({ message: 'List successfully updated' });
  } else if (result.status === 400) {
    return res.status(400).json({ error: 'Bad request', message: result.message });
  } else {
    return res.status(result.status).json({ error: 'Internal server error', message: result.message });
  }
};

export const deleteListController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const result = await deleteList(Number(id));

  if (result.status === 204) {
    return res.status(200).json({ message: 'List successfully deleted' });
  } else if (result.status === 400) {
    return res.status(400).json({ error: 'Bad request', message: result.message });
  } else {
    return res.status(result.status).json({ error: 'Internal server error', message: result.message });
  }
};
