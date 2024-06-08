// pages/api/password/reset.ts

import { NextApiRequest, NextApiResponse } from 'next';

const handlePasswordResetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Use an email service provider to send the reset link
    try {
      // Example: SendGrid, Mailgun, etc.
      // await emailService.sendResetLink(email);

      res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending reset link' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handlePasswordResetRequest;



