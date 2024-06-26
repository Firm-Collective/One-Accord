"use client"
import { useRouter } from 'next/navigation';
import BackButton from './backButton';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();

  return (
    <div className='w-full'>
      <BackButton onClick={() => router.back()} />
      <Image
        className='absolute top-6 left-1/2 transform -translate-x-1/2'
        src='/ovod-app-logo.svg'
        alt='logo'
        width={314}
        height={30}
      />
    </div>
  );
}

