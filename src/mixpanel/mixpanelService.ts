import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PROJECT_TOKEN = '8b54ca4641b6254e7103b98d9670dba1';
const MIXPANEL_API_URL = 'https://api.mixpanel.com/track';
const MIXPANEL_PEOPLE_API_URL = 'https://api.mixpanel.com/engage';
const MIXPANEL_IMPORT_API_URL = 'https://api.mixpanel.com/import';

export const updateUserProfile = async (distinctId: string, properties: any) => {
  try {
    await axios.post(MIXPANEL_PEOPLE_API_URL, null, {
      params: {
        data: JSON.stringify({
          $token: PROJECT_TOKEN,
          $distinct_id: distinctId,
          $set: properties,
        }),
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};

export const identifyUser = async (userId: string, anonId: string) => {
  try {
    await axios.post(MIXPANEL_API_URL, null, {
      params: {
        data: JSON.stringify({
          event: '$identify',
          properties: {
            $distinct_id: userId,
            $anon_id: anonId,
            token: PROJECT_TOKEN,
          },
        }),
      },
    });
  } catch (error) {
    console.error('Error identifying user:', error);
  }
};

export const trackUserEvent = async (distinctId: string, eventName: string, properties: any) => {
  try {
    await axios.post(MIXPANEL_API_URL, null, {
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
  } catch (error) {
    console.error('Error tracking user event:', error);
  }
};

export const createAlias = async (distinctId: string, aliasId: string) => {
  try {
    await axios.post(MIXPANEL_API_URL, null, {
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
  } catch (error) {
    console.error('Error creating alias in Mixpanel:', error);
  }
};

export const mergeIdentities = async (anonId: string, identifiedId: string) => {
  try {
    await axios.post(MIXPANEL_IMPORT_API_URL, null, {
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
        password: 'g59Vapf902dkCdlyFP9sKucdWb8QVffP',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    console.error('Error merging identities in Mixpanel:', error);
  }
};
