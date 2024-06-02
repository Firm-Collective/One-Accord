import { getUser } from '@/utils/supabase/auth';
import { redirect } from 'next/navigation';

export default async function DefaultLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  console.log("🚀 ~ DefaultLayout ~ user:", user)

  if (!user) {
    redirect('login');
  }

  return <><div>
    {/* <Header /> */}
    {children}
    </div></>;
}

