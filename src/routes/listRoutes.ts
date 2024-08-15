import { Router } from 'express';
import {
  createListController,
  getAllListsController,
  getListByIdController,
  updateListController,
  deleteListController,
} from '../controllers/listController';

const router = Router();

router.post('/lists', createListController);
router.get('/lists', getAllListsController);
router.get('/lists/:id', getListByIdController);
router.put('/lists/:id', updateListController);
router.delete('/lists/:id', deleteListController);


export default router;
