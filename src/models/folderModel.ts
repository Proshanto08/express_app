import mongoose, { Document, Schema } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const FolderSchema: Schema = new Schema({
  name: { type: String },
}, { timestamps: true });

export default mongoose.model<IFolder>('Folder', FolderSchema);
