/**
 * This hook is used to help handle fetching new posts
 */

import { useQuery, QueryKey } from 'react-query';

const useFetchPosts = (queryKey: QueryKey, fetchFunction: () => any, setData: any) => {
  /**
   * Handles filtering and sorting post data.
   * @param existingPosts is the posts that we already fetched
   * @param newPosts is the posts just fetched
   * @returns the combined posts that are filtered for duplicates and sorted.
   */
  const filterAndSortPosts = (existingPosts: any, newPosts: any) => {
    // make sure posts are not duplicated
    const existingPostIds = new Set(existingPosts.map((post: any) => post.id));
    const filteredPosts = newPosts.filter((post: any) => !existingPostIds.has(post.id));
    const combinedPosts = [...existingPosts, ...filteredPosts];
    // sort the posts by created_at param
    combinedPosts.sort((a: any, b: any) => b.created_at.localeCompare(a.created_at));

    return combinedPosts;
  };

  return useQuery(
    queryKey,
    async () => {
      try {
        const postData = await fetchFunction();
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
        // on success, update our posts state
        setData((prev: any) => {
          const filteredPosts = filterAndSortPosts(prev, postData);
          return filteredPosts;
        });
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    },
  );
};

export default useFetchPosts;
