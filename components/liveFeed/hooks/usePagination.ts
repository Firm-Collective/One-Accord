import { useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
const usePagination = (initialFrom = 0, initialPageSize = 10) => {
  const [pagination, setPagination] = useState({ from: initialFrom, pageSize: initialPageSize });
  const supaClient = createClient();

  const getMaxPageSize = useCallback(async () => {
    const countQuery = await supaClient.from('Post').select('*', { count: 'exact', head: true });
    const maxPageSize = countQuery.count || 10;
    return maxPageSize;
  }, [supaClient]);

  const incrementPagination = useCallback(async () => {
    const maxPageSize = await getMaxPageSize();

    // if we reach the end of our posts, then stop increasing the pagination
    if (pagination.pageSize < maxPageSize - 1) {
      setPagination((prev) => ({
        ...prev,
        from: prev.pageSize + 1,
        pageSize: prev.pageSize + 10,
      }));
    }
  }, [pagination.pageSize, getMaxPageSize]);

  const resetPagination = useCallback(() => {
    setPagination({ from: initialFrom, pageSize: initialPageSize });
  }, [initialFrom, initialPageSize]);

  return {
    pagination,
    setPagination,
    incrementPagination,
    getMaxPageSize,
    resetPagination,
  };
};

export default usePagination;
