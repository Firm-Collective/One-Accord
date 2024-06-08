import { sendEmail } from '@/utils/emailUtils';
import { NextApiRequest, NextApiResponse } from 'next';


const handleSendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { to, subject, text, html }: EmailParams = req.body;
    try {
      await sendEmail({ to, subject, text, html });
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export default handleSendEmail;


