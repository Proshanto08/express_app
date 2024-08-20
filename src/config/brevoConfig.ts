import SibApiV3Sdk from 'sib-api-v3-sdk';

export const initializeBrevoClient = (): SibApiV3Sdk.ContactsApi => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY environment variable is required');
  }

  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKeyAuth = defaultClient.authentications['api-key'];
  apiKeyAuth.apiKey = apiKey;

  return new SibApiV3Sdk.ContactsApi();
};