'use client';

import Image from 'next/image';
import { Cta } from './cta';

export default function WelcomeScreen() {
  return (
    <>
      <div className='-z-[2] mt-20 overflow-hidden relative'>
        <div className='z-10 h-full flex flex-col items-center justify-between'>
          <div className='w-full flex flex-1 flex-col justify-center p-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
              <div className='flex justify-center mt-auto'>
                <Image src='/ovod-app-logo.svg' alt='logo' width={314} height={314} />
              </div>
              <h2 className='mt-8 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900'>Welcome to</h2>
              <h2 className='mt-2 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900'>
                <span className='font-bold'>one</span>
                <span className='font-normal'>voice</span>
              </h2>

              <p className='mt-6 text-center text-sm text-gray-600 hover:text-gray-900'>One Voice. One Day.</p>
            </div>
          </div>
        </div>
      </div>
      <Cta />
    </>
  );
}
