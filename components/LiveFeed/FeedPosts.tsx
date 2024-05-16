import React, { Suspense } from 'react';

import { supabaseServer } from '@/utils/supabase/server';
import { LIMIT_MESSAGE } from '@/constant';
import ListPosts from './ListPosts';

import InitPosts from '@/utils/store/initPosts';

export default async function FeedPosts() {
  const supabase = await supabaseServer();

  const { data } = await supabase
    .from('Post')
    .select('*,users(*)')
    .range(0, LIMIT_MESSAGE)
    .order('created_at', { ascending: false });

  return (
    <>
      <Suspense fallback={'loading..'}>
        <ListPosts />
        <InitPosts posts={data?.reverse() || []} />
      </Suspense>
    </>
  );
}
