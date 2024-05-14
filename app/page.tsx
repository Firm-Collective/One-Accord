import Onboarding from '@/components/Onboarding';
// import { getUser } from '@/utils/supabase/auth';

export default async function Home() {
  // const user = await getUser();

  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-center p-24'>
      {/* <main>   */}
      {/* TODO:
      Implement authorization ->
       */}
      <Onboarding />
    </main>
  );
}
