import { Button } from '@/components/ui/button';
import createSupabaseServerClient from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default function SignOut() {
  const logout = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/auth-server-action');
  };
  return (
    <form action={logout}>
      <Button>Sign Out</Button>
    </form>
  );
}
