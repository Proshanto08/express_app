import { Schema, model, Document } from 'mongoose';

export interface IEventProperties {
  pageUrl?: string;
  buttonId?: string;
  timeSpent?: number; 
}

export interface IEvent extends Document {
  name: string;
  properties: IEventProperties;
  timestamp: Date;
}

const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  properties: {
    type: {
      pageUrl: String,
      buttonId: String,
      timeSpent: Number,
    },
    default: {}
  },
  timestamp: { type: Date, default: Date.now }
});

const Event = model<IEvent>('Event', eventSchema);

export default Event;
