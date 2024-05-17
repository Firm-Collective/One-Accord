import React from 'react';
import { supabaseServer } from '@/utils/supabase/server';


import InitUser from '@/utils/store/initUser';

import FeedPosts from '@/components/LiveFeed/FeedPosts';

export default async function page() {
  const supasbase = supabaseServer();
  const { data } = await (await supasbase).auth.getSession();

  return (
    <>
      <main
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '5px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          height: '100vh',
          
        }}
      >
        <FeedPosts />

        <div className='p-5'></div>
      </main>

      <InitUser user={data.session?.user} />
    </>
  );
}
