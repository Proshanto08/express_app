// src/controllers/eventController.ts
import { Request, Response } from 'express';
import { trackEvent } from './mixpanelService';
import { v4 as uuidv4 } from 'uuid';

declare module 'express-session' {
  interface Session {
    distinct_id?: string;
  }
}

export const handleTrackEvent = async (req: Request, res: Response): Promise<void> => {
  const { eventName, properties } = req.body;

  if (!eventName) {
    res.status(400).json({ status: 400, message: 'Event name is required' });
    return;
  }

  const email = properties.email as string | undefined;
  let distinctId: string;

  if (email) {
    // If email is present, use it as the distinct ID
    distinctId = email;
    req.session.distinct_id = distinctId; // Optionally save email as distinct_id in session
  } else {
    // Check for an existing distinct_id in the session
    distinctId = req.session.distinct_id || uuidv4(); // Generate a UUID if none exists
    req.session.distinct_id = distinctId; // Save it in the session
  }

  try {
    await trackEvent(eventName, properties, distinctId);
    res.status(200).json({ status: 200, message: 'Event tracked successfully', distinctId });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'An error occurred', error });
  }
};