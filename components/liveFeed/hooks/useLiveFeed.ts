import { useQuery } from 'react-query';
import { createClient } from '@/utils/supabase/client';
import { postAPI, postKeys } from '../queries';
import usePagination from './usePagination';
import { useState } from 'react';
import { type PostSchemaType } from '../schemas';
import useFetchPosts from './useFetchPosts';

const useLiveFeed = () => {
  const supaClient = createClient();
  const paginationPinned = usePagination('pinned'); // pagination for pinned posts
  const paginationOther = usePagination('other'); // pagination for other posts

  const [pinnedPostData, setPinnedPostData] = useState<PostSchemaType>([]);
  const [otherPostData, setOtherPostData] = useState<PostSchemaType>([]);

  // Fetch pinned posts
  const queryPinnedPostInfo = useFetchPosts(
    [...postKeys.lists(), 'influencerOrModeratorPosts', paginationPinned],
    () =>
      postAPI.getPinnedPosts({
        supaClient,
        from: paginationPinned.pagination.from,
        pageSize: paginationPinned.pagination.pageSize,
      }),
    setPinnedPostData,
  );

  // Fetch other posts
  const queryOtherPostInfo = useFetchPosts(
    [...postKeys.lists(), 'otherPosts', paginationOther],
    () =>
      postAPI.getOtherPosts({
        supaClient,
        from: paginationOther.pagination.from,
        pageSize: paginationOther.pagination.pageSize,
      }),
    setOtherPostData,
  );

  // refetch function
  const refetch = () => {
    paginationPinned.resetPagination();
    paginationOther.resetPagination();
    queryPinnedPostInfo.refetch();
    queryOtherPostInfo.refetch();
  };

  return {
    queryOtherPostInfo,
    queryPinnedPostInfo,
    pinnedPostData,
    otherPostData,
    paginationPinned,
    paginationOther,
    refetch,
  };
};

export default useLiveFeed;