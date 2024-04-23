'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from 'react-query';
import Button from '@/components/button';
import axios from 'axios';
import Image from 'next/image';
import BackButton from '@/components/backButton';
// Correcting the import for useRouter
import { useRouter } from 'next/navigation'; // Fixing import
import Blob from '@/components/blob';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <main className='-z-[2] bg-white h-screen overflow-hidden relative'>
      <Blob />
      <div className='z-10 h-full flex flex-col items-center justify-between'>
        <div className='w-full flex flex-1 flex-col justify-center p-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <div className='flex justify-center mt-auto'>
              <Image src='/pink-logo.png' alt='logo' width={114} height={114} />
            </div>
            <h2 className='mt-8 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900'>Welcome to</h2>
            <h2 className='mt-2 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900'>
              <span className='font-bold'>one</span>
              <span className='font-normal'>accord</span>
            </h2>

            <p className='mt-6 text-center text-sm text-gray-600 hover:text-gray-900'>One Voice. One Day.</p>
            <br></br>
          </div>

          <div className='mt-20 sm:mx-auto sm:w-full sm:max-w-sm grid gap-2'>
            <Button variant='primary' text='Login' type='button' onClick={() => router.push('/(auth)/login')} />
            <Button variant='third' text='Sign Up' type='button' onClick={() => router.push('/(auth)/signup')} />
            <p className='mt-5 text-center text-sm text-gray-600 hover:text-gray-900'>Skip to Live Stream</p>
          </div>
        </div>
      </div>
    </main>
  );
}
