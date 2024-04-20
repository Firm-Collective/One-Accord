import React from 'react';
import { supabaseServer } from '@/utils/supabase/server';
import Header from '@/components/LiveFeed/Header';
import MessageInput from '@/components/LiveFeed/MessageInput';
import FeedMessages from '@/components/LiveFeed/FeedMessages';

export default async function page() {
  const supasbase = supabaseServer();
  const { data } = await (await supasbase).auth.getSession();

  console.log(data.session?.user);

  return (
    <div className='max-w-3xl mx-auto md:py-10 h-screen'>
      <div className='h-full border rounded-md'>
        <Header/>
          <FeedMessages/>
        <div className='p-5'>
          <MessageInput/>
        </div>
      </div>
    </div>
  );
}
