import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import { sendBrevoEmail, getTransactionalEmails } from './brevoEmailService';
import mixpanel from 'mixpanel';

// Initialize Mixpanel
const mixpanelInstance = mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN || '', {
  debug: true, // Optional: Enables debug mode
});


export const handleContactFormSubmission = async (req: Request, res: Response): Promise<void> => {
  const { name, email, companyWebsite, message, getNda, consent } = req.body;

  if (!name || !message) {
    res.status(400).json({ status: 400, message: 'Required fields are missing' });
    return;
  }

  // Retrieve or generate distinct_id
  const distinctId = req.cookies.distinct_id || uuidv4(); // Use existing or new UUID

  // Set cookie for distinct_id
  res.cookie('distinct_id', distinctId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true }); // 1 year expiration

  // Create or update the Mixpanel identity
  if (email) {
    // Create alias if email is provided
    mixpanelInstance.alias(distinctId, email);
  }

  const brevoOptions = {
    subject: `New Contact Form Submission from ${name}`,
    htmlContent: `
      <html>
        <body>
          <h1>Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Business Email:</strong> ${email || 'N/A'}</p>
          <p><strong>Company Website:</strong> ${companyWebsite || 'N/A'}</p>
          <p><strong>Message/Project Brief:</strong> ${message}</p>
          <p><strong>Get an NDA:</strong> ${getNda ? 'Yes' : 'No'}</p>
          <p><strong>Consent to Data Processing:</strong> ${consent ? 'Yes' : 'No'}</p>
        </body>
      </html>
    `,
    sender: { name: 'Contact Form', email: process.env.PERSONAL_EMAIL || '' },
    to: [{ email: process.env.PERSONAL_EMAIL || '', name }],
    replyTo: { email, name },
  };

  try {
    // Send the email
    const result = await sendBrevoEmail(brevoOptions);

    // Track the form submission event with Mixpanel
    mixpanelInstance.track('Contact Form Submitted', {
      distinct_id: distinctId,
      name,
      email,
      companyWebsite,
      message,
      getNda,
      consent,
      status: result.status,
    });

    // Set Mixpanel user properties if they don't already exist
    mixpanelInstance.people.set(distinctId, {
      $name: name,
      $email: email,
      $created: new Date(),
      companyWebsite,
      getNda,
      consent,
    });

    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'An error occurred while processing the form submission.' });
  }
};

export const handleGetTransactionalEmails = async (req: Request, res: Response): Promise<void> => {
  const filters = {
    email: req.query.email as string,
    templateId: req.query.templateId ? parseInt(req.query.templateId as string, 10) : undefined,
    messageId: req.query.messageId as string,
    startDate: req.query.startDate as string,
    endDate: req.query.endDate as string,
    sort: req.query.sort as 'asc' | 'desc' || 'desc',
    limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 500,
    offset: req.query.offset ? parseInt(req.query.offset as string, 10) : 0,
  };

  const result = await getTransactionalEmails(filters);
  res.status(result.status).json(result);
};

// Handle tracking custom events
export const handleTrackEvent = async (req: Request, res: Response): Promise<void> => {
  const { eventName, properties } = req.body;

  if (!eventName) {
    res.status(400).json({ status: 400, message: 'Event name is required' });
    return;
  }

  // Retrieve or generate distinct_id
  const distinctId = req.cookies.distinct_id || uuidv4(); // Use existing or new UUID

  // Set cookie for distinct_id
  res.cookie('distinct_id', distinctId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true }); // 1 year expiration

  try {
    // Create or update the Mixpanel identity
    if (properties.email) {
      // Create alias if email is provided
      mixpanelInstance.alias(distinctId, properties.email);
    }

    // Track the event with Mixpanel
    mixpanelInstance.track(eventName, {
      ...properties,
      distinct_id: distinctId,
    });

    res.status(200).json({ status: 200, message: 'Event tracked successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'An error occurred while tracking the event.' });
  }
};
