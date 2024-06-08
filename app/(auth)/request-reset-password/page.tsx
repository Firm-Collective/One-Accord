"use client";


import React from 'react';
import Header from '@/components/header';
import ResetPasswordRequestForm from '@/components/authentication/resetPasswordRequestForm';
import { Title } from '@/components/authentication/title';

const RequestResetPassword = () => {
  // Assume token is obtained from useResetPasswordRequestForm hook
  const token = 'your-token-value'; // Replace with actual token value

  return (
    <main className='h-screen flex flex-col items-center justify-between'>
      <Header />
      <div className='flex h-full w-full md:w-1/3 flex-1 flex-col justify-start mt-32 p-8'>
        <Title text='Reset Password' />
        <ResetPasswordRequestForm token={token} />
      </div>
    </main>
  );
};

export default RequestResetPassword;

