import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Sign in a user with Supabase authentication
export async function POST(request: Request) {
  const supabase = createClient();
  const data = await request.json();
  console.log('api called', data);
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log('error in api', error);
    return NextResponse.json({ error: 'An error occurred during login.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
