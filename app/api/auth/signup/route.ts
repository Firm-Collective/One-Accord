import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const userData = await request.json();

  try {
    const { data, error } = await supabase.auth.signUp({
      ...userData,
      options: {
        data: {
          email: userData.email,
        },
      },
    });

    if (error) {
      console.error('Error signing up user:', error);
      return NextResponse.json({ error: 'An error occurred during sign up.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error signing up user:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
