import Project  from '../models/casestudyModel'; // Adjust the path to your Project model
import { IApiResponse } from '../types'; // Assuming you have a types file for IApiResponse

// Fetch all projects with optional filters
export const getAllProjects = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  try {
    const projects = await Project.find().limit(limit || 10).skip(offset || 0).sort(sort || '-createdAt');
    return {
      status: 200,
      data: projects,
      message: 'Projects retrieved successfully',
    };
  } catch (error) {
    return {
      status: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while retrieving projects',
      data: {},
    };
  }
};

// Create a new project
export const createProject = async (projectData: any): Promise<IApiResponse> => {
  try {
    const project = new Project(projectData);
    const savedProject = await project.save();
    return {
      status: 201,
      data: savedProject,
      message: 'Project successfully created',
    };
  } catch (error) {
    return {
      status: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while creating the project',
      data: {},
    };
  }
};

// Get a single project by ID
export const getProject = async (projectId: string): Promise<IApiResponse> => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return {
        status: 404,
        message: 'Project not found',
        data: {},
      };
    }
    return {
      status: 200,
      data: project,
      message: 'Project details retrieved successfully',
    };
  } catch (error) {
    return {
      status: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while retrieving the project',
      data: {},
    };
  }
};

// Update an existing project
export const updateProject = async (projectId: string, updateData: any): Promise<IApiResponse> => {
  try {
    const project = await Project.findByIdAndUpdate(projectId, updateData, { new: true });
    if (!project) {
      return {
        status: 404,
        message: 'Project not found',
        data: {},
      };
    }
    return {
      status: 200,
      data: project,
      message: 'Project successfully updated',
    };
  } catch (error) {
    return {
      status: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while updating the project',
      data: {},
    };
  }
};

// Delete a project
export const deleteProject = async (projectId: string): Promise<IApiResponse> => {
  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return {
        status: 404,
        message: 'Project not found',
        data: {},
      };
    }
    return {
      status: 200,
      data: {},
      message: 'Project successfully deleted',
    };
  } catch (error) {
    return {
      status: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while deleting the project',
      data: {},
    };
  }
};
