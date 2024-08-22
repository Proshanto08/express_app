import { Request, Response } from 'express';
import {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject
} from '../services/caseStudyService';

// Get all projects controller
export const getAllProjectsController = async (req: Request, res: Response): Promise<void> => {
  const { limit, offset, sort } = req.query;
  const result = await getAllProjects(Number(limit), Number(offset), String(sort));
  res.status(result.status).json(result);
};

// Create project controller
export const createProjectController = async (req: Request, res: Response): Promise<void> => {
  const projectData = req.body;
  const result = await createProject(projectData);
  res.status(result.status).json(result);
};

// Get project controller
export const getProjectController = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;
  const result = await getProject(projectId);
  res.status(result.status).json(result);
};

// Update project controller
export const updateProjectController = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;
  const updateData = req.body;
  const result = await updateProject(projectId, updateData);
  res.status(result.status).json(result);
};

// Delete project controller
export const deleteProjectController = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;
  const result = await deleteProject(projectId);
  res.status(result.status).json(result);
};
