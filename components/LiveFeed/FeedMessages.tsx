import React, { Suspense } from 'react';
import ListMessages from './ListMessages';
import { supabaseServer } from '@/utils/supabase/server';
import InitMessages from '@/utils/store/initMessages';

export default async function FeedMessages() {
  const supabase = supabaseServer();

  const { data } = await (await supabase).from('Post').select('*,users(*)');

  console.log(data);

  return (
    <Suspense fallback={'loading..'}>
      <ListMessages />
      <InitMessages messages={data || []} />
    </Suspense>
  );
}
