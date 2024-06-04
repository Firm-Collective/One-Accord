import { createClient } from '@/utils/supabase/client';

const useSocialAuth = () => {
    const supabase = createClient()

    

    const signUpWithGoogle = () => {
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${location.origin}/api/auth/signup/callback/`,
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
            redirectTo: `${location.origin}/api/auth/callback/`,
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
            redirectTo: `${location.origin}/api/auth/callback/`,
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
            redirectTo: `${location.origin}/api/auth/callback/`,
          },
        });
      };

      return {
        signUpWithGoogle,
        loginWithGoogle, 
        loginWithFacebook, 
        loginWithApple
      }
}

export default useSocialAuth;