import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/utils/providers/ReactQueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'One Accord',
  description: 'To Hear the Collective Voice of GOD',
};
// TODO:
// 1. Add a custom font to the project
// 2. Add the correct favicon
// 3. Add the correct meta tags

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ToastContainer />
          {/* <div className='flex flex-col'>
            <Link href='/auth-server-action'>Auth Server Action</Link>
            <Link href='/'>home</Link>
            <Link href='/todo'>Learn CRUD</Link>
          </div> */}
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
