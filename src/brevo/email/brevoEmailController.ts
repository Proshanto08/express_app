import { Request, Response } from 'express';
// import { sendEmail } from '../services/emailService';
import { sendBrevoEmail } from './brevoService';

export const handleContactFormSubmission = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
  }

//   const emailOptions = {
//     from: email,
//     to: process.env.PERSONAL_EMAIL || '',
//     subject: `New Contact Form Submission from ${name}`,
//     text: message,
//     html: `<p>${message}</p>`,
//   };

  const brevoOptions: any = {
    subject: `New Contact Form Submission from ${name}`,
    htmlContent: `<html><body><h1>${message}</h1></body></html>`,
    sender: { name: 'Contact Form', email: process.env.PERSONAL_EMAIL || '' },
    to: [{ email: process.env.PERSONAL_EMAIL || '', name }],
    replyTo: { email, name },
  };

  try {
  
    // const emailResponse = await sendEmail(emailOptions);
    // if (!emailResponse.success) {
    //   return res.status(500).json({ success: false, message: 'Failed to send personal email' });
    // }

    // Send email using Brevo
    const brevoResponse = await sendBrevoEmail(brevoOptions);
    if (!brevoResponse.success) {
      return res.status(500).json({ success: false, message: 'Failed to send Brevo email' });
    }

    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred', error });
  }
};
