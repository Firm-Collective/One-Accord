import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { CretePostSchema, CreteContentPostSchema, type CretePostSchemaType, CreteContentPostSchemaType } from "../schemas";

type Props = {
  refetch: () => void;
};


const useLiveFeed = ({ refetch }: Props) => {
    
  const supaClient = createClient()
  const router = useRouter();
  const { toast } = useToast();



  const fetchUserId = async () => {
    try {
      const response = await axios.get('/api/user/getUserId'); 
      return response.data.userId;
    } catch (error) {
      console.error('Failed to fetch user ID:', error);
      return '7ed30fc3-eb0a-4dc5-a9de-2466633bc415'; // Return anonymous user ID in case of error
    }
  };

  const getEventId = () => {
    return '9eac149d-12b1-4c91-b14b-8fd87341b572'; // One Accord
}

  const form = useForm<CreteContentPostSchemaType>({
      resolver: zodResolver(CreteContentPostSchema),
      defaultValues: {
        content: "",
      },
    });
  
    const createPostMutation = useMutation({
       mutationFn: async (postData: CretePostSchemaType) => {
        return await axios.post('/api/post', postData);
        
      },
      onSuccess: () => {
        refetch()
        form.reset()
        
      },
      onError: (error) => {
        console.log('error', error);
      },
    });

    const handlePostToxicity = useMutation({
      mutationFn: async (postData: { text: string }) => {
        const response = await axios.post<{
          label: string;
        }>('https://api.one-accord.xyz/api/predict_toxicity', { text: postData.text });
        return response.data;
      },
      onError: (error) => {
        console.log('Error while determining toxicity:', error);
      },
    });

    const handlePostOffensiveness = useMutation({
      mutationFn: async (postData: { text: string }) => {
        const response = await axios.post<{
          predictions: [{label: string}];
        }>('https://api.one-accord.xyz/api/predict_offensiveness', { text: postData.text });
        return response.data;
      },
      onError: (error) => {
        console.log('Error while determining offensiveness:', error);
      },
    });

    const handlePostTopicClassification = useMutation({
      mutationFn: async (postData: { text: string }) => {
        const response = await axios.post<{
          label: string
        }>('https://api.one-accord.xyz/api/predict_topic', { text: postData.text });
        return response.data;
      },
      onError: (error) => {
        console.log('Error while determining topic classification:', error);
      },
    });
    
  
    const onValid = async (data: CreteContentPostSchemaType) => {
      console.log("🚀 ~ onValid ~ data:", data);

      const userId = await fetchUserId();

      const { label: postToxicity } = await handlePostToxicity.mutateAsync({ text: data.content });
      const isToxic = postToxicity === 'toxic';
      console.log("🚀 ~ onValid ~ isToxic:", isToxic)
      
      // const { label: postTopic } = await handlePostTopicClassification.mutateAsync({ text: data.content });
      // console.log("🚀 ~ onValid ~ postTopic:", postTopic)

      // const { predictions: postOffensiveness } = await handlePostOffensiveness.mutateAsync({ text: data.content });
      // const isOffensive = postOffensiveness[0].label === 'offensive';

    // Build object for post
    const postData: CreatePostSchemaTypePick = {
      is_offensive: isToxic,
      is_visible: !isToxic,
      user_id: userId, 
      activity_id: getActivityIdBasedOnTime(),
      content: data.content || '', // Ensure that content has a value
      event_id: getEventId(), // One Accord
      category_id: '2525edcc-b972-4a14-bfc5-66697a89b5bc',
      keywords_id: 'b5901b2c-b39b-4b20-8465-0b7898b159e9',
      media_type_id: 'b43e4c0b-21e3-4f3f-9cf2-62c3f5e97935',
      sentiment_id: '9f0d7f13-25d9-48cb-afcd-b1134a1a7f3a',
      created_at: new Date().toISOString(),
    };
    console.log("🚀 ~ onValid ~ postData:", postData)
    
      // Validation of required fields
      if (!postData.user_id || !postData.activity_id || !postData.category_id || !postData.sentiment_id || !postData.keywords_id || !postData.event_id || !postData.media_type_id) {
        console.error("Some required fields are missing from the form data.");
        return;
      }
    
      // Schema validation with zod
      const parsedValues = CretePostSchema.safeParse(postData);
    
      if (!parsedValues.success) {
        type K = keyof CreteContentPostSchemaType;
        parsedValues.error.errors.forEach((v) =>
          form.setError(v.path.join(".") as K, { message: v.message })
        );
        return;
      } 
      
      // Call mutation to create the post
      createPostMutation.mutate(postData);
    };


    const onInvalid = (errors: Partial<FieldErrorsImpl<CretePostSchemaType>>) => {
      console.error("onInvalid", errors);
    };

    return {
      form,
      onValid,
      onInvalid,
    }
}

export default useLiveFeed;