import { createClient } from '@/utils/supabase/client';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabaseServerClient = createServerClient();
    const supabaseClient = createClient();
    const requestUrl = new URL(request.url);
    const { searchParams } = requestUrl;
    const code = searchParams.get('code');
    console.log(requestUrl);

    if (!code) {
      return NextResponse.redirect('/auth/auth-code-error');
    }

    const { error, data } = await supabaseServerClient.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect('/auth/auth-code-error');
    }

    const metadata = data.user.user_metadata;

    if (!metadata.email) {
      return NextResponse.redirect('/auth/auth-code-error');
    }

    const query = await supabaseClient.from('User').select('*').eq('email', metadata.email);

    if (query.data?.length === 0) {
      const { data, error } = await supabaseServerClient.auth.signUp({
        email: metadata.email,
        password: metadata.password,
        options: {
          data: {
            email: metadata.email,
          },
        },
      });

      if (error) {
        console.error('Error signing up user with provider:', error);
        return NextResponse.json({ error: 'An error occurred during sign up.' }, { status: 400 });
      }

      return NextResponse.json({ success: true, data });
    }

    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL + '/live');
  } catch (error) {
    console.error('Error handling signup request:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
