import express from 'express';
import { handleContactFormSubmission, handleGetTransactionalEmails,handleTrackEvent } from './brevoEmailController';

const router = express.Router();

router.post('/email', handleContactFormSubmission);
router.get('/email', handleGetTransactionalEmails);
router.post('/track-event', handleTrackEvent);


export default router;
