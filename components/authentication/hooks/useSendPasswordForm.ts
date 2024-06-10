import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const SendPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type SendPasswordSchemaType = z.infer<typeof SendPasswordSchema>;

export const useSendPasswordForm = () => {
  const form = useForm<SendPasswordSchemaType>({
    resolver: zodResolver(SendPasswordSchema),
    defaultValues: { email: '' },
  });
  const router = useRouter();
  const { toast } = useToast();

  const resetPasswordMutation = useMutation(
    (data: SendPasswordSchemaType) => axios.post('/api/auth/send-reset-password', { email: data.email }),
    {
      onError: (error) => {
        console.log('error', error);
        toast({
          title: 'Email send failed',
          description: 'There was an error sending the reset password email. Please try again.',
          variant: 'destructive',
          duration: 5000,
        });
      },
      onSuccess: () => {
        toast({
          title: 'Email sent!',
          description: 'Check your email for the reset password link.',
          variant: 'success',
          duration: 5000,
        });
        router.push('/login');
      },
    }
  );

  const onValid = (data: SendPasswordSchemaType) => {
    resetPasswordMutation.mutate(data);
  };

  const onInvalid = (errors: any) => {
    console.log('Form validation errors:', errors);
  };

  return {
    form,
    onValid,
    onInvalid,
    resetPasswordMutation,
  };
};
