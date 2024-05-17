import { getUser } from '@/utils/supabase/auth';
import { redirect } from 'next/navigation';

export default async function DefaultLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect('login');
  }

  return <>{children}</>;
}

