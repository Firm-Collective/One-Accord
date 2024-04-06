import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const supabase = createClient();

const postSchema = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(20).max(500),
});


export async function POST(data: { title: string; content: string }) {
    console.log('calling function with data', data);
  try {
    postSchema.parse(data);
   console.log('schema passed');
    
   
    const { data: post, error } = await supabase.from('posts').insert({
      title: data.title,
      content: data.content,
    });

    if (error) {
      return NextResponse.json({ error: 'Error posting blog' });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors });
    }

    console.error('Error posting blog:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
