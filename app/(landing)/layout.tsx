'use client';

import { Suspense, useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './css/style.css';

import { Header } from '@/components/landing/ui/header';
import Link from 'next/link';
import Loading from './loading';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 1000,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <main className='grow'>{children}</main>
      </Suspense>

      <footer className='pt-24 ' aria-labelledby='footer-heading'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='px-6 pb-8 mx-auto max-w-7xl lg:px-8'>
          <div className='pt-8 mt-16 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24'>
            <div className='flex space-x-6 md:order-2'>
              <Link target='_blank' href='https://twitter.com' className='text-gray-500 hover:text-gray-400'>
                <span className='sr-only'>Twitter</span>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </Link>
              <Link target='_blank' href='https://instagram.com/' className='text-gray-500 hover:text-gray-400'>
                <span className='sr-only'>Instagram</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  viewBox='49.605 0 2834.65 2834.649'
                  id='instagram'
                >
                  <circle cx='1466.93' cy='1417.324' r='1417.324' fill='currentColor'></circle>
                  <path
                    fill='#fff'
                    d='M1892.128 726.379h-850.395c-147.639 0-265.749 118.11-265.749 265.749v850.394c0 147.639 118.11 265.748 265.749 265.748h850.395c147.638 0 265.749-118.109 265.749-265.748V992.127c0-147.638-118.112-265.748-265.749-265.748zm76.772 159.449h29.527V1122.048h-236.221v-236.22H1968.9zm-696.851 389.765c41.338-59.056 118.11-100.395 194.882-100.395s153.544 41.339 194.882 100.395c29.527 41.338 47.244 88.582 47.244 141.732 0 135.826-112.205 242.126-242.126 242.126-129.922 0-242.126-106.299-242.126-242.126-.001-53.15 17.716-100.394 47.244-141.732zm750.001 566.929c0 70.867-59.056 129.922-129.922 129.922h-850.395c-70.866 0-129.922-59.055-129.922-129.922v-566.929h206.693c-17.717 41.338-29.527 94.488-29.527 141.732 0 206.693 171.26 377.953 377.953 377.953s377.953-171.26 377.953-377.953c0-47.244-11.812-100.395-29.527-141.732h206.692l.002 566.929z'
                  ></path>
                </svg>
              </Link>
            </div>
            <p className='mt-8 text-xs text-gray-400 leading-5 md:order-1 md:mt-0'>
              &copy; {new Date().getUTCFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
