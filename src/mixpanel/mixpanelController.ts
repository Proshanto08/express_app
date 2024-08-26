import { Request, Response } from 'express';
import axios from 'axios';
import { uuidv4 } from './mixpanelService';

const PROJECT_TOKEN = '8b54ca4641b6254e7103b98d9670dba1';
const MIXPANEL_API_URL = 'https://api.mixpanel.com/track';
const MIXPANEL_PEOPLE_API_URL = 'https://api.mixpanel.com/engage';
const MIXPANEL_IMPORT_API_URL = 'https://api.mixpanel.com/import';

const createAlias = async (distinctId: string, aliasId: string) => {
  try {
    console.log(`Creating alias: distinctId=${distinctId}, aliasId=${aliasId}`);
    const response = await axios.post(MIXPANEL_API_URL, null, {
      params: {
        data: JSON.stringify({
          event: '$create_alias',
          properties: {
            distinct_id: distinctId,
            alias: aliasId,
            token: PROJECT_TOKEN,
          },
        }),
      },
    });
    console.log('Alias created successfully');
    console.log('Alias creation response:', response.data);
  } catch (error) {
    console.error('Error creating alias in Mixpanel:');
    throw new Error('Error creating alias in Mixpanel');
  }
};

const mergeIdentities = async (anonId: string, identifiedId: string): Promise<void> => {
  try {
    console.log(`Merging identities: anonId=${anonId}, identifiedId=${identifiedId}`);
    const response = await axios.post(MIXPANEL_IMPORT_API_URL, null, {
      params: {
        data: JSON.stringify({
          event: '$merge',
          properties: {
            $distinct_ids: [anonId, identifiedId],
          },
          token: PROJECT_TOKEN,
        }),
      },
      auth: {
        username: PROJECT_TOKEN,
        password: 'OVhJITlECOfWfLDrFc8wALvcXOVla3sd', // Replace with your actual API secret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Identities merged successfully');
    console.log('Merge response:', response.data);
  } catch (error) {
    console.error('Error merging identities in Mixpanel:');
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data || error.message);
    } else {
      console.error('Error details:', error);
    }
    throw new Error('Error merging identities in Mixpanel');
  }
};

const identifyUser = async (anonId: string, identifiedId: string) => {
  try {
    const response = await axios.post(MIXPANEL_API_URL, null, {
      params: {
        data: JSON.stringify({
          event: '$identify',
          properties: {
            $identified_id: identifiedId,
            $anon_id: anonId,
            token: PROJECT_TOKEN,
          },
        }),
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/plain',
      },
    });

    console.log('Identify response:', response.data);
  } catch (error) {
    console.error('Error during identify request:', error);
  }
};

export const trackEvent = async (req: Request, res: Response) => {
  console.log('trackEvent() called');
  const { eventName, properties } = req.body;

  if (!eventName) {
    console.error('Event name is missing');
    return res.status(400).json({ error: 'Event name is required' });
  }

  console.log(`Event Name: ${eventName}`);
  console.log('Event properties:', properties);

  // Check if the properties include an email
  const email = properties.email;
  let distinctId = email || req.cookies.distinctId || uuidv4();

  try {
    if (email) {

      const previousDistinctId = req.cookies.distinctId;
      // Step 1: Identify the user with the email
      // await identifyUser(previousDistinctId, email);

      await createAlias(previousDistinctId, email);

      // Step 2: Merge previous events
      // await mergeIdentities(previousDistinctId, email);

      // Step 3: Update Mixpanel profile with the new email as the distinct ID
      const profileResponse = await axios.post(MIXPANEL_PEOPLE_API_URL, null, {
        params: {
          data: JSON.stringify({
            $token: PROJECT_TOKEN,
            $distinct_id: email,
            $set: {
              ...properties,
            },
          }),
        },
      });
      console.log('Mixpanel profile updated successfully:', profileResponse.data);

      // Update the distinctId to the email for further tracking
      distinctId = email;
      // Clear the previous distinct ID cookie
      res.cookie('distinctId', distinctId, { maxAge: 365 * 24 * 60 * 60 * 1000 });
    } else {
      console.log(`Using existing distinctId: ${distinctId}`);
      res.cookie('distinctId', distinctId, { maxAge: 365 * 24 * 60 * 60 * 1000 });
    }

    // Tracking the event with the new distinct ID
    const eventResponse = await axios.post(MIXPANEL_API_URL, null, {
      params: {
        data: JSON.stringify({
          event: eventName,
          properties: {
            distinct_id: distinctId,
            token: PROJECT_TOKEN,
            ...properties,
          },
        }),
      },
    });
    console.log('Event tracked successfully in Mixpanel:', eventResponse.data);
  } catch (error) {
    console.error('Error processing event:', error);
    return res.status(500).json({ error: 'Error processing event' });
  }

  res.status(200).json({ message: 'Event tracked successfully' });
};


export const clearDistinctId = (req: Request, res: Response) => {
  console.log('clearDistinctId() called');
  res.cookie('distinctId', '', { maxAge: 0, httpOnly: true });
  console.log('Distinct ID cookie cleared successfully');
  res.status(200).json({ message: 'Distinct ID cookie cleared successfully' });
};
