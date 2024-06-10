// pages/api/verify-reset-token.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export default async function handleVerifyResetToken(request: Request) {
  if (request.method !== 'POST') {
    
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { token, email } = await request.json();

    if (!email || !token) {
      
      return NextResponse.json({ error: 'Email and token are required' }, { status: 400 });
    }

    // Retrieve the reset token from the database
    const { data: resetToken, error } = await supabase
      .from('reset_token')
      .select('reset_token, is_used, expires_at')
      .eq('email', email)
      .eq('reset_token', token)
      .single();

    if (error || !resetToken) {
      
      return NextResponse.json({ error: 'Token did not match, please try again'  }, { status: 400 });
    }

    // Check if the token is expired or already used
    const currentTime = new Date();
    if (resetToken.is_used || new Date(resetToken.expires_at) < currentTime) {
      
      return NextResponse.json({ error: 'Token is invalid or expired' }, { status: 400 });
    }

    // Mark the token as used
    await supabase
      .from('reset_token')
      .update({ is_used: true })
      .eq('email', email)
      .eq('reset_token', token);

    // Assuming you have a way to authenticate the user after verifying the token
    // Here we just redirect the user to the password reset page
    
    return NextResponse.json({ redirect: '/change-password'}, { status: 200 });

  } catch (error) {
    console.error('Error verifying reset token:', error);
    return NextResponse.json({ error: 'Internal server error'}, { status: 500 });
  }
}
