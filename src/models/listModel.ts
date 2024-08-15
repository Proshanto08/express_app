import mongoose, { Document, Schema } from 'mongoose';

export interface IList extends Document {
  name: string;
  folderId: mongoose.Types.ObjectId;
}

const listSchema: Schema = new Schema({
  name: {
    type: String
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  }
}, {
  timestamps: true
});

const List = mongoose.model<IList>('List', listSchema);

export default List;
