'use client';
import Alert from '@/components/alert';
import Button from '@/components/button';
import Header from '@/components/header';
import Input from '@/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z } from 'zod';

type FormValues = {
  username: string;
  country: string;
  city: string;
  birthyear: string;
};

const schema = z.object({
  username: z.string().min(4),
  country: z.string().min(2),
  city: z.string().min(2),
  birthyear: z.string().min(4),
});

export default function Profile() {
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
      return axios.post('/api/auth/profile', loginData);
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
            Tell us about yourself
          </h2>
          <form className='my-4'>
            <legend className='text-xs text-right text-gray-700'>
              <span className='text-red-500 mr-1'>*</span>
              indicates required
            </legend>
            <div>
              <div className='flex items-center justify-between'></div>
              <div className='mt-4'>
                <Input label='Username' name='username' isRequired={true} register={{ ...register('username') }} />
              </div>
              {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
            </div>
            <div>
              <div className='flex items-center justify-between'></div>
              <div className='mt-4'>
                <Input label='Country' name='country' type='country' register={{ ...register('country') }} />
                {errors.country && <p className='text-red-500 text-sm'>{errors.country.message}</p>}
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'></div>
              <div className='mt-4'>
                <Input label='City' name='city' isRequired={true} register={{ ...register('city') }} />
              </div>
              {errors.city && <p className='text-red-500 text-sm'>{errors.city.message}</p>}
            </div>
            <div>
              <div className='flex items-center justify-between'></div>
              <div className='mt-4'>
                <Input label='Birth Year' name='birthyear' isRequired={true} register={{ ...register('birthyear') }} />
              </div>
              {errors.birthyear && <p className='text-red-500 text-sm'>{errors.birthyear.message}</p>}
            </div>
            {loginMutation.isError && <p className='text-red-500 text-sm'>An error occurred during updating.</p>}
            <p className='text-gray-700 text-base lg:text-sm text-center mt-8'>Join us in lighting up the world!</p>
            <div className='mt-6'>
              <Button
                variant='primary'
                text={loginMutation.isLoading ? 'Signing in...' : 'Continue'}
                disabled={loginMutation.isLoading}
                type='submit'
              />
            </div>
            <p className='mt-5 text-center text-sm text-gray-600 hover:text-gray-900'>
              Skip to{' '}
              <a className='mt-5 text-center text-sm text-blue-600 hover:text-gray-900' href='/livestream'>
                Live Stream
              </a>
            </p>
          </form>
        </div>
        {loginMutation.error ? <Alert type='error' message='An error occurred during sign up.' /> : null}
      </div>
    </main>
  );
}
function session(arg0: { req: { method: string; body: { userId: any; data: any } } }) {
  throw new Error('Function not implemented.');
}
