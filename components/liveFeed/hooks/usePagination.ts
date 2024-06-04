/*
  This hook is used to handle pagination for the live feed page.
*/

import { useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
const usePagination = (containerName: string, initialFrom = 0, initialPageSize = 10) => {
  const [pagination, setPagination] = useState({ from: initialFrom, pageSize: initialPageSize });
  const supaClient = createClient();

  /**
   * Gets the number of pinned posts from supabase.
   */
  const getPinnedPostsCount = useCallback(async () => {
    const query = await supaClient
      .from('Post')
      .select(
        `
          *,
          User!inner(id, username, UserType:UserType!inner(id, name), Location:Location(id, city, country, latitude, longitude))
        `,
        { count: 'exact', head: true },
      )
      .in('User.UserType.name', ['Moderator', 'Influencer']);

    const count = query.count || 10;
    return count;
  }, [supaClient]);

  /**
   * Gets the number of registered posts from supabase
   */
  const getOtherPostsCount = useCallback(async () => {
    const query = await supaClient
      .from('Post')
      .select(
        `
          *,
          User!inner(id, username, UserType:UserType!inner(id, name), Location:Location(id, city, country, latitude, longitude))
        `,
        { count: 'exact', head: true },
      )
      .in('User.UserType.name', ['Registered']);

    const count = query.count || 10;
    return count;
  }, [supaClient]);

  /**
   * Gets the max page size for current pagination type
   */
  const getMaxPageSize = useCallback(async () => {
    let maxPageSize = 10;
    switch (containerName) {
      case 'pinned':
        maxPageSize = await getPinnedPostsCount();
        break;
      case 'other':
        maxPageSize = await getOtherPostsCount();
        break;
      // add more if need be
      default:
        break;
    }
    return maxPageSize;
  }, [containerName, getPinnedPostsCount, getOtherPostsCount]);

  /**
   * Goes to next pagination by changing the 'from' and 'pageSize' parameter.
   * Initially it gets posts 0-10. When we call incrementPagination once it gets posts
   * 11-20 and so on until it reaches the maximum posts.
   */
  const incrementPagination = useCallback(async () => {
    const maxPageSize = (await getMaxPageSize()) | 10;

    // if we reach the end of our posts, then stop increasing the pagination
    if (pagination.pageSize < maxPageSize - 1) {
      setPagination((prev) => ({
        ...prev,
        from: prev.pageSize + 1,
        pageSize: prev.pageSize + 10,
      }));
    }
  }, [pagination.pageSize, getMaxPageSize]);

  /**
   * Resets the pagination by making 'from' and 'page'size' back to initial values.
   */
  const resetPagination = useCallback(() => {
    setPagination((prev) => {
      return {
        ...prev,
        from: 0,
        pageSize: prev.pageSize,
      };
    });
  }, []);

  return {
    pagination,
    setPagination,
    incrementPagination,
    getMaxPageSize,
    resetPagination,
  };
};

export default usePagination;
