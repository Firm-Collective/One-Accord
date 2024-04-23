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
        src='/one-accord.webp'
        alt='logo'
        width={279}
        height={38}
      />
    </div>
  );
}
