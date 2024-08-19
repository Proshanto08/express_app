import { Request, Response } from 'express';
import { createEvent, getEvents } from '../services/eventService';
import { IEventProperties } from '../models/eventModel';

interface CreateEventRequest extends Request {
  body: {
    name: string;
    properties: IEventProperties;
  };
}


export const createEventController = async (req: CreateEventRequest, res: Response): Promise<void> => {
  try {
    const { name, properties } = req.body;
    const event = await createEvent(name, properties);
    res.json(event);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getEventsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
