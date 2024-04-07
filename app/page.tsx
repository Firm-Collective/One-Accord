
import AuthenticationForm from '@/components/authenticationForm';
import Button from '@/components/button';
import { getUser } from '@/utils/supabase/auth';
import Link from 'next/link';

export default async function Home() {

  const user = await getUser();

  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-center p-24'>
      <div>
        {user ? (
          <div className='text-black flex flex-col items-center'>
            <p>User is logged in</p>
            <button
              
              className='bg-red-700 p-2'
            >
              Sign out
            </button>

            

          </div>
        ) : (
          <div>
            <AuthenticationForm />
          </div>
        )}
      </div>
    </main>
  );
}
