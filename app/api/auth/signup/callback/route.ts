import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      },
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(requestUrl.origin + '/profile');
    }
  }
  // return the user to an error page with instructions
  return NextResponse.redirect('/auth/auth-code-error');
}

// import { createClient } from '@/utils/supabase/client';
// import { createClient as createServerClient } from '@/utils/supabase/server';
// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   try {
//   const supabaseServerClient = createServerClient()
//   const supabaseClient = createClient()
//   const requestUrl = new URL(request.url);
//   const { searchParams } = requestUrl;
//   const code = searchParams.get('code');

//   if (!code) {
//     return NextResponse.redirect('/auth/auth-code-error');
//   }

//   const { error, data } = await supabaseServerClient.auth.exchangeCodeForSession(code);

//   if (error) {
//     console.error('Error exchanging code for session:', error);
//     return NextResponse.redirect('/auth/auth-code-error');
//   }

//   const metadata = data.user.user_metadata;

//     if (!metadata.email) {
//       return NextResponse.redirect('/auth/auth-code-error');
//     }

//     const query = await supabaseClient
//       .from('User')
//       .select('*')
//       .eq('email', metadata.email);

//     if (query.data?.length === 0) {
//       const { data, error } = await supabaseServerClient.auth.signUp({
//         email: metadata.email,
//         password: metadata.password,
//         options: {
//           data: {
//             email: metadata.email,
//           },
//         },
//       });

//       if (error) {
//         console.error('Error signing up user with provider:', error);
//         return NextResponse.json(
//           { error: 'An error occurred during sign up.' },
//           { status: 400 }
//         );
//       }

//       return NextResponse.json({ success: true, data });
//     }

//     return NextResponse.redirect(requestUrl.origin + '/profile');

//   } catch (error) {
//     console.error('Error handling signup request:', error);
//     return NextResponse.json(
//       { error: 'An internal server error occurred.' },
//       { status: 500 }
//     );
//   }
// }
