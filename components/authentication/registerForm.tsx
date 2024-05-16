import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signUpWithEmailAndPassword } from './actions';

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