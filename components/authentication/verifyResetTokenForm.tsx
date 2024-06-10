// components/authentication/TokenVerificationForm.tsx
import React, { useState } from 'react';
import Button from '@/components/button';
import TextField from '@/components/textField';

import useTokenVerificationForm from './hooks/useResetTokenForm';


export default function TokenVerificationForm() {
  const { onValid, onInvalid, form } = useTokenVerificationForm(); // Using the custom hook
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form className='my-4' onSubmit={form.handleSubmit(onValid, onInvalid)}>
      <legend className='text-xs text-right text-gray-700'>
        <span className='text-red-500 mr-1'>*</span>
        indicates required
      </legend>
      <div>
        <div className='mt-4'>
          <TextField
            control={form.control} // Pass control object from react-hook-form
            name='email'
            label={
              <span>
                Email <span className='text-red-500 ml-1'>*</span>
              </span>
            }
            type='email'
          />
        </div>
        <div className='mt-4'>
          <TextField
            control={form.control}
            name='token'
            label={
              <span>
                Token <span className='text-red-500 ml-1'>*</span>
              </span>
            }
            type='text'
          />
        </div>
      </div>
      <div className='mt-20'>
        <Button
          variant='primary'
          text={isSubmitting ? 'Submitting...' : 'Verify Token'}
          disabled={isSubmitting}
          type='submit'
        />
      </div>
    </form>
  );
}
