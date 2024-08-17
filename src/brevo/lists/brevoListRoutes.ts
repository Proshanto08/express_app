import express from 'express';
import {
  createListController,
  getListsController,
  getListByIdController,
  updateListController,
  deleteListController,
} from './brevoListController';

const router = express.Router();

router.post('/lists', createListController);
router.get('/lists', getListsController);
router.get('/lists/:id', getListByIdController);
router.put('/lists/:id', updateListController);
router.delete('/lists/:id', deleteListController);

export default router;
