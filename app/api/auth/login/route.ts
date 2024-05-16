import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// login user to supabase
export async function POST(request: Request) {
  const supabase = createClient();
  const data = await request.json();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log('error in api', error);
    return NextResponse.json({ error: 'An error occurred during login.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
