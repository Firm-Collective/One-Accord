import { useQuery } from 'react-query';
import { createClient } from '@/utils/supabase/client';
import { postAPI, postKeys } from '../queries';
import usePagination from './usePagination';

const useLiveFeed = () => {
  const supaClient = createClient();
  const pagination = usePagination();

  // useQuery
  const queryPostInfo = useQuery(
    [...postKeys.lists(), pagination],
    async () => {
      try {
        const postData = await postAPI.getPostData({
          supaClient,
          from: pagination.pagination.from,
          pageSize: pagination.pagination.pageSize,
        });
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
    pagination,
  };
};

export default useLiveFeed;
