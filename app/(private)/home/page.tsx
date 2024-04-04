import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <div className='bg-white flex min-h-screen flex-col items-center justify-between p-24'>
      <h1
        className='text-2xl font-bold leading-9 tracking-tight text-gray-900'
      >Welcome back, {data.user.email}</h1>
      <button >Sign out</button>
    </div>
  );
}
