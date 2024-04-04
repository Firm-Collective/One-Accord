'use client'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Inputs = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    try {
      schema.parse(data);
      // Call your login function here if validation passes
      console.log('Form data:', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className='bg-white flex min-h-screen flex-col items-center p-24'>
      <form onSubmit={onSubmit} className='space-y-6'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
            Email address
          </label>
          <div className='mt-2'>
            <input
              id='email'
              type='email'
              autoComplete='email'
              required
              {...register('email')}
              className='block w-full focus:outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FC6881] sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        {errors.email && <span className='text-red-500'>Invalid email format</span>}

        <div>
          <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
            Password
          </label>
          <div className='mt-2'>
            <input
              id='password'
              type='password'
              autoComplete='current-password'
              required
              {...register('password')}
              className='block focus:outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FC6881] focus:ring-inset sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        {errors.password && <span className='text-red-500'>Password must be at least 8 characters long</span>}

        <button
          type='submit'
          className='flex w-full hover:scale-105 justify-center rounded-md bg-[#FC6881] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
