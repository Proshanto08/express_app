import Event, { IEvent, IEventProperties } from '../models/eventModel';

export const createEvent = async (name: string, properties: IEventProperties): Promise<IEvent> => {
  const event = new Event({ name, properties });
  await event.save();
  return event;
};

export const getEvents = async (): Promise<IEvent[]> => {
  return await Event.find().sort({ timestamp: -1 });
};
