import AuthenticationForm from '@/components/authenticationForm';
import CountdownTimer from '@/components/countdownTimer';
import { getUser } from '@/utils/supabase/auth';

export default async function Home() {
  const user = await getUser();

  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-center p-24'>
      {/* TODO:
       This auth form is boilerplate that needs to be reworked
       We need to think through the user experience for the authentication form.
       1. We could have a separate login and signup forms
       2. We could have a single form with a toggle between login and signup
       3. We could follow the airbnb approach of having a single form that is loops through the database to see if 
       the user exists and then logs them in or signs them up 
       */}
      {/* <AuthenticationForm /> */}
      <CountdownTimer />
    </main>
  );
}
