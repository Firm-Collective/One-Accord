'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from 'react-query';
import Button from '@/components/button';
import axios from 'axios';
import Image from 'next/image';
import BackButton from '@/components/backButton';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';

export default function GetStarted() {
  // const handleGoBack = () => {
  //   window.history.back();
  // };

  const router = useRouter();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Header />
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Description Title
          </h2>
          <p className='mt-5 text-center text-sm text-gray-600 hover:text-gray-900'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna
            aliqua. Bibendum ut tristique et egestas quis.
          </p>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <Button variant='primary' text='Get Started' type='submit' />

          <p className='mt-5 text-center text-sm text-gray-600 hover:text-gray-900'>Skip to Live Stream</p>
        </div>
      </div>
    </main>
  );
}
