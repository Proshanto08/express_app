import express from 'express';
import { 
  createFolderController, 
  getAllFoldersController, 
  getFolderByIdController, 
  updateFolderController, 
  deleteFolderController 
} from '../controllers/folderController';

const router = express.Router();

router.post('/folders', createFolderController);
router.get('/folders', getAllFoldersController);
router.get('/folders/:id', getFolderByIdController);
router.put('/folders/:id', updateFolderController);
router.delete('/folders/:id', deleteFolderController);

export default router;
