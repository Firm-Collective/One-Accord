import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { password } = await request.json();

  const { data, error } = await supabase.auth.updateUser(password);

  if (error) {
    console.log('error in api', error);
    return NextResponse.json({ error: 'An error occurred while sending the reset password email.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
