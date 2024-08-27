import axios from 'axios';

interface BrevoEmailOptions {
  subject: string;
  htmlContent: string;
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  replyTo?: { email: string; name?: string };
  headers?: { [key: string]: string };
  params?: { [key: string]: string };
  attachments?: Array<{ url?: string; content?: string; name: string }>;
}

interface TransactionalEmailResponse {
  status: number;
  data: any;
  message?: string;
  errorCode?: string;
}

export const sendBrevoEmail = async (options: BrevoEmailOptions): Promise<TransactionalEmailResponse> => {
  const { subject, htmlContent, sender, to, replyTo, headers, params, attachments } = options;

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        subject,
        htmlContent,
        sender,
        to,
        replyTo,
        headers,
        params,
        attachments
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY || '',
        },
      }
    );

    return {
      status: response.status,
      data: response.data,
      message: 'Email successfully sent',
    };
  } catch (error: any) {
    const errorResponse = error.response?.data || {};
    return {
      status: error.response?.status || 500,
      errorCode: errorResponse.code,
      message: errorResponse.message || 'An error occurred',
      data: {},
    };
  }
};
