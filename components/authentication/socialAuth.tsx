import Button from '../button';
import useSocialAuth from './hooks/useSocialAuth';

export default function SocialAuth() {
  const { loginWithGoogle, loginWithFacebook, loginWithApple } = useSocialAuth();

  return (
    <div>
      <div className='w-full flex items-center justify-center mt-6 mb-4'>
        <div className='flex-1 h-[1px] bg-black'></div>
        <span className='px-3 text-xs text-black'>OR</span>
        <div className='flex-1 h-[1px] bg-black'></div>
      </div>
      <div className='flex flex-col gap-2'>
        <Button
          variant='third'
          imageUrl='/google.svg'
          text={'Continue with Google'}
          type='submit'
          onClick={loginWithGoogle}
        />
        <Button
          variant='third'
          imageUrl='/facebook.svg'
          text={'Continue with Facebook'}
          type='submit'
          onClick={loginWithFacebook}
        />
        <Button
          variant='third'
          imageUrl='/apple.svg'
          text={'Continue with Apple'}
          type='submit'
          onClick={loginWithApple}
        />
      </div>
      <div className='mt-4 text-xs text-black flex gap-[6px] items-center justify-center'>
        <span className='cursor-pointer text-blue-500 hover:text-blue-600 '>Terms of Use</span>
        <span>|</span>
        <span className='cursor-pointer text-blue-500 hover:text-blue-600 '>Privacy Policy</span>
      </div>
    </div>
  );
}
