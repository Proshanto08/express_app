import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  firstname: string;
  lastname: string;
  email: string;
  sms?: string;
  whatsapp?: string;
  company?: string;
  timezone?: string;
  listId?: mongoose.Schema.Types.ObjectId; 
}

const contactSchema: Schema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  sms: { type: String },
  whatsapp: { type: String },
  company: { type: String },
  timezone: { type: String },
  listId: { type: Schema.Types.ObjectId, ref: 'List'} 
});

export default mongoose.model<IContact>('Contact', contactSchema);
