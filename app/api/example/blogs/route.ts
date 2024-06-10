import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// TODO:
// 1. I know it may seem like an anti-pattern to call supabase in the api route, but my thought
//    process is to decouple supabase from the client using the api route and prisma. This way
//    we can always switch to another database without changing the client code.

const postSchema = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(20).max(500),
});

export async function POST(request: Request) {
  const supabase = createClient();
  const data = await request.json();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'User is not authenticated' });
    }

    const { data: post, error } = await supabase.from('Post').insert({
      title: data.title,
      content: data.content,
      authorId: user.id,
      id: Math.random().toString(36).substring(7),
      updatedAt: new Date().toISOString(),
    });

    if (error) {
      return NextResponse.json({ error: error });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors });
    }

    console.error('Error posting blog:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
