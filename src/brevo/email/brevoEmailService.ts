import axios from 'axios';

const apiKey = process.env.BREVO_API_KEY || '';

const sendBrevoEmail = async (emailData: any) => {
  try {
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', emailData, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Brevo email sending error:', error);
    return { success: false };
  }
};

export { sendBrevoEmail };
