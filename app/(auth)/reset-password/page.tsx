'use client';
import Header from '@/components/header';
import { Title } from '@/components/authentication/title';
import ResetPasswordForm from '@/components/authentication/resetPasswordForm';

export default function Login() {
  return (
    <main className='h-screen flex flex-col items-center justify-between'>
      <Header />
      <div className='flex h-full w-full md:w-1/3 flex-1 flex-col justify-start mt-32 p-8'>
        <Title text='Confirm your password!' />
        <ResetPasswordForm />
      </div>
    </main>
  );
}
