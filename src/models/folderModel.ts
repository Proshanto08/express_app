import mongoose, { Schema, Document } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  lists: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const folderSchema: Schema = new Schema({
  name: { type: String },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
}, { timestamps: true });

export default mongoose.model<IFolder>('Folder', folderSchema);
