'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import RegisterForm from '@/app/auth-server-action/components/RegisterForm';
import SignInForm from '@/app/auth-server-action/components/SignInForm';
import OAuthForm from '@/app/auth-server-action/components/OAuthForm';
import { Facebook, Apple } from 'lucide-react';

export default function Onboarding() {
  const [screen, setScreen] = useState(0);

  const nextScreen = () => setScreen((prev) => prev + 1);
  const previousScreen = () => setScreen((prev) => (prev > 0 ? prev - 1 : 0));

  const screenVariants = {
    initial: { opacity: 0, x: 200 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isLoginForm = screen === 0; // Assuming 0 is the login screen, 1 for sign up, etc.

  const onSubmit = (data) => {
    console.log(data);
    // Proceed to the next screen or handle login/signup
    setScreen((prev) => prev + 1);
  };

  const [verificationCode, setVerificationCode] = useState(new Array(6).fill('')); // Array to store each digit of the code
  const [userData, setUserData] = useState({
    username: '',
    country: '',
    city: '',
    birthYear: '',
  });

  const handleVerificationInput = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    // Auto-advance to next input if needed
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className=''>
      <AnimatePresence mode='wait'>
        {screen !== 0 && (
          <motion.button
            className='absolute top-5 left-5 text-gray-700 hover:text-gray-900'
            onClick={previousScreen}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            aria-label='Back'
          >
            <ArrowLeft className='h-6 w-6' />
          </motion.button>
        )}

        {screen === 0 && (
          <motion.div
            key='screen0'
            variants={screenVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='flex flex-col items-center justify-center w-full min-h-screen bg-white'
          >
            <h1 className='text-4xl font-bold text-gray-800 mb-4 text-center'>Welcome to</h1>
            <div className='mb-4'>
              <Image src='/one-accord.webp' alt='logo' width={240} height={240} className='mb-3' />
            </div>
            <p className='text-sm text-gray-600 mb-10 text-center'>One Voice. One Day.</p>
            <div className='w-full max-w-xs mx-auto'>
              <Button className='w-full bg-black text-white py-2 px-10 mb-4 shadow-md transition duration-300 ease-in-out hover:bg-opacity-90'>
                Login
              </Button>
              <Button
                className='w-full bg-white text-black py-2 px-10 mb-4 shadow-md border border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100'
                onClick={() => setScreen(1)}
              >
                Sign Up
              </Button>
              {/* <p className='text-blue-500 cursor-pointer text-center underline mb-4'>Skip to live stream</p> */}
              <div className='text-center '>
                Skip to{' '}
                <a href='#' className='text-blue-500 font-semibold cursor-pointer'>
                  live stream
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 1 && ( // Get Started
          <motion.div key='screen1' variants={screenVariants} initial='initial' animate='animate' exit='exit'>
            {/* <div className='bg-gray-100 flex justify-center items-center h-screen'> */}
            {/* <div className='bg-white p-4 shadow-lg rounded-lg max-w-sm w-full'> */}
            <Image src='/one-accord.webp' alt='logo' width={293} height={48} />
            <div className='rounded-lg p-6 mb-6'>
              <Image
                src='/background-world.png'
                alt='logo'
                width={293}
                height={48}
                className='w-full h-auto rounded-xl'
              />
            </div>

            <div className='text-center mb-6'>
              <h1 className='text-xl text-gray-800 mb-2 font-semibold'>Unified Faith</h1>
              <p className='text-gray-600 text-sm'>
                Your global hub for spiritual growth and community connection. Join believers worldwide in prayer,
                worship, and reflection. Experience unity in faith, wherever you are.
              </p>
            </div>
            <button
              className='w-full bg-gray-800 text-white py-3 rounded-lg font-semibold tracking-wide mb-4'
              onClick={() => setScreen(2)}
            >
              Get Started
            </button>
            <div className='text-center '>
              Skip to{' '}
              <a href='#' className='text-blue-500 font-semibold cursor-pointer'>
                live stream
              </a>
            </div>
          </motion.div>
        )}
        {/* {screen === 2 && ( // register
          <motion.div key='screen2' variants={screenVariants} initial='initial' animate='animate' exit='exit'>
            <h1 className='text-2xl font-bold mb-4'>Create an Account</h1>
            <input className='border border-gray-300 p-2 mb-3 w-full' placeholder='Email' />
            <input className='border border-gray-300 p-2 mb-6 w-full' type='password' placeholder='Password' />
            <button className='bg-green-500 text-white py-2 px-10 rounded-full mb-3' onClick={() => setScreen(3)}>
              Continue
            </button>
            <div className='text-sm mt-4'>
              Already have an account?{' '}
              <span className='text-blue-600 cursor-pointer' onClick={() => setScreen(0)}>
                Login
              </span>
            </div>
          </motion.div>
        )} */}
        {screen === 2 && ( // Sign Up
          <motion.div
            key='screen2'
            variants={screenVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='flex flex-col items-center justify-center px-4 py-8'
          >
            <div className='bg-white p-8 rounded-lg max-w-sm w-full'>
              <div className='flex flex-col items-center mb-6'>
                <Image height={100} width={100} src='/one-accord.webp' alt='One Accord logo' className='mb-3' />
                <h1 className='text-xl font-semibold'>Create an Account</h1>
                <p className='text-gray-500 text-sm'>* indicates required</p>
              </div>
              <RegisterForm />
              <OAuthForm />
              <button className='bg-black text-white py-2 px-10 rounded-full' onClick={nextScreen}>
                Continue
              </button>
            </div>

            {/* <body className='bg-gray-100 flex justify-center items-center h-screen'>
              <div className='bg-white p-8 rounded-lg max-w-sm w-full'>
                <div className='flex flex-col items-center mb-6'>
                  <Image height={100} width={100} src='/one-accord.webp' alt='OneAccord logo' className='mb-3' />
                  <h1 className='text-xl font-semibold'>Create an Account</h1>
                  <p className='text-gray-500 text-sm'>* indicates required</p>
                </div>
                <form className='space-y-6'>
                  <div>
                    <input
                      type='email'
                      placeholder='Email *'
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                    />
                  </div>
                  <div className='relative'>
                    <input
                      type='password'
                      placeholder='Password *'
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                    />
                    <span className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                      <i className='fas fa-eye-slash'></i>
                    </span>
                  </div>
                  <button type='submit' className='w-full bg-gray-800 text-white py-3 rounded-lg font-semibold'>
                    Continue
                  </button>
                </form>
                <div className='text-center my-6'>
                  <p className='text-sm text-gray-500'>
                    Already have an account?{' '}
                    <a href='#' className='text-blue-500'>
                      Login
                    </a>
                  </p>
                </div>
                <p className='text-center text-sm text-gray-400 mb-6'>OR</p>
                <div className='space-y-4'>
                  <button className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                    <Image height={24} width={24} src='/google.svg' alt='Google logo' className='mr-3' /> Sign Up with
                    Google
                  </button>
                  <button className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                    <Image height={24} width={24} src='/facebook.svg' alt='Facebook logo' className='mr-3' /> Sign Up
                    with Facebook
                  </button>
                  <button className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                    <Image height={24} width={24} src='/apple.svg' alt='Apple logo' className='mr-3' /> Sign Up with
                    Apple
                  </button>
                </div>
              </div>
            </body> */}
          </motion.div>
        )}

        {screen === 3 && ( // verify password
          <motion.div key='screen3' variants={screenVariants} initial='initial' animate='animate' exit='exit'>
            <h1 className='text-2xl font-bold mb-4'>Account Details</h1>
            <input className='border border-gray-300 p-2 mb-3 w-full' placeholder='Full Name' />
            <input className='border border-gray-300 p-2 mb-6 w-full' type='tel' placeholder='Phone Number' />
            <button className='bg-purple-500 text-white py-2 px-10 rounded-full' onClick={() => setScreen(4)}>
              Sign Up & Accept
            </button>
          </motion.div>
        )}
        {screen === 4 && (
          <motion.div
            key='screen4'
            variants={screenVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='text-center'
          >
            <h1 className='text-2xl font-bold mb-4'>Verify your email address</h1>
            <p className='mb-6'>
              Please enter the 6-digit verification code that was sent to your email. The code is valid for 30 minutes.
            </p>
            <div className='flex justify-center space-x-2 mb-6'>
              {verificationCode.map((value, index) => (
                <input
                  key={index}
                  className='w-10 h-10 text-center border border-gray-300'
                  maxLength='1'
                  value={value}
                  onChange={(e) => handleVerificationInput(index, e.target.value)}
                />
              ))}
            </div>
            <p className='text-sm mb-4'>
              Didn’t receive the code? <span className='text-blue-600 cursor-pointer'>Re-send verification code</span>
            </p>
            <button className='bg-black text-white py-2 px-10 rounded-full' onClick={nextScreen}>
              Continue
            </button>
          </motion.div>
        )}

        {screen === 5 && (
          <motion.div
            key='screen5'
            variants={screenVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='text-center'
          >
            <h1 className='text-xl font-semibold mb-4'>Verifying...</h1>
            {/* Placeholder for a spinner or progress indicator */}
            <button className='bg-black text-white py-2 px-10 rounded-full' onClick={nextScreen}>
              Continue
            </button>
          </motion.div>
        )}

        {screen === 6 && (
          <motion.div
            key='screen6'
            variants={screenVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='text-center'
          >
            <h1 className='text-2xl font-bold mb-4'>Tell us about yourself</h1>
            <input
              className='border border-gray-300 p-2 w-full mb-3'
              placeholder='Username'
              name='username'
              value={userData.username}
              onChange={handleChange}
            />
            <input
              className='border border-gray-300 p-2 w-full mb-3'
              placeholder='Country'
              name='country'
              value={userData.country}
              onChange={handleChange}
            />
            <input
              className='border border-gray-300 p-2 w-full mb-3'
              placeholder='City'
              name='city'
              value={userData.city}
              onChange={handleChange}
            />
            <input
              className='border border-gray-300 p-2 w-full mb-3'
              placeholder='Birth Year'
              name='birthYear'
              value={userData.birthYear}
              onChange={handleChange}
            />
            <label className='flex items-center space-x-2 mb-4'>
              <input type='checkbox' />
              <span className='text-sm'>Enable Notifications To Stay Updated</span>
            </label>
            <button className='bg-blue-500 text-white py-2 px-10 rounded-full' onClick={nextScreen}>
              Continue
            </button>
          </motion.div>
        )}
        {screen === 7 && (
          <motion.div
            key='screen7'
            variants={screenVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='text-center'
          >
            <h1 className='text-xl font-semibold mb-4'>Hang tight...</h1>
            {/* Placeholder for a spinner or progress indicator */}
            <button className='bg-black text-white py-2 px-10 rounded-full' onClick={nextScreen}>
              Continue
            </button>
          </motion.div>
        )}

        {screen === 8 && (
          <motion.div
            key='screen8'
            variants={screenVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='text-center'
          >
            <Image
              height={100}
              width={100}
              src={userData.profileImage}
              alt='Profile'
              className='w-24 h-24 rounded-full'
            />
            <h1 className='text-2xl font-bold mb-1'>{userData.name}</h1>
            <p className='mb-4'>{userData.email}</p>
            <ul>
              <li className='mb-2'>Profile</li>
              <li className='mb-2'>Notifications</li>
              <li className='mb-2'>Payment & Linked Accounts</li>
              <li className='mb-2'>Help and Support</li>
              <li className='mb-2'>Log Out</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';

// const Onboarding = () => {
//   const [screen, setScreen] = useState(0);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const isLoginForm = screen === 0; // Assuming 0 is the login screen, 1 for sign up, etc.

//   const onSubmit = (data) => {
//     console.log(data);
//     // Proceed to the next screen or handle login/signup
//     setScreen((prev) => prev + 1);
//   };

//   const screenVariants = {
//     initial: { opacity: 0, x: 200 },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -200 },
//   };

//   return (
//     <div>
//       <main className='bg-white flex min-h-screen flex-col items-center p-24'>
//         <AnimatePresence mode='wait'>
//           {screen <= 2 && (
//             <motion.div
//               key={screen}
//               variants={screenVariants}
//               initial='initial'
//               animate='animate'
//               exit='exit'
//               className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'
//             >
//               <div className='sm:mx-auto sm:w-full sm:max-w-md'>
//                 <Image src='/one-accord.webp' alt='logo' width={293} height={48} />
//                 <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
//                   {isLoginForm ? 'Sign in to your account' : 'Create an account'}
//                 </h2>
//               </div>
//               <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-md'>
//                 <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
//                   <div>
//                     <label>Email address</label>
//                     <input {...register('email', { required: 'Email is required' })} />
//                     {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
//                   </div>
//                   <div>
//                     <label>Password</label>
//                     <input type='password' {...register('password', { required: 'Password is required' })} />
//                     {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
//                   </div>
//                   <div>
//                     <button className='bg-blue-500 text-white py-2 px-4 rounded-full' type='submit'>
//                       {isLoginForm ? 'Sign in' : 'Create Account'}
//                     </button>
//                   </div>
//                   <div className='flex items-center justify-between'>
//                     <button
//                       type='button'
//                       onClick={() => setScreen((prev) => (prev === 0 ? 1 : 0))}
//                       className='text-sm text-gray-600 hover:text-gray-900'
//                     >
//                       {isLoginForm ? 'Create an account' : 'Sign in to your account'}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           )}
//           {/* Implement other screens similarly */}
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// };

// export default Onboarding;
