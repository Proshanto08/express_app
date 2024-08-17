import express from 'express';
import { 
  createFolderController, 
  getAllFoldersController, 
  getFolderByIdController, 
  updateFolderController, 
  deleteFolderController,
  getListsInFolderController
} from './brevoFolderController';

const router = express.Router();

router.post('/folders', createFolderController);
router.get('/folders', getAllFoldersController);
router.get('/folders/:id', getFolderByIdController);
router.put('/folders/:id', updateFolderController);
router.delete('/folders/:id', deleteFolderController);
router.get('/folders/:folderId/lists', getListsInFolderController);

export default router;
