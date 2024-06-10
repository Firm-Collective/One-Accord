import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { LoginSchema, type LoginSchemaType } from '@/components/authentication/schemas';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const useLoginForm = () => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: '',
          password: '',
        },
      });
    
      const loginMutation = useMutation({
        mutationFn: (loginData: LoginSchemaType) => {
          return axios.post('/api/auth/login', loginData);
        },
        onSuccess: () => {
          router.push('/live');
          toast({
            title: 'Login successful!',
            description: 'You have successfully logged in.',
            variant: 'success',
            duration: 5000,
          });
        },
        onError: (error) => {
          console.log('error', error);
          toast({
            title: 'Login failed',
            description: 'There was an error logging in. Please try again.',
            variant: 'destructive',
            duration: 5000,
          });
        },
      });
      
    const onValid = async (data: LoginSchemaType) => {
      const parsedValues = LoginSchema.safeParse(data);

      if (!parsedValues.success) {
        type K = keyof LoginSchemaType;
        parsedValues.error.errors.forEach((v) =>
          form.setError(v.path.join(".") as K, { message: v.message })
        );
        return;
      } 

      loginMutation.mutate(data);
      
      };

      const onInvalid = (errors: Partial<FieldErrorsImpl<LoginSchemaType>>) => {
        console.error("onInvalid", errors);
      };

      return {
        form,
        onValid,
        onInvalid,
        loginMutation,
      }
    
}

export default useLoginForm;