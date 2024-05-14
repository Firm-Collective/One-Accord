import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { signUpWithEmailAndPassword } from '../actions';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password is required.',
  }),
  confirm: z.string().min(6, {
    message: 'Password is required.',
  }),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await signUpWithEmailAndPassword(data);
    const { error } = JSON.parse(result);
    if (error?.message) {
      toast({
        variant: 'destructive',
        title: 'You submitted the follow values: ',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: 'You submitted the follow values: ',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>Successfully registered</code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@gmail.com' {...field} type='email' onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='password' {...field} type='password' onChange={field.onChange} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder='Confirm Password' {...field} type='password' onChange={field.onChange} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full flex gap-2'>
          Register
          {/* <AiOutlineLoading3Quarters className={cn('animate-spin')} /> */}
        </Button>
      </form>
    </Form>
  );
}

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { toast } from '@/components/ui/use-toast';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { signUpWithEmailAndPassword } from '../actions';
// import Image from 'next/image';

// const FormSchema = z
//   .object({
//     email: z.string().email('Invalid email format'),
//     password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
//     confirm: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
//   })
//   .refine((data) => data.password === data.confirm, {
//     message: "Passwords don't match",
//     path: ['confirm'],
//   });

// export default function RegisterForm() {
//   const form = useForm({
//     resolver: zodResolver(FormSchema),
//     mode: 'onChange',
//     defaultValues: {
//       email: '',
//       password: '',
//       confirm: '',
//     },
//   });

//   const onSubmit = async (data) => {
//     const result = await signUpWithEmailAndPassword(data.email, data.password);
//     if (result.error) {
//       toast.error('Failed to register: ' + result.error.message);
//     } else {
//       toast.success('Successfully registered');
//     }
//   };

//   return (
//     <div className='bg-white p-8 rounded-lg max-w-sm w-full'>
//       <div className='flex flex-col items-center mb-6'>
//         <Image height={100} width={100} src='/one-accord.webp' alt='One Accord logo' className='mb-3' />
//         <h1 className='text-xl font-semibold'>Create an Account</h1>
//         <p className='text-gray-500 text-sm'>* indicates required</p>
//       </div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
//           <FormField
//             control={form.control}
//             name='email'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder='example@gmail.com' {...field} type='email' />
//                 </FormControl>
//                 <FormMessage>{form.formState.errors.email?.message}</FormMessage>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='password'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input placeholder='password' {...field} type='password' />
//                 </FormControl>
//                 <FormMessage>{form.formState.errors.password?.message}</FormMessage>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='confirm'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirm Password</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Confirm Password' {...field} type='password' />
//                 </FormControl>
//                 <FormMessage>{form.formState.errors.confirm?.message}</FormMessage>
//               </FormItem>
//             )}
//           />
//           <Button type='submit' className='w-full flex gap-2'>
//             Register
//             <AiOutlineLoading3Quarters className='animate-spin' />
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
