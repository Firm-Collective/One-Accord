import Link from 'next/link';
import { Logo } from '@/components/logo';

export const Header: React.FC = () => {
  return (
    <header className='absolute z-30 w-full'>
      <div className='max-w-6xl px-4 mx-auto sm:px-6'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* <Link href='/' className='mr-4 shrink-0'>
            <Logo className='w-8 h-8 stroke-black hover:stroke-zinc-300  duration-500' />
          </Link> */}

          {/* Desktop navigation */}
          <nav className='flex grow'>
            {/* Desktop sign in links */}
            <ul className='flex flex-wrap items-center justify-end grow'>
              <li>
                {/* <Link className='text-sm font-medium text-black hover:text-zinc duration-500' href='/login'>
                  Sign in
                </Link> */}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
