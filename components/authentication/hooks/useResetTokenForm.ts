// hooks/useTokenVerificationForm.ts
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { TokenVerificationSchema, type TokenVerificationSchemaType } from '@/components/authentication/schemas';

const useTokenVerificationForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof TokenVerificationSchema>>({
    resolver: zodResolver(TokenVerificationSchema),
    defaultValues: {
      email: '',
      token: '',
    },
  });

  const verifyTokenMutation = useMutation({
    mutationFn: (verificationData: TokenVerificationSchemaType) => {
      return axios.post('/api/auth/verify-reset-token', verificationData);
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.redirect) {
        router.push(data.redirect);
      } else {
        toast({
          title: 'Token verified!',
          description: 'Redirecting to reset password page.',
          variant: 'success',
          duration: 5000,
        });
      }
    },
    onError: (error) => {
      console.error('Error verifying token:', error);
      toast({
        title: 'Token verification failed',
        description: 'There was an error verifying the token. Please try again later.',
        variant: 'destructive',
        duration: 5000,
      });
    },
  });

  const onValid = async (data: TokenVerificationSchemaType) => {
    const parsedValues = TokenVerificationSchema.safeParse(data);

    if (!parsedValues.success) {
      type K = keyof TokenVerificationSchemaType;
      parsedValues.error.errors.forEach((v) => form.setError(v.path.join('.') as K, { message: v.message }));
      return;
    }

    verifyTokenMutation.mutate(data);
  };

  const onInvalid = (errors: Partial<FieldErrorsImpl<TokenVerificationSchemaType>>) => {
    console.error('Form validation errors:', errors);
  };

  return {
    form,
    onValid,
    onInvalid,
    verifyTokenMutation,
  };
};

export default useTokenVerificationForm;
