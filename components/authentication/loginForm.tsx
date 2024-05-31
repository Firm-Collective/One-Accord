import React, { useState } from 'react';
import Button from '@/components/button';
import TextField from '@/components/textField';
import useLoginForm from './hooks/useLoginForm';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import Link from 'next/link';

export default function LoginForm() {
  const { onValid, onInvalid, loginMutation, form } = useLoginForm();
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
        <div className='mt-4'>
          <div className='relative w-full h-10'>
            <TextField
              control={form.control}
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
      {loginMutation.isError && <p className='text-red-500 text-sm'>An error occurred during login.</p>}
      <div className='mt-20'>
        <Button
          variant='primary'
          text={loginMutation.isLoading ? 'Signing in...' : 'Login'}
          disabled={loginMutation.isLoading}
          type='submit'
        />
      </div>
      <Link href='/reset-password'>
        <p className='text-gray-700 text-base lg:text-sm text-center mt-8'>Forgot Password?</p>
      </Link>
    </form>
  );
}
