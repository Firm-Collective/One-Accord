import { useQuery } from 'react-query';
import { createClient } from '@/utils/supabase/client';
import { postAPI, postKeys } from '../queries';
import usePagination from './usePagination';

const useLiveFeed = () => {
  const supaClient = createClient();
  const pagination = usePagination();
  const paginationInfluencerOrModerator = usePagination();
  const paginationOther = usePagination();

  // useQuery
  const queryPostInfo = useQuery(
    [...postKeys.lists(), 'generalPosts', pagination],
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

  const queryInfluencerOrModeratorPostInfo = useQuery(
    [...postKeys.lists(), 'influencerOrModeratorPosts', paginationInfluencerOrModerator],
    async () => {
      try {
        const postData = await postAPI.getInfluencerOrModeratorPosts({
          supaClient,
          from: paginationInfluencerOrModerator.pagination.from,
          pageSize: paginationInfluencerOrModerator.pagination.pageSize,
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

  const queryOtherPostInfo = useQuery(
    [...postKeys.lists(), 'otherPosts', paginationOther],
    async () => {
      try {
        const postData = await postAPI.getOtherPosts({
          supaClient,
          from: paginationOther.pagination.from,
          pageSize: paginationOther.pagination.pageSize,
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
    queryInfluencerOrModeratorPostInfo,
    queryOtherPostInfo,
    pagination,
    paginationInfluencerOrModerator,
    paginationOther,
  };
};

export default useLiveFeed;
