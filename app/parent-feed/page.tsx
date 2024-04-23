import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Header from '@/components/LiveFeed/Header';
import FeedMessages from '@/components/LiveFeed/FeedMessages';
import AddMessage from '@/components/LiveFeed/AddMessage';

export default async function page() {
  const supasbase = createClient();
  const { data } = await (await supasbase).auth.getSession();

  console.log(data.session?.user);

  return (
    <div className='max-w-3xl mx-auto md:py-10 h-screen'>
      <div className='h-full border rounded-md'>
        <Header />
        <FeedMessages />
        <div className='p-5'>
          <AddMessage/>
        </div>
      </div>
    </div>
  );
}
