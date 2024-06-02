import React, { useState } from 'react';
import Button from '@/components/button';
import TextField from '@/components/textField';
import useSignUpForm from './hooks/useSignUpForm';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import Link from 'next/link';

export default function RegisterForm() {
  const { onValid, onInvalid, signInMutation, form } = useSignUpForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form className='my-4' onSubmit={form.handleSubmit(onValid, onInvalid)}>
      <legend className='text-xs text-right text-gray-700'>
        <span className='text-red-500 mr-1'>*</span>
        indicates required
      </legend>
      <div>
        <div className='mt-4'>
          <TextField
            control={form.control}
            name='email'
            label={
              <span>
                Email <span className='text-red-500 ml-1'>*</span>
              </span>
            }
            type='email'
          />
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between'></div>
        <div className='mt-4 mb-10'>
          <div className='relative w-full h-10'>
            <TextField
              control={form.control}
              isPassword={true}
              label={
                <span>
                  Password <span className='text-red-500 ml-1'>*</span>
                </span>
              }
              name='password'
              type={isPasswordVisible ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
            />
          </div>
        </div>
      </div>
      {signInMutation.isError && <p className='text-red-500 text-sm'>An error occurred during signup.</p>}
      <p className='text-gray-700 text-sm md:text-xs mt-10'>
        By tapping Sign Up & Accept, you acknowledge that you have read the{' '}
        <span className='cursor-pointer text-blue-500 hover:text-blue-600  font-semibold'>Privacy Policy</span> and
        agree to the{' '}
        <span className='cursor-pointer text-blue-500 hover:text-blue-600  font-semibold'>Terms of Service</span>.
      </p>
      <div className='mt-6'>
        <Button
          variant='primary'
          text={signInMutation.isLoading ? 'Signing in...' : 'Sign Up & Accept'}
          disabled={signInMutation.isLoading}
          type='submit'
        />
      </div>
      <p className='text-gray-700 text-sm text-center mt-6'>
        Already have an account?
        <Link href='/login'>
          <span className='ml-[6px] cursor-pointer text-blue-500 hover:text-blue-600 font-semibold'>Login</span>
        </Link>
      </p>
    </form>
  );
}
