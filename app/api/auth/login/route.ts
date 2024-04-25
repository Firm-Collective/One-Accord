import { NextResponse } from 'next/server';
import { supabaseServer } from '@/utils/supabase/server';

// login user to supabase
export async function POST(request: Request) {
  const supabase = supabaseServer();
  const data = await request.json();
  console.log('api called', data);
  const { error } = await (await supabase).auth.signInWithPassword(data);

  if (error) {
    console.log('error in api', error);
    return NextResponse.json({ error: 'An error occurred during login.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
