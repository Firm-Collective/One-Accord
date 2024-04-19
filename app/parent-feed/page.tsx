import React from 'react';
import { supabaseServer } from '@/utils/supabase/server';
import Header from '@/components/LiveFeed/header';
import MessageInput from '@/components/LiveFeed/MessageInput';

export default async function page() {
  const supasbase = supabaseServer();
  const { data } = await (await supasbase).auth.getSession();

  console.log(data.session?.user);

  return (
    <div className='max-w-3xl mx-auto md:py-10 h-screen'>
      <div className='h-full border rounded-md'>
        <Header></Header>
        <div className='flex-1 flex flex-col p-5 h-full overflow-y-auto'></div>
        <div className='flex-1 '></div>
        <div className='space-y-7'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
            return (
              <div className='flex gap-2' key={value}>
                <div className='h-10 w-10 bg-green-500 rounded-full'></div>
                <div className='flex-1'>
                  <div className='flex items-center gap-1'>
                    <h1 className='font-bold'>Mario</h1>
                    <h1 className='text-sm text-gray-400'>{new Date().toDateString()}</h1>
                  </div>
                  <p>
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cum, dolorem non molestiae
                    temporibus, a odit dicta perferendis natus voluptates, hic dolore earum corporis veritatis sit
                    debitis illum obcaecati asperiores!
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className='p-5'>
          <MessageInput></MessageInput>
        </div>
      </div>
    </div>
  );
}
