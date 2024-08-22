import mixpanel from 'mixpanel';

const mixpanelInstance = mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN || '', {
  debug: true, // Optional: Enables debug mode
});
