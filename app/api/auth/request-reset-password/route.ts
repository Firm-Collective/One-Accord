// pages/api/request-reset-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

const handleRequestResetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/change-password`,
        });

        if (error) {
            return res.status(400).json({ error: 'Failed to send reset password email' });
        }

        return res.status(200).json({ message: 'Password reset email sent' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handleRequestResetPassword;




