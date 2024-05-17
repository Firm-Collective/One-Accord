import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { ProfileSchema, type ProfileSchemaType } from '@/components/authentication/schemas';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useToast } from "@/hooks/use-toast";

const useProfileForm = () => {
  const supaClient = createClient()
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
          username: '',
          country: '',
          city: '',
          birth_year: ''
        },
      });
    
      const updatedProfileMutation = useMutation({
         mutationFn: async (profileData: ProfileSchemaType) => {
          return axios.post('/api/auth/profile', profileData);
          
        },
        onSuccess: () => {
          router.push('/dashboard');
          // TODO: toast alert
        },
        onError: (error) => {
          console.log('error', error);
        },
      });
    
      const onValid = async (data: ProfileSchemaType) => {

        const parsedValues = ProfileSchema.safeParse(data);
  
        if (!parsedValues.success) {
          type K = keyof ProfileSchemaType;
          parsedValues.error.errors.forEach((v) =>
            form.setError(v.path.join(".") as K, { message: v.message })
          );
          return;
        } 
        updatedProfileMutation.mutate(data);

      }

      const onInvalid = (errors: Partial<FieldErrorsImpl<ProfileSchemaType>>) => {
        console.error("onInvalid", errors);
      };


      return {
        form,
        onValid,
        onInvalid,
        updatedProfileMutation,
  
      }

}
    

export default useProfileForm;