import React, { useState } from 'react';
import Button from '@/components/button';
import TextField from '@/components/textField';
import { useSendPasswordForm } from './hooks/useSendPasswordForm';
import Link from 'next/link';

export default function SendPasswordForm() {
  const { onValid, onInvalid, form } = useSendPasswordForm();

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
      <div className='mt-20'>
        <Button
          variant='primary'
          text='Reset Password'
          type='submit'
        />
      </div>
      <Link href='/login'>
        <p className='text-gray-700 text-base lg:text-sm text-center mt-8'>Back to Login</p>
      </Link>
    </form>
  );
}
