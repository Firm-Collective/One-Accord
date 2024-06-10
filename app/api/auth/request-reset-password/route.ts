// Import necessary dependencies
import {  NextResponse } from 'next/server';
import { CourierClient } from '@trycourier/courier';
import { createClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid'; // Import v4 from uuid

// Initialize Courier client
const courier = new CourierClient({ authorizationToken: process.env.COURIER_AUTH_TOKEN });

// Export the POST handler function for reset password
export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { email } = await request.json();

    // Check if email is provided
    if (!email) {
      
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a unique token
    const reset_token = uuidv4();
    const tokenExpiry = new Date();
    tokenExpiry.setMinutes(tokenExpiry.getMinutes() + 10); // Token expires in 10 minutes

    // Store the token in Supabase
    const { data, error } = await supabase
      .from('reset_token') // Use the reset_tokens table
      .insert([{ email, reset_token, expiration_date: tokenExpiry }]);

    // Handle any errors during the insert operation
    if (error) {
      console.error('Error storing token:', error);
      
      return NextResponse.json({ error: 'Internal server error' }, { status: 400 });
    }

    // Send the token via Courier
    await courier.send({
      message: {
        to: { email },
        content: {
          title: 'Password Reset Token',
          body: `Your password reset token is: ${reset_token}`,
        },
        data: {
          reset_token,
        },
      },
    });

    // Redirect the user to the token verification page
    
    return NextResponse.json({ error: 'Password reset token sent', redirect: '/verify-reset-token'}, { status: 200 });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error handling reset password request:', error);

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}






