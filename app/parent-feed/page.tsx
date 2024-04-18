import React from 'react';
import Form from '../../components/LiveFeed/Form';
import Button from '@/components/button';

import { supabaseServer } from '@/utils/supabase/server';



export default async function page() {

  const supasbase = supabaseServer();
  const { data } = await (await supasbase).auth.getSession();

  console.log(data.session?.user);

  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-between p-24'>
      
      <div >
      <Form />
      <Button
        variant={'primary'}
        text={'Submit'}
      // onClick={handleSubmit} // Remove the onClick handler for now
      />
      </div>
    </main>
  );
}




