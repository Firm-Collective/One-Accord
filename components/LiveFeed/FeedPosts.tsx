import React, { Suspense } from 'react';

import { supabaseServer } from '@/utils/supabase/server';
import { LIMIT_MESSAGE } from '@/constant';


import InitPosts from '@/utils/store/initPosts';
import { Messages } from './MessagesOnFeed/MessageSection';

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
        
        <Messages image = "image-7.png" img = "image.png" profilePictureClassName rectangle = "rectangle.png" image1 = "image-3.png" unsplashIfgrcqhznqg = "unsplash-ifgrcqhznqg.png"/>
        <InitPosts posts={data?.reverse() || []} />
      </Suspense>
    </>
  );
}
