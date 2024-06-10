"use client";

import React from 'react';
import Header from '@/components/header';

import { Title } from '@/components/authentication/title';
import TokenVerificationForm from '@/components/authentication/verifyResetTokenForm';

const TokenVerificationPage = () => {
  // Assume token is obtained from the form input
  const token = ''; // Replace with actual logic to get the token value

  return (
    <main className='h-screen flex flex-col items-center justify-between'>
      <Header />
      <div className='flex h-full w-full md:w-1/3 flex-1 flex-col justify-start mt-32 p-8'>
        <Title text='Verify Token' />
        <TokenVerificationForm  />
      </div>
    </main>
  );
};

export default TokenVerificationPage;
