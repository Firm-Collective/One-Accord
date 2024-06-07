import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ResetPasswordSchema, type ResetPasswordSchemaType } from '@/components/authentication/schemas';

const usePasswordResetForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
     
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (resetData: ResetPasswordSchemaType) => {
      return axios.post('/api/reset-password', resetData);
    },
    onSuccess: () => {
      router.push('/reset-password/success');
      toast({
        title: 'Password reset link sent!',
        description: 'Please check your email for further instructions.',
        variant: 'success',
        duration: 5000,
      });
    },
    onError: (error) => {
      console.error('Error sending password reset link:', error);
      toast({
        title: 'Password reset link failed',
        description: 'There was an error sending the password reset link. Please try again later.',
        variant: 'destructive',
        duration: 5000,
      });
    },
  });

  const onValid = async (data: ResetPasswordSchemaType) => {
    const parsedValues = ResetPasswordSchema.safeParse(data);

    if (!parsedValues.success) {
      type K = keyof ResetPasswordSchemaType;
      parsedValues.error.errors.forEach((v) => form.setError(v.path.join('.') as K, { message: v.message }));
      return;
    }

    resetPasswordMutation.mutate(data);
  };

  const onInvalid = (errors: Partial<FieldErrorsImpl<ResetPasswordSchemaType>>) => {
    console.error('Form validation errors:', errors);
  };

  return {
    form,
    onValid,
    onInvalid,
    resetPasswordMutation,
  };
};

export default usePasswordResetForm;
