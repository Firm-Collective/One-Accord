'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';

export default function OAuthForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const loginWithGithub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth-server-action/callback/`,
      },
    });
  };

  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${location.origin}/auth-server-action/callback/`,
      },
    });
  };

  const loginWithFacebook = () => {
    supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${location.origin}/auth-server-action/callback/`,
      },
    });
  };

  const loginWithApple = () => {
    supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${location.origin}/auth-server-action/callback/`,
      },
    });
  };

  return (
    <div className='space-y-4 mt-4'>
      <Button
        onClick={loginWithGithub}
        className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
      >
        <Image height={24} width={24} src='/github.svg' alt='GitHub logo' className='mr-3' /> Sign Up with GitHub
      </Button>
      <Button
        onClick={loginWithGoogle}
        className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
      >
        <Image height={24} width={24} src='/google.svg' alt='Google logo' className='mr-3' /> Sign Up with Google
      </Button>
      <Button
        onClick={loginWithFacebook}
        className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
      >
        <Image height={24} width={24} src='/facebook.svg' alt='Facebook logo' className='mr-3' /> Sign Up with Facebook
      </Button>
      <Button
        onClick={loginWithApple}
        className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
      >
        <Image height={24} width={24} src='/apple.svg' alt='Apple logo' className='mr-3' /> Sign Up with Apple
      </Button>
    </div>
  );
}

// 'use client';
// import { Button } from '@/components/ui/button';
// import React from 'react';
// import { createBrowserClient } from '@supabase/ssr';

// export default function OAuthForm() {
//   const supabase = createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );

//   const loginWithGithub = () => {
//     supabase.auth.signInWithOAuth({
//       provider: 'github',
//       options: {
//         redirectTo: `${location.origin}/auth-server-action/callback/`,
//       },
//     });
//   };

//   const loginWithGoogle = () => {
//     supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         queryParams: {
//           access_type: 'offline',
//           prompt: 'consent',
//         },
//         redirectTo: `${location.origin}/auth-server-action/callback/`,
//       },
//     });
//   };

//   const loginWithFacebook = () => {
//     supabase.auth.signInWithOAuth({
//       provider: 'facebook',
//       options: {
//         queryParams: {
//           access_type: 'offline',
//           prompt: 'consent',
//         },
//         redirectTo: `${location.origin}/auth-server-action/callback/`,
//       },
//     });
//   };

//   const loginWithApple = () => {
//     supabase.auth.signInWithOAuth({
//       provider: 'apple',
//       options: {
//         queryParams: {
//           access_type: 'offline',
//           prompt: 'consent',
//         },
//         redirectTo: `${location.origin}/auth-server-action/callback/`,
//       },
//     });
//   };

//   return (
//     <>
//       <Button className='w-full' onClick={loginWithGithub}>
//         Login With Github
//       </Button>
//       <Button className='w-full' onClick={loginWithGoogle}>
//         Login With Google
//       </Button>
//       <Button className='w-full' onClick={loginWithFacebook}>
//         Login With Facebook
//       </Button>
//       <Button className='w-full' onClick={loginWithApple}>
//         Login With Apple
//       </Button>
//     </>
//   );
// }
