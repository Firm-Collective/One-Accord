import { useQuery } from 'react-query';
import { createClient } from '@/utils/supabase/client';
import { postAPI, postKeys } from '../queries';

const useLiveFeed = () => {
  const supaClient = createClient();

  // useQuery
  const queryPostInfo = useQuery(
    [...postKeys.lists()],
    async () => {
      try {
        const postData = await postAPI.getPostData({ supaClient });
        return postData?.data;
      } catch (error) {
        console.error('Error fetching post data:', error);
        throw error;
      }
    },
    {
      onSuccess: (postData) => {
        if (!postData) {
          console.error('No data found on posts.');
          return [];
        }
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    },
  );

  return {
    queryPostInfo,
  };
};

export default useLiveFeed;
