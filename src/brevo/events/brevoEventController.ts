import { Request, Response } from 'express';
import { createEvent } from './brevoEventService';

export const createEventController = async (req: Request, res: Response): Promise<Response> => {
  const { event_name, event_date, identifiers, contact_properties, event_properties } = req.body;

  try {
    const result = await createEvent({ event_name, event_date, identifiers, contact_properties, event_properties });

    return res.status(result.status).json({
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
};
