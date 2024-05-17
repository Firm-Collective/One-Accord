'use client';

import Header from '@/components/header';
import { Title } from '@/components/authentication/title';
import ProfileForm from '@/components/authentication/profileForm';

export default function Profile() {


  return (
    <main className='h-screen flex flex-col items-center justify-between'>
      <Header />
      <div className='flex h-full w-full md:w-1/3 flex-1 flex-col justify-start mt-32 p-8'>
        <div className='flex flex-col'>
          <Title text='Tell us about yourself' />
          <ProfileForm />
        </div>
      </div>
    </main>
  );
}

