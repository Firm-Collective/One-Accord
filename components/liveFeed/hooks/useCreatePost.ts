import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { CretePostSchema, CreteContentPostSchema, ParseCretePostSchema, type CretePostSchemaType, CreteContentPostSchemaType } from "../schemas";

type Props = {
  refetch: () => void;
};

type CreatePostSchemaTypePick = Pick<CretePostSchemaType, 
  'user_id' | 
  'activity_id' | 
  'category_id' | 
  'content' | 
  'created_at' | 
  'event_id' | 
  'is_offensive' | 
  'is_visible' | 
  'keywords_id' | 
  'media_type_id' | 
  'sentiment_id'
>;


const useLiveFeed = ({ refetch }: Props) => {
    
  const supaClient = createClient()
  const router = useRouter();
  const { toast } = useToast();

  const activityMap = {
    '6e6a36da-06ed-426d-80cc-d1ff2276fb98': 'Worship',
    'fd5101fc-0218-496f-91a1-04c1e6472b20': 'Prayer',
    '9cfe08ad-dbe7-4643-9e19-302ed4f5f72c': 'Communion',
    '8bde9d86-cb73-4f58-9a04-9fd3b74ed6a0': 'Voice of God'
  };

  const getActivityIdBasedOnTime = () => {
    const currentTime = new Date();
    const minutes = currentTime.getMinutes();
  
    if (minutes >= 0 && minutes < 15) {
      return '6e6a36da-06ed-426d-80cc-d1ff2276fb98'; // Worship
    } else if (minutes >= 15 && minutes < 30) {
      return 'fd5101fc-0218-496f-91a1-04c1e6472b20'; // Prayer
    } else if (minutes >= 30 && minutes < 45) {
      return '9cfe08ad-dbe7-4643-9e19-302ed4f5f72c'; // Communion
    } else {
      return '8bde9d86-cb73-4f58-9a04-9fd3b74ed6a0'; // Voice of God
    }
  };

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
       mutationFn: async (postData: CreatePostSchemaTypePick) => {
        return await axios.post('/api/post', postData);
        
      },
      onSuccess: () => {
        form.reset()     
        refetch();   
      },
      onError: (error) => {
        console.log('error', error);
      },
    });

    const handlePostToxicity = useMutation({
      mutationFn: async (postData: { text: string }) => {
        const response = await axios.post<{
          label: string;
        }>('https://one-accord.xyz/api/predict_toxicity', { text: postData.text });
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
        }>('https://one-accord.xyz/api/predict_offensiveness', { text: postData.text });
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
        }>('https://one-accord.xyz/api/predict_topic', { text: postData.text });
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
      
      const { label: postTopic } = await handlePostTopicClassification.mutateAsync({ text: data.content });
      console.log("🚀 ~ onValid ~ postTopic:", postTopic)

      // const { predictions: postOffensiveness } = await handlePostOffensiveness.mutateAsync({ text: data.content });
      // const isOffensive = postOffensiveness[0].label === 'offensive';

    // Build object for post
    const postData: CreatePostSchemaTypePick = {
      is_offensive: isToxic,
      is_visible: !isToxic,
      user_id: userId, // 'b5a363d5-3f29-4d23-9434-bef69618b5ef' 
      activity_id: getActivityIdBasedOnTime(),
      content: data.content || '', // Ensure that content has a value
      event_id: getEventId(), // One Accord
      category_id: '2525edcc-b972-4a14-bfc5-66697a89b5bc',
      keywords_id: 'b5901b2c-b39b-4b20-8465-0b7898b159e9',
      media_type_id: 'b43e4c0b-21e3-4f3f-9cf2-62c3f5e97935',
      sentiment_id: '9f0d7f13-25d9-48cb-afcd-b1134a1a7f3a',
      created_at: new Date().toISOString(),
    };
    
      // Validation of required fields
      if (!postData.user_id || !postData.activity_id || !postData.category_id || !postData.sentiment_id || !postData.keywords_id || !postData.event_id || !postData.media_type_id) {
        console.error("Some required fields are missing from the form data.");
        return;
      }
    
      // Schema validation with zod
      const parsedValues = ParseCretePostSchema.safeParse(postData);
    
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