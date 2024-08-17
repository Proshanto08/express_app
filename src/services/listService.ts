import Folder from '../models/folderModel';
import List, { IList } from '../models/listModel';


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


export const getAllLists = async (): Promise<IList[]> => {
  return await List.find();
};


export const getListById = async (id: string): Promise<IList | null> => {
  return await List.findById(id);
};


export const updateList = async (id: string, name: string): Promise<IList | null> => {
  return await List.findByIdAndUpdate(id, { name }, { new: true });
};


export const deleteList = async (id: string): Promise<IList | null> => {
  return await List.findByIdAndDelete(id);
};
