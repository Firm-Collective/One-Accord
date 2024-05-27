'use client';
import Button from '@/components/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Blob from '@/components/landing/blob';

export default function GetStarted() {
  const router = useRouter();

  return (
    <main className='-z-[2] h-screen overflow-hidden relative flex flex-col items-center justify-between'>
      <Header />
      <Blob />
      <div className='flex min-h-full flex-1 flex-col justify-center p-8'>
        <div className='flex flex-col items-center'>
          <Image src='/world.png' alt='logo' width={309} height={147} />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Unified Faith</h2>
          <p className='mt-5 lg:w-80 text-center text-sm text-gray-600 hover:text-gray-900'>
            Your global hub for spiritual growth and community connection. Join believers worldwide in prayer, worship,
            and reflection. Experience unity in faith, wherever you are.
          </p>
        </div>

        <div className='mt-20 sm:mx-auto sm:w-full sm:max-w-sm grid gap-2'>
          <Button variant='primary' text='Get Started' onClick={() => router.push('/live')} />

          <p className='mt-5 text-center text-sm text-gray-600 hover:text-gray-900'>Skip to Live Stream</p>
        </div>
      </div>
    </main>
  );
}
