import { Request, Response } from 'express';
import { createFolder } from './brevoFolderService';

export const createFolderController = async (req: Request, res: Response): Promise<void> => {
  try {
  const { name } = req.body;
    const result = await createFolder(name);
    res.status(result.status).json(result);
  } catch (error: any) {

    res.json({
      status: error.status,
      errorCode: error.code,
      message: error.message,
      data: {},
    });
  }
};


// export const getAllFoldersController = async (_req: Request, res: Response): Promise<void> => {
//   const result = await getFolders();

//   if (result.status === 200) {
//     res.status(200).json({ message: 'Folders retrieved successfully', data: result.data });
//   } else if (result.status === 400) {
//     res.status(400).json({ error: 'Bad request', message: result.message });
//   } else {
//     res.status(result.status).json({ error: 'Internal server error', message: result.message });
//   }
// };

// export const getFolderByIdController = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const result = await getFolderById(Number(id));

//   if (result.status === 200) {
//     res.status(200).json({ message: 'Folder details retrieved successfully', data: result.data });
//   } else if (result.status === 400) {
//     res.status(400).json({ error: 'Bad request', message: result.message });
//   } else {
//     res.status(result.status).json({ error: 'Internal server error', message: result.message });
//   }
// };

// export const updateFolderController = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const result = await updateFolder(Number(id), name);

//   if (result.status === 204) {
//     res.status(200).json({ message: 'Folder successfully updated' });
//   } else if (result.status === 400) {
//     res.status(400).json({ error: 'Bad request', message: result.message });
//   } else {
//     res.status(result.status).json({ error: 'Internal server error', message: result.message });
//   }
// };

// export const deleteFolderController = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const result = await deleteFolder(Number(id));

//   if (result.status === 204) {
//     res.status(200).json({ message: 'Folder successfully deleted' });
//   } else if (result.status === 400) {
//     res.status(400).json({ error: 'Bad request', message: result.message });
//   } else {
//     res.status(result.status).json({ error: 'Internal server error', message: result.message });
//   }
// };

// export const getListsInFolderController = async (req: Request, res: Response): Promise<void> => {
//   const { folderId } = req.params;
//   const result = await getListsInFolder(Number(folderId));

//   if (result.status === 200) {
//     res.status(200).json({ message: 'Lists retrieved successfully', data: result.data });
//   } else if (result.status === 400) {
//     res.status(400).json({ error: 'Bad request', message: result.message });
//   } else {
//     res.status(result.status).json({ error: 'Internal server error', message: result.message });
//   }
// };
