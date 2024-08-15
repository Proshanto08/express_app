import express from 'express';
import { authToken } from '../middleware/authMiddleware';
import { getHelloWorld, getTimezonesController } from '../controllers/helloWorldController';

const router = express.Router();

router.get('/hello-world', authToken, getHelloWorld);
router.get('/timezones', getTimezonesController);

export default router;
