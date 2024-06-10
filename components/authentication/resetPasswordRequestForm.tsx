import React, { useState } from 'react';
import Button from '@/components/button';
import TextField from '@/components/textField';
import { useForm } from 'react-hook-form'; // Assuming you're using react-hook-form for form handling
import { useRouter } from 'next/navigation';
import useResetPasswordRequestForm from './hooks/useResetPasswordRequestForm';

export default function ResetPasswordRequestForm({ token }: { token: string }) {
  const { onValid, onInvalid, form } = useResetPasswordRequestForm(); // Using control instead of register
  const router = useRouter();
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
      </div>
      <div className='mt-20'>
        <Button
          variant='primary'
          text={isSubmitting ? 'Submitting...' : 'Send Reset Token'}
          disabled={isSubmitting}
          type='submit'
        />
      </div>
    </form>
  );
}





