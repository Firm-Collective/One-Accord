import { NextResponse } from 'next/server';
import { supabaseServer } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = supabaseServer();

  const { error } = await (await supabase).auth.signOut();

  if (error) {
    return NextResponse.json({ error: 'An error occurred during login.' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
