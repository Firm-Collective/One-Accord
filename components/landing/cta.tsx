import Button from '@/components/button';
import Link from 'next/link';

export const Cta: React.FC = () => {
  return (
    <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm grid gap-2 cursor-pointer'>
      <Link href='/login'>
        <Button variant='primary' text='Login' />
      </Link>
      <Link href='/signup'>
        <Button variant='third' text='Sign Up' />
      </Link>

      <p className='mt-5 text-center text-sm text-gray-600 hover:text-gray-900'>
        <Link href='/live'>
          <button>Skip to Live Stream</button>
        </Link>
      </p>
    </div>
  );
};
