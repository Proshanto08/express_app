// mixpanelConfig.ts
import mixpanel from 'mixpanel';

export const initializeMixpanelClient = () => {
  const token = process.env.MIXPANEL_TOKEN;

  if (!token) {
    throw new Error('MIXPANEL_TOKEN environment variable is required');
  }

  return mixpanel.init(token);
};
