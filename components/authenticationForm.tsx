'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import Image from 'next/image';
import Button from '@/components/button';
import Input from '@/components/input';
import axios from 'axios';
import { useState } from 'react';
import Alert from './alert';
import { useRouter } from 'next/navigation';
import { log } from 'console';

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function AuthenticationForm() {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: (loginData: FormValues) => {
      return axios.post('/api/auth/login', loginData);
    },
    onSuccess: () => {
        console.log('success');
        router.push('/dashboard');

    },
    onError: (error) => {
        
        console.log('error', error);
    },
  });

  const signInMutation = useMutation({
    mutationFn: (signInData: FormValues) => {
      return axios.post('/api/auth/signup', signInData);
    },
    onSuccess: () => {
        setIsLoginForm(true);
    },
    onError: (error) => {
        console.log('error', error);
    },
  });

   

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    if (isLoginForm) {
      loginMutation.mutate(data);
    } else {
      signInMutation.mutate(data);
    }
  }

  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image src='/one-accord.webp' alt='logo' width={293} height={48} />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            {isLoginForm ? 'Sign in to your account' : 'Create an account'}
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className='mt-2'>
                <Input label='Email address' name='email' register={{ ...register('email') }} />
              </div>
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>

            <div>
              <div className='flex items-center justify-between'></div>
              <div className='mt-2'>
                <Input label='Password' name='password' type='password' register={{ ...register('password') }} />
                {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
              </div>
            </div>
            {loginMutation.isError && <p className='text-red-500 text-sm'>An error occurred during login.</p>}
            <div>
              <Button
                variant='primary'
                text={loginMutation.isLoading ? 'Signing in...' : 'Sign in'}
                disabled={loginMutation.isLoading}
                type='submit'
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='button'
                onClick={() => {
                  setIsLoginForm((prev) => !prev);
                }}
                className='text-sm text-gray-600 hover:text-gray-900'
              >
                {isLoginForm ? 'Create an account' : 'Sign in to your account'}
              </button>
            </div>
          </form>
        </div>
        { loginMutation.error ? <Alert type='error' message='An error occurred during sign up.' /> : null}
        { signInMutation.error ? <Alert type='error' message='An error occurred during sign up.' /> : null}
      </div>
    </main>
  );
}
