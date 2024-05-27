'use client';

// this layout page
// goes over the social media links
// along with the all rights reserved legality
import { Suspense, useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './css/style.css';

import { Header } from '@/components/landing/ui/header';
import Link from 'next/link';
import Loading from './loading';

// social media imports for feature/onboarding-countries branch
import XIcon from '@/components/landing/social-media/XIcon';
import InstagramIcon from '@/components/landing/social-media/InstagramIcon';
import TikTokIcon from '@/components/landing/social-media/TikTokIcon';
import YouTubeIcon from '@/components/landing/social-media/YouTubeIcon';
import FacebookIcon from '@/components/landing/social-media/FacebookIcon';
import WhatsAppIcon from '@/components/landing/social-media/WhatsAppIcon';

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
      {/* <Header /> */}
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
              {/* Twitter Link */}
              <Link
                target='_blank'
                href='https://twitter.com/firm_collective'
                className='text-gray-500 hover:text-gray-400'
              >
                <span className='sr-only'>Twitter</span>
                <XIcon />
              </Link>
              {/* Instagram Link */}
              <Link
                target='_blank'
                href='https://www.instagram.com/onevoiceoneday'
                className='text-gray-500 hover:text-gray-400'
              >
                <span className='sr-only'>Instagram</span>
                <InstagramIcon />
              </Link>
              {/* TikTok Link */}
              <Link
                target='_blank'
                href='https://www.tiktok.com/@onevoiceoneday'
                className='text-gray-500 hover:text-gray-400'
              >
                <span className='sr-only'>TikTok</span>
                <TikTokIcon />
              </Link>
              {/* YouTube Link */}
              <Link
                target='_blank'
                href='https://www.youtube.com/channel/UChJV95VATlAVFMT6lRn_5pA'
                className='text-gray-500 hover:text-gray-400'
              >
                <span className='sr-only'>YouTube</span>
                <YouTubeIcon />
              </Link>
              {/* Facebook Link */}
              <Link
                target='_blank'
                href='https://www.facebook.com/onevoiceoneday.org'
                className='text-gray-500 hover:text-gray-400'
              >
                <span className='sr-only'>Facebook</span>
                <FacebookIcon />
              </Link>
              {/* WhatsApp Link */}
              <Link
                target='_blank'
                href='https://chat.whatsapp.com/DX934Gw5FMd1S2rv2IqQ9R'
                className='text-gray-500 hover:text-gray-400'
              >
                <span className='sr-only'>WhatsApp</span>
                <WhatsAppIcon />
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
