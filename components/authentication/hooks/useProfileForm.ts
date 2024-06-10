import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { ProfileSchema, type ProfileSchemaType } from '@/components/authentication/schemas';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { userAPI, userKeys } from '../queries';
import { useEffect, useState } from 'react';


type UserTypesIds = {
  influencerId: string 
  moderatorId: string 
  propheticOrganizationId: string 
  registeredId: string
}

const userCodes = {
  influencer: 'inf123',
  moderator: 'mod456',
  propheticOrganization: 'pro789',
  registeredId: 'reg000'
};

export const fetchUserId = async () => {
  try {
    const response = await axios.get('/api/user/getUserId'); 
    return response.data.userId ?? "";
  } catch (error) {
    console.error('Failed to fetch user ID:', error);
    return "";
  }
}

const determineUserTypeFromPath = (code: string, userTypeIds: UserTypesIds) => {
  const { influencerId, moderatorId, propheticOrganizationId, registeredId } = userTypeIds;
  switch (code) {
    case userCodes.influencer:
      return influencerId;
    case userCodes.moderator:
      return moderatorId;
    case userCodes.propheticOrganization:
      return propheticOrganizationId;
    default:
      return registeredId;
  }
};

const useProfileForm = () => {
  const [userId, setUserId] = useState("");
  const supaClient = createClient();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      user_type_code: '',
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

  const updatedProfileMutation = useMutation({
    mutationFn: async (profileData: ProfileSchemaType) => {

      const userTypeIds = {
        influencerId: queryUserTypeInfo?.data?.find(type => type.name === 'Influencer')?.id ?? '',
        moderatorId: queryUserTypeInfo?.data?.find(type => type.name === 'Moderator')?.id ?? '',
        propheticOrganizationId: queryUserTypeInfo?.data?.find(type => type.name === 'Prophetic Organization')?.id ?? '',
        registeredId: queryUserTypeInfo?.data?.find(type => type.name === 'Registered')?.id ?? '',
      };

      const registrationCode = profileData?.user_type_code ?? "";

      const userTypeId = determineUserTypeFromPath(registrationCode, userTypeIds);

      const profileDataWithUserType = {
        ...profileData,
        user_type_id: userTypeId
      };

      return axios.post('/api/auth/profile', JSON.stringify(profileDataWithUserType), {
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

    if (form.formState.dirtyFields && Object.keys(form.formState.dirtyFields).length === 0) {
      toast({
        title: 'No changes detected',
        description: 'No updates were made as there were no changes detected.',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    updatedProfileMutation.mutate(parsedValues.data);
  }

  const onInvalid = (errors: Partial<FieldErrorsImpl<ProfileSchemaType>>) => {
    console.error("onInvalid", errors);
  };

  return {
    form,
    onValid,
    onInvalid,
    updatedProfileMutation,
    queryUserInfo,
  }
}

export default useProfileForm;
