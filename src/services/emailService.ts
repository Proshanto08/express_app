import transporter from '../config/nodemailerConfig';

interface IEmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: IEmailOptions) => {
    try {
      await transporter.sendMail(options);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Email sending error:', error);
      return { success: false, message: 'Email sending failed', error };
    }
  };
  
