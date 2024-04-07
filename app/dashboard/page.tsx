'use client';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';

export default function Dashboard() {
  const router = useRouter();

  const signOutMutation = useMutation({
    mutationFn: () => {
      return axios.post('/api/auth/signout');
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      console.error('Sign-out error:', error);
    },
  });

  const handleSignOut = () => {
    // Trigger the sign-out mutation
    signOutMutation.mutate();
  };

  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div>
          <Button
            variant='primary'
            text={signOutMutation.isLoading ? 'Signing out...' : 'Sign out'}
            disabled={signOutMutation.isLoading}
            onClick={handleSignOut}
          />
        </div>
      </div>
    </main>
  );
}
