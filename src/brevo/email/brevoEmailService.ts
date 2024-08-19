import axios from 'axios';

const apiKey = process.env.BREVO_API_KEY || '';

interface IApiResponse {
  status: number;
  data?: any;
  message?: string;
}

export const sendBrevoEmail = async (emailData: any): Promise<IApiResponse> => {
  try {
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', emailData, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });
    return {
      status: response.status,
      data: response.data,
      message: 'Email sent successfully',
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data,
        message: error.response?.data?.message || 'Failed to send Brevo email',
      };
    }
    return {
      status: 500,
      message: 'Failed to send Brevo email',
    };
  }
};
