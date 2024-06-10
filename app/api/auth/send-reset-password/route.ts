import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { email } = await request.json();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  console.log("🚀 ~ POST ~ baseUrl:", baseUrl)
  console.log("🚀 ~ POST ~ email:", email)

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${baseUrl}/reset-password`,
  });
  console.log("🚀 ~ POST ~ data:", data)

  if (error) {
    console.log('error in api', error);
    return NextResponse.json({ error: 'An error occurred while sending the reset password email.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
