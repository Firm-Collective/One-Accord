'use client';

import { useState, useEffect, Suspense } from 'react';
import Head from 'next/head';
import MapGL from '@/components/map';
import Image from 'next/image';
import logo from '../../public/one-accord.webp';
import CountDownTimer from '@/components/countDownTimer';
import FeedPosts from '@/components/liveFeed/FeedPosts';
import { Loading } from '@/components/loading';
import NavLinks from '@/components/navigation';

export default function Home() {
  return (
    <>
      <div>
        <main className='w-[100%] h-[100vh] flex flex-col'>
          <section className='w-[100%] h-50vh'>
            {/* Map Component */}
            {/* TODO: Optimaze the component & style the map & connect with user*/}
            <Suspense fallback={<Loading />}>
              <MapGL />
            </Suspense>
          </section>

          <section className='w-screen h-10vh'>
            {/* Timer Component */}
            <Suspense fallback={<Loading />}>
              <CountDownTimer />
            </Suspense>
          </section>

          <section className='w-screen h-40vh mt-5 mb-5 '>
            {/* Feed Component */}
            <Suspense fallback={<Loading />}>
              <FeedPosts />
            </Suspense>
          </section>
        </main>
        // absolute bottom aligned navbar on mobile and right aligned on desktop
        <nav className='fixed bottom-0 right-0 bg-white shadow-md z-50'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-row justify-between items-center py-4'>
              <a className='text-lg font-semibold text-gray-900'>One Accord</a>
              <div className='hidden sm:flex flex-row justify-between items-center'>
                <NavLinks />
              </div>
              <div className='sm:hidden relative flex flex-row my-4'>
                <NavLinks />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
