'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from 'react-query';
import Button from '@/components/button';
import Input from '@/components/input';
import axios from 'axios';

type FormValues = {
  title: string;
  content: string;
};

const schema = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(20).max(500),
});

export default function BlogPage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const createBlogMutation = useMutation((blogData: FormValues) => axios.post('/api/example/blogs', blogData), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    createBlogMutation.mutate(data);
  };

  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create a New Blog
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className='mt-2'>
                <Input label='Title' name='title' register={{ ...register('title') }} />
              </div>
              {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
            </div>

            <div>
              <div className='mt-2'>
                <Input label='Content' name='content' register={{ ...register('content') }} />
                {errors.content && <p className='text-red-500 text-sm'>{errors.content.message}</p>}
              </div>
            </div>
            {createBlogMutation.isError && (
              <p className='text-red-500 text-sm'>An error occurred while creating the blog.</p>
            )}
            <div>
              <Button
                variant='primary'
                text={createBlogMutation.isLoading ? 'Creating Blog...' : 'Create Blog'}
                disabled={createBlogMutation.isLoading}
                type='submit'
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
