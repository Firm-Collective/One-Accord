import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { ProfileSchema, type ProfileSchemaType } from '@/components/authentication/schemas';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { userAPI } from '../queries';

const useProfileForm = () => {
  const supaClient = createClient()
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
          username: '',
          user_type_id: '',
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
          router.push('/live');
          // TODO: toast alert
        },
        onError: (error) => {
          console.error('error', error);
        },
      });
    
      const onValid = async (data: ProfileSchemaType) => {
      console.log("🚀 ~ onValid ~ data:", data)

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


      const queryUserTypeInfo = useQuery('userTypeData', async () => {
        try {
          const userTypeData = await userAPI.getUserTypeData({ supaClient });
          return userTypeData?.data;
        } catch (error) {
          console.error("Error fetching userType data:", error);
          throw error;
        }
      }, {
        onSuccess: (postData) => {
          if (!postData) {
            console.error("No userType was found.");
            return [];
          }
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      });
      

      return {
        form,
        onValid,
        onInvalid,
        queryUserTypeInfo,
        updatedProfileMutation,

      }

}
    

export default useProfileForm;