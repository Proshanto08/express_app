import Folder, { IFolder } from '../models/folderModel';

export const createFolder = async (name: string): Promise<IFolder> => {
  const folder = new Folder({ name });
  return folder.save();
};

export const getAllFolders = async (): Promise<IFolder[]> => {
  return Folder.find();
};

export const getFolderById = async (id: string): Promise<IFolder | null> => {
  return Folder.findById(id);
};

export const updateFolder = async (id: string, name: string): Promise<IFolder | null> => {
  return Folder.findByIdAndUpdate(id, { name }, { new: true });
};

export const deleteFolder = async (id: string): Promise<IFolder | null> => {
  return Folder.findByIdAndDelete(id);
};
