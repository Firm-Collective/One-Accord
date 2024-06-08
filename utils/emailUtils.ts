import sgMail from '@sendgrid/mail';


// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Function to send email
export const sendEmail = async ({ to, subject, text, html }: EmailParams): Promise<void> => {
  try {
    const msg = {
      to,
      from: 'your-email@example.com', // Sender email
      subject,
      text,
      html,
    };
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}
