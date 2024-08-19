import transporter from '../config/nodemailerConfig';

interface IEmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

interface IApiResponse {
  status: number;
  data?: any;
  message?: string;
}

export const sendEmail = async (options: IEmailOptions): Promise<IApiResponse> => {
  try {
    await transporter.sendMail(options);
    return { status: 200, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { status: 500, message: 'Email sending failed', data: error };
  }
};
