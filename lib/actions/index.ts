'use server';
import createSupabaseServerClient from '../supabase/server';

export default async function readUserSession() {
  const supabase = await createSupabaseServerClient();
  // return supabase.auth.getSession();

  // const { data } = await supabase.auth.getSession();
  // const { data } = await supabase.auth.getUser();

  return supabase.auth.getUser();
}
