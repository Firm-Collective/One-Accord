import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { LoginSchema, type LoginSchemaType } from '@/components/authentication/schemas';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';

const useLoginForm = () => {
    const router = useRouter();
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
        },
        onError: (error) => {
          console.log('error', error);
        },
      });
    
      const onValid = async (data: LoginSchemaType) => {
      const parsedValues = LoginSchema.safeParse(data);

        if (parsedValues.success) {
            loginMutation.mutate(data);
          }
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