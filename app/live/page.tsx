'use client';

import { useState, useEffect, Suspense } from 'react';
import Head from 'next/head';
import MapGL from '@/components/map';
import Image from 'next/image';
import logo from '../../public/one-accord.webp';
import CountDownTimer from '@/components/countDownTimer';
import FeedPosts from '@/components/liveFeed/FeedPosts';
import { Loading } from '@/components/loading';

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
      </div>
    </>
  );
}
