import express from 'express';
import {
  createProjectController,
  getAllProjectsController,
  getProjectController,
  updateProjectController,
  deleteProjectController
} from '../controllers/caseStudyController';

const router = express.Router();

router.post('/projects', createProjectController);
router.get('/projects', getAllProjectsController);
router.get('/projects/:projectId', getProjectController);
router.put('/projects/:projectId', updateProjectController);
router.delete('/projects/:projectId', deleteProjectController);

export default router;
