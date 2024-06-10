import { Header } from '@/components/landing/ui/header';
import { getUser } from '@/utils/supabase/auth';
import { redirect } from 'next/navigation';

export default async function DefaultLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect('login');
  }

  return <><div>
          <Header />

    {children}
    </div></>;
}

