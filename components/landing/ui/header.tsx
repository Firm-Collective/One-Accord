"use client"
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

export const Header: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
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
    <header className='absolute z-30 w-full'>
      <div className='max-w-6xl px-4 mx-auto sm:px-6'>
        <div className='flex items-center justify-between h-16 md:h-20 relative'>
          {/* Logo with clickable menu */}
          <div className='relative ml-auto'>
            <button onClick={toggleMenu} className='mr-4 shrink-0'>
              <Logo className='w-8 h-8 stroke-black hover:stroke-zinc-300 duration-500' />
            </button>
            {menuOpen && (
              <div className='absolute right-0 mt-1 flex flex-col w-48 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200'>
                <Link className='text-sm font-medium text-gray-700 hover:text-white hover:bg-[#ED9385] rounded p-2 duration-300' href='/profile'>
                  Profile
                </Link>
                <Link className='text-sm font-medium text-gray-700 hover:text-white hover:bg-[#ED9385] rounded p-2 mt-2 duration-300' href='/live'>
                  Live
                </Link>
                <button 
                  onClick={handleSignOut} 
                  className='text-sm font-medium text-gray-700 hover:text-white hover:bg-[#ED9385] rounded p-2 mt-2 duration-300'
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
