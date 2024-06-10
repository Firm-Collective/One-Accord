import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';

const ResetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

const useResetPasswordForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordSchemaType) => {
       return axios.post('/api/auth/reset-password', { password: data.password });
    },
    onSuccess: () => {
      router.push('/login');
      toast({
        title: 'Password Reset Successful!',
        description: 'Your password has been reset. Please log in with your new password.',
        variant: 'success',
        duration: 5000,
      });
    },
    onError: (error) => {
      console.error('Error resetting password:', error);
      toast({
        title: 'Reset Password Failed',
        description: 'There was an error resetting your password. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    },
  });

  const onValid = async (data: ResetPasswordSchemaType) => {
    resetPasswordMutation.mutate(data);
  };

  const onInvalid = (errors: Partial<FieldErrorsImpl<ResetPasswordSchemaType>>) => {
    console.error('Validation errors:', errors);
  };

  return {
    form,
    onValid,
    onInvalid,
    resetPasswordMutation,
  };
};

export default useResetPasswordForm;
