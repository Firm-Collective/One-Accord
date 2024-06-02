import { useQuery } from 'react-query';
import { createClient } from '@/utils/supabase/client';
import { postAPI, postKeys } from '../queries';
import usePagination from './usePagination';
import { useState, useEffect } from 'react';
import { CretePostSchemaType, type PostSchemaType } from '../schemas';

const useLiveFeed = () => {
  const supaClient = createClient();
  const pagination = usePagination();

  // save posts that have already been retrieved
  const [allPostData, setAllPostData] = useState<PostSchemaType>([]);

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

        // append new query into saved post data
        setAllPostData((prevData) => [...prevData, ...postData]);
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    },
  );

  return {
    queryPostInfo,
    pagination,
    allPostData,
  };
};

export default useLiveFeed;
