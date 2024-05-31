'use client';
import Header from '@/components/header';
import { Title } from '@/components/authentication/title';
import SignUpForm from '@/components/authentication/registerForm';
import SocialAuth from '@/components/authentication/socialAuth';

export default function Signup() {
  return (
    <main className='h-screen flex flex-col items-center justify-between'>
      <Header />
      <div className='flex h-full w-full md:w-1/3 flex-1 flex-col justify-start mt-32 p-8'>
        <div className='flex flex-col'>
          <Title text='Create an Account' />
          <SignUpForm />
          <SocialAuth />
        </div>
      </div>
    </main>
  );
}
