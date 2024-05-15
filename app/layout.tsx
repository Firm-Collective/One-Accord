import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Inter } from 'next/font/google';
import LocalFont from 'next/font/local';
import './globals.css';
import ReactQueryProvider from '@/utils/providers/ReactQueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ToastProvider } from '../toastProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'One Accord',
    template: '%s | One Accord',
  },
  description: 'One Voice. One Day.',
  openGraph: {
    title: 'One Accord',
    description: 'One Voice. One Day.',
    url: 'https://Oneaccord.app',
    siteName: 'Oneaccord.app',
    images: [
      {
        url: 'https://Oneaccord.app/og.png',
        width: 2322,
        height: 1306,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'One Accord',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.png',
  },
};

const calSans = LocalFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning className={[inter.variable, calSans.variable].join(' ')}>
      <head />
      <body className='relative z-0 bg-white bg-none'>
        <ReactQueryProvider>
          <ToastProvider>{children}</ToastProvider>
          <TailwindIndicator />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
