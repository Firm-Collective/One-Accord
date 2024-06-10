"use client"
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useState } from 'react';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='absolute z-30 w-full'>
      <div className='max-w-6xl px-4 mx-auto sm:px-6'>
        <div className='flex items-center justify-between h-16 md:h-20 relative'>
          {/* Logo with clickable menu */}
          <div className='relative'>
            <button onClick={toggleMenu} className='ml-0'>
              <Logo className='w-8 h-8 stroke-black hover:stroke-zinc-300 duration-500' />
            </button>
            {menuOpen && (
              <div className='absolute left-0 mt-2 flex flex-col w-48 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200'>
                <Link className='text-sm font-medium text-gray-700 hover:text-white hover:bg-[#ED9385] rounded p-2 duration-300' href='/profile'>
                  Profile
                </Link>
                <Link className='text-sm font-medium text-gray-700 hover:text-white hover:bg-[#ED9385] rounded p-2 mt-2 duration-300' href='/signout'>
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
