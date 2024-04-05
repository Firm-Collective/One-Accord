'use client'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import Image from 'next/image';
import Button from '@/components/button';
import Input from '@/components/input';
import axios from 'axios';

type FormValues = {
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
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: (loginData: FormValues) => {
      return axios.post('/api/auth/login', loginData)
    },
  })

 const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
  console.log('data', data);
    loginMutation.mutate(data);
 }




  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image src='/one-accord.webp' alt='logo' width={293} height={48} />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
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
                {/* <Input label='Password' type='password' {...register('password')} /> */}
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
          </form>
        </div>
      </div>
    </main>
  );
}
