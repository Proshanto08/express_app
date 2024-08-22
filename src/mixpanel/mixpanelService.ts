import Mixpanel from 'mixpanel';

export const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN || '');

interface EventProperties {
  [key: string]: string | number | boolean | null;
}

export const trackEvent = async (eventName: string, properties: EventProperties, distinctId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const email = properties.email as string | undefined;

    // Create or update the identity with the email
    if (email) {
      mixpanel.people.set(email, {
        $email: email,
        $distinct_id: email, // Set the email as the distinct ID for future tracking
      }, (err) => {
        if (err) {
          console.error('Error creating/updating identity:', err);
          return reject(err); // Early exit on error
        }
        console.log('Identity created/updated successfully');
      });
    }

    // Track the event with the updated distinct ID
    mixpanel.track(eventName, {
      ...properties,
      distinct_id: distinctId,
    }, (error) => {
      if (error) {
        console.error('Error tracking event:', error);
        return reject(error); // Early exit on error
      }
      console.log(`Event "${eventName}" tracked for distinct ID: ${distinctId}`);
      resolve();
    });
  });
};
