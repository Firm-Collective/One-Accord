import { useQuery } from 'react-query';
import { createClient } from '@/utils/supabase/client';
import { postAPI, postKeys } from '../queries';
import axios from 'axios';

const useLiveFeed = () => {
    const supaClient = createClient();

    const fetchUserAuth = async () => {
      try {
        const response = await axios.get('/api/user/getAuthId'); 
        return response;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        return null; // Return anonymous user ID in case of error
      }
    };
    const userAuth = useQuery(['userAuth'], fetchUserAuth);

    

    // useQuery
  const queryPostInfo: any = useQuery([...postKeys.lists()], async () => {
    try {
      const postData = await postAPI.getPostData({ supaClient });
      return postData?.data;
    } catch (error) {
      console.error("Error fetching post data:", error);
      throw error;
    }
  }, {
    onSuccess: (postData) => {
      if (!postData) {
        console.error("No data found on posts.");
        return [];
      }
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

    return {
      queryPostInfo,
      userAuth,
      
    }
}

export default useLiveFeed;