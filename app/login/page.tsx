import { login, signup } from './actions';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className= 'bg-white flex min-h-screen flex-col items-center  p-24'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Image src='/one-accord.webp' alt='logo' width={293} height={48} />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' action='#' method='POST'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='block w-full focus:outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FC6881] sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='block focus:outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FC6881] focus:ring-inset sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <button
              formAction={login}
              className='flex w-full hover:scale-105 justify-center rounded-md bg-[#FC6881] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 '
            >
              Sign in
            </button>
            <button
              formAction={signup}
              className='transform hover:scale-105 flex w-full justify-center mt-3 border border-[#FC6881] rounded-md text-[#FC6881] px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 '
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
