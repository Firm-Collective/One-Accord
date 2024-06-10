// pages/api/verify-reset-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export default async function handleVerifyResetToken(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, email } = req.body;

    if (!email || !token) {
      return res.status(400).json({ error: 'Email and token are required' });
    }

    // Retrieve the reset token from the database
    const { data: resetToken, error } = await supabase
      .from('reset_token')
      .select('token, used, expires_at')
      .eq('email', email)
      .eq('token', token)
      .single();

    if (error || !resetToken) {
      return res.status(400).json({ error: 'Token did not match, please try again' });
    }

    // Check if the token is expired or already used
    const currentTime = new Date();
    if (resetToken.used || new Date(resetToken.expires_at) < currentTime) {
      return res.status(400).json({ error: 'Token is invalid or expired' });
    }

    // Mark the token as used
    await supabase
      .from('reset_token')
      .update({ used: true })
      .eq('email', email)
      .eq('token', token);

    // Assuming you have a way to authenticate the user after verifying the token
    // Here we just redirect the user to the password reset page
    return res.status(200).json({ redirect: '/new-password' });

  } catch (error) {
    console.error('Error verifying reset token:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
