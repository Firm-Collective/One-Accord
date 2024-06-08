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

  const onSubmit = async (data: { email: string }) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/request-reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        router.push('/reset-password/success'); // Redirect to success page
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error initiating password reset:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          text={isSubmitting ? 'Submitting...' : 'Send Reset Link'}
          disabled={isSubmitting}
          type='submit'
        />
      </div>
    </form>
  );
}





