import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { ProfileSchema, type ProfileSchemaType } from '@/components/authentication/schemas';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { userAPI, userKeys } from '../queries';
import { useEffect, useState } from 'react';

export const fetchUserId = async () => {
  try {
    const response = await axios.get('/api/user/getUserId'); 
    return response.data.userId ?? "";
  } catch (error) {
    console.error('Failed to fetch user ID:', error);
    return "";
  }
};

const useProfileForm = () => {
  const [userId, setUserId] = useState("");
  const supaClient = createClient();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  useEffect(() => {
    const fetchAndSetUserId = async () => {
      const id = await fetchUserId();
      setUserId(id);
    };

    fetchAndSetUserId();
  }, []);

  const queryUserInfo = useQuery([...userKeys.detail(userId)], async () => {
    try {
      const userData = await userAPI.getUserData({ supaClient, userId });
      return userData?.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }, {
    onSuccess: (postData) => {
      if (postData) {
        form.reset({
          username: postData?.username || '',
          user_type_id: postData?.UserType?.id || '',
          country: postData?.Location?.country || '',
          city: postData?.Location?.city || '',
          birth_year: postData?.birth_year || ''
        });
      }
    },
    onError: (error) => {
      console.error("Error:", error);
    },
    enabled: !!userId, 
  });

  const updatedProfileMutation = useMutation({
    mutationFn: async (profileData: ProfileSchemaType) => {
      return axios.post('/api/auth/profile', JSON.stringify(profileData), {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
    },
    onSuccess: () => {
      router.push('/live');
      toast({
        title: 'Profile updated successfully!',
        description: 'Your profile has been updated.',
        variant: 'success', 
        duration: 5000, 
      });
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast({
        title: 'Profile update failed',
        description: 'There was an error updating your profile. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    },
  });

  const onValid = (data: ProfileSchemaType) => {
    const parsedValues = ProfileSchema.safeParse(data);

    if (!parsedValues.success) {
      type K = keyof ProfileSchemaType;
      parsedValues.error.errors.forEach((v) =>
        form.setError(v.path.join(".") as K, { message: v.message })
      );
      return;
    }
    updatedProfileMutation.mutate(parsedValues.data);
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
    queryUserInfo,
  }
}

export default useProfileForm;
