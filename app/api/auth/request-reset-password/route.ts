// Import necessary dependencies
import { NextApiRequest, NextApiResponse } from 'next';
import { CourierClient } from '@trycourier/courier';
import { createClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid'; // Import v4 from uuid

// Initialize Courier client
const courier = new CourierClient({ authorizationToken: process.env.COURIER_AUTH_TOKEN });

// Export the POST handler function for reset password
export async function POST(request: NextApiRequest, response: NextApiResponse) {
  try {
    const supabase = createClient();
    const { email } = request.body;

    // Check if email is provided
    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }

    // Generate a unique token
    const token = uuidv4();
    const tokenExpiry = new Date();
    tokenExpiry.setMinutes(tokenExpiry.getMinutes() + 10); // Token expires in 10 minutes

    // Store the token in Supabase
    const { data, error } = await supabase
      .from('reset_token') // Use the reset_tokens table
      .insert([{ email, token, expires_at: tokenExpiry }]);

    // Handle any errors during the insert operation
    if (error) {
      console.error('Error storing token:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }

    // Send the token via Courier
    await courier.send({
      message: {
        to: { email },
        content: {
          title: 'Password Reset Token',
          body: `Your password reset token is: ${token}`,
        },
        data: {
          token,
        },
      },
    });

    // Redirect the user to the token verification page
    return response.status(200).json({ message: 'Password reset token sent', redirect: '/enter-token' });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error handling reset password request:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}






