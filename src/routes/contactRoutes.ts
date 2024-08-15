import { Router } from 'express';
import {
  createContactController,
  getContactsByListIdController,
  getContactByIdController,
  updateContactController,
  deleteContactController
} from '../controllers/contactController';

const router = Router();


router.post('/contacts', createContactController);
router.get('/contacts/list/:listId', getContactsByListIdController);
router.get('/contacts/:id', getContactByIdController);
router.put('/contacts/:id', updateContactController);
router.delete('/contacts/:id', deleteContactController);

export default router;
