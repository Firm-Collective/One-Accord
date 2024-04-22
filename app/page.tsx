import AuthenticationForm from '@/components/authenticationForm';
import { getUser } from '@/utils/supabase/auth';
import WelcomeScreen from './(auth)/welcome/page';

export default async function Home() {
  const user = await getUser();

  return <WelcomeScreen />;
}
