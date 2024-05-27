import Blob from '@/components/landing/blob';
import WelcomeScreen from '@/components/landing/welcome';

export default function Page() {
  return (
    <div className='overflow-x-hidden max-w-screen'>
      {/* the blob is floating colorful poltergeist */}
      <Blob />
      {/* contains "Welcome to One Accord" welcome message
      along with cta's of login or sign up */}
      <WelcomeScreen />
    </div>
  );
}
