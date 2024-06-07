'use client';

import { useState, useEffect, Suspense } from 'react';
import Head from 'next/head';
import MapGL from '@/components/map';
import Image from 'next/image';
import logo from '../../public/one-accord.webp';
import CountDownTimer from '@/components/countDownTimer';
import FeedPosts from '@/components/liveFeed/FeedPosts';
import { Loading } from '@/components/loading';
import { AppContextProvider, useAppContext } from '@/context/AppContextProvider';
import DetailActivityTimer from '@/components/DetailActivity';

export default function Home() {
  return (
    <>
      <AppContextProvider>
        <main className='w-full h-screen flex flex-col sm:flex-row'>
          <section className='relative w-full h-1/2 sm:h-[98vh]'>
            {/* Map Component */}
            <Suspense fallback={<Loading />}>
              <MapOrDetailActivity />
            </Suspense>
          </section>

          <section className='w-full h-1/6 sm:absolute sm:bottom-0 inset-x-0 sm:w-[200px] sm:ml-3 md:w-[320px] lg:w-[50%]'>
            {/* Timer Component */}
            <Suspense fallback={<Loading />}>
              <CountDownTimer />
            </Suspense>
          </section>

          <section className='w-full sm:w-3/6 h-2/6 mt-3 mb-5 sm:h-[98vh]'>
            {/* Feed Component */}
            <Suspense fallback={<Loading />}>
              <FeedPosts />
            </Suspense>
          </section>
        </main>
      </AppContextProvider>
    </>
  );
}

const MapOrDetailActivity = () => {
  const { isMapVisible, timeLeft, currentActivityIndex, activities } = useAppContext();

  return (
    <div className='relative w-full h-full'>
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isMapVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ pointerEvents: isMapVisible ? 'auto' : 'none' }}
      >
        <MapGL />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isMapVisible ? 'opacity-0' : 'opacity-100'}`}
        style={{ pointerEvents: isMapVisible ? 'none' : 'auto' }}
      >
        <DetailActivityTimer currentActivityIndex={currentActivityIndex} />
      </div>
    </div>
  );
};
