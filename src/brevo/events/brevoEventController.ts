// brevoEventController.ts

import { Request, Response } from 'express';
import { createEvent } from './brevoEventService';

export const createEventController = async (req: Request, res: Response): Promise<Response> => {
  const { event_name, event_date, identifiers, contact_properties, event_properties } = req.body;

  if (!event_name || !identifiers || Object.keys(identifiers).length === 0) {
    return res.status(400).json({ error: 'Bad request', message: 'event_name and at least one identifier are required' });
  }

  const result = await createEvent({ event_name, event_date, identifiers, contact_properties, event_properties });

  return res.status(result.status).json({
    message: result.message,
    ...(result.errorDetails && { errorDetails: result.errorDetails }),
  });
};
