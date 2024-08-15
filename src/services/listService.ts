import List from '../models/listModel';
import Folder from '../models/folderModel';
import { IList } from '../models/listModel';

 // Create the new list
export const createList = async (name: string, folderId: string): Promise<IList> => {
  const list = new List({ name, folderId });

  await list.save();

  await Folder.findByIdAndUpdate(
    folderId,
    { $push: { lists: list._id } },
    { new: true }
  );

  return list;
};

// Get all lists
export const getAllLists = async (): Promise<IList[]> => {
  return await List.find();
};

// Get a list by ID
export const getListById = async (id: string): Promise<IList | null> => {
  return await List.findById(id);
};

// Update a list
export const updateList = async (id: string, name: string): Promise<IList | null> => {
  return await List.findByIdAndUpdate(id, { name }, { new: true });
};

// Delete a list
export const deleteList = async (id: string): Promise<IList | null> => {
  return await List.findByIdAndDelete(id);
};
