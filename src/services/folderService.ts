import Folder, { IFolder } from '../models/folderModel';

// Create a new folder
export const createFolder = async (name: string): Promise<IFolder> => {
  const folder = new Folder({ name });
  return folder.save();
};

// Get all folders
export const getAllFolders = async (): Promise<IFolder[]> => {
  return Folder.find();
};

// Get a folder by ID
export const getFolderById = async (id: string): Promise<IFolder | null> => {
  return Folder.findById(id);
};

// Update a folder by ID
export const updateFolder = async (id: string, name: string): Promise<IFolder | null> => {
  return Folder.findByIdAndUpdate(id, { name }, { new: true });
};

// Delete a folder by ID
export const deleteFolder = async (id: string): Promise<IFolder | null> => {
  return Folder.findByIdAndDelete(id);
};
