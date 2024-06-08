// pages/api/change-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

const handleChangePassword = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ error: 'New password is required' });
        }

        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            return res.status(400).json({ error: 'Failed to change password' });
        }

        return res.status(200).json({ message: 'Password changed successfully' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handleChangePassword;
