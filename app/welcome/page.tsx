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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const WelcomeScreen = () => {
  const router = useRouter();

  //const handleGoBack = () => {
  //router.back(); // Use router.back() to go back
  //};

  const handleAddData = () => {
    // Handle add data logic
  };

  return (
    <main className='bg-white flex h-screen flex-col items-center justify-between p-8'>
      <div className='flex h-full flex-1 flex-col justify-center lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='flex justify-center mt-auto'>
            <Image src='/one-accord.webp' alt='logo' width={293} height={48} />
          </div>

          <h2 className='mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900'>Welcome to</h2>
          <h2 className='mt-2 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 font-poppins'>
            <span className='font-bold'>one</span>
            <span className='font-normal'>accord</span>
          </h2>

          <p className='mt-6 text-center text-sm text-gray-600 hover:text-gray-900'>One Voice. One Day.</p>
          <br></br>
        </div>

        <div className='mt-20 sm:mx-auto sm:w-full sm:max-w-sm grid gap-2'>
          <Button variant='primary' text='Login' type='button' onClick={() => router.push('/auth/login')} />

          <Button variant='third' text='Sign Up' type='button' onClick={() => router.push('/auth/signup')} />
          <p className='mt-5 text-center text-sm text-gray-600 hover:text-gray-900'>Skip to Live Stream</p>
        </div>
      </div>
    </main>
  );
};

export default WelcomeScreen; // Export the component
