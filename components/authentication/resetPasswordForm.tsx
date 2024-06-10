import React, { useState } from 'react';
import Button from '@/components/button';
import TextField from '@/components/textField';
import useResetPasswordForm from './hooks/useResetPasswordForm';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import Link from "next/link";

export default function ResetPasswordForm() {
  const { onValid, onInvalid, resetPasswordMutation, form } = useResetPasswordForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form className='my-4' onSubmit={form.handleSubmit(onValid, onInvalid)}>
      <legend className='text-xs text-right text-gray-700'>
        <span className='text-red-500 mr-1'>*</span>
        indicates required
      </legend>
      <div className='mt-4'>
        <TextField
          control={form.control}
          name='password'
          label={
            <span>
              Password <span className='text-red-500 ml-1'>*</span>
            </span>
          }
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
      <div className='mt-4'>
        <TextField
          control={form.control}
          name='confirmPassword'
          label={
            <span>
              Confirm Password <span className='text-red-500 ml-1'>*</span>
            </span>
          }
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
      {resetPasswordMutation.isError && <p className='text-red-500 text-sm'>An error occurred during password reset.</p>}
      <div className='mt-20'>
        <Button
          variant='primary'
          text={resetPasswordMutation.isLoading ? 'Resetting...' : 'Reset Password'}
          disabled={resetPasswordMutation.isLoading}
          type='submit'
        />
      </div>
      <Link href='/login'>
        <p className='text-gray-700 text-base lg:text-sm text-center mt-8'>Back to Login</p>
      </Link>
    </form>
  );
}
