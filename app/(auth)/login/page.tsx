'use client';
import Alert from '@/components/alert';
import Button from '@/components/button';
import Header from '@/components/header';
import Input from '@/components/input';
import SocialAuth from '@/components/socialAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z } from 'zod';

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
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

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <main className='h-screen flex flex-col items-center justify-between'>
      <Header />
      <div className='flex h-full w-full md:w-1/3 flex-1 flex-col justify-start mt-32 p-8'>
        <div className='flex flex-col'>
          <h2 className='w-full text-left text-[28px] font-bold leading-9 tracking-tight text-gray-900'>
            Welcome back!
          </h2>
          <form className='my-4' onSubmit={handleSubmit(onSubmit)}>
            <legend className='text-xs text-right text-gray-700'>
              <span className='text-red-500 mr-1'>*</span>
              indicates required
            </legend>
            <div>
              <div className='mt-4'>
                <Input label='Email' name='email' isRequired={true} register={{ ...register('email') }} />
              </div>
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>
            <div>
              <div className='flex items-center justify-between'></div>
              <div className='mt-4'>
                <Input
                  label='Password'
                  name='password'
                  type='password'
                  isRequired={true}
                  register={{ ...register('password') }}
                />
                {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
              </div>
            </div>
            {loginMutation.isError && <p className='text-red-500 text-sm'>An error occurred during login.</p>}
            <div className='mt-6'>
              <Button
                variant='primary'
                text={loginMutation.isLoading ? 'Signing in...' : 'Login'}
                disabled={loginMutation.isLoading}
                type='submit'
              />
            </div>
            <p className='text-gray-700 text-base lg:text-sm text-center mt-8'>Forgot Password?</p>
          </form>
          <SocialAuth />
        </div>
        {loginMutation.error ? <Alert type='error' message='An error occurred during sign up.' /> : null}
      </div>
    </main>
  );
}
