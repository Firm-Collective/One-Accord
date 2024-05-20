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
  
    const onValid = async (data: CreteContentPostSchemaType) => {
      console.log("🚀 ~ onValid ~ data:", data);
    
      // Build object for post
      const postData: CretePostSchemaType = {
        user_id: '94b2a736-d8c7-4722-8d64-86a0a24d4f80', 
        activity_id: '6e6a36da-06ed-426d-80cc-d1ff2276fb98',
        category_id: '2525edcc-b972-4a14-bfc5-66697a89b5bc',
        content: data.content || '', // Ensure that content has a value
        created_at: new Date().toISOString(),
        event_id: '9eac149d-12b1-4c91-b14b-8fd87341b572',
        is_offensive: false,
        is_visible: true,
        keywords_id: 'b5901b2c-b39b-4b20-8465-0b7898b159e9',
        media_type_id: 'f1075159-b937-4e9c-a5f1-2aa2d482086e',
        sentiment_id: '94ddc4f2-82f7-4c22-8e56-95b462d3b7ae',
      };
    
      // Validation of required fields
      if (!postData.user_id || !postData.activity_id || !postData.category_id || !postData.sentiment_id || !postData.keywords_id || !postData.event_id || !postData.media_type_id) {
        console.error("Some required fields are missing from the form data.");
        return;
      }
    
      // Schema validation with zod
      const parsedValues = CretePostSchema.safeParse(postData);
      console.log("🚀 ~ onValid ~ parsedValues:", parsedValues);
    
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