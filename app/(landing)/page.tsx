import Blob from '@/components/blob';
import WelcomeScreen from '@/components/landing/welcome';


export default function Page() {
  return (
    <div className='overflow-x-hidden max-w-screen'>
      <Blob />
      <WelcomeScreen />
    </div>
  );
}
