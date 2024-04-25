import React from 'react';
import { supabaseServer } from '@/utils/supabase/server';
import Header from '@/components/LiveFeed/Header';
import FeedMessages from '@/components/LiveFeed/FeedMessages';
import InitUser from '@/utils/store/initUser';
import AddMessages from '@/components/LiveFeed/AddMessages';

export default async function page() {
  const supasbase = supabaseServer();
  const { data } = await (await supasbase).auth.getSession();


  return (

    <>    
    <div className='max-w-3xl mx-auto md:py-10 h-screen'>
      <div className='h-full border rounded-md'>
        <Header />
        <FeedMessages />
        <div className='p-5'>
          <AddMessages/>
        </div>
      </div>
    </div>
    <InitUser user={data.session?.user}/>
    </>

  );
}
