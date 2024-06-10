
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

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
            content: data.content,
            is_visible: data.is_visible,
            is_offensive: data.is_offensive,
            user_id: data.user_id,
            activity_id: data.activity_id,
            category_id: data.category_id,
            tag_id: data.tag_id,
            sentiment_id: data.sentiment_id,
            keywords_id: data.keywords_id,
            event_id: data.event_id,
            media_type_id: data.media_type_id,
            created_at: new Date(),
            picture_post: data.picture_post,
            question_index: data.question_index,
            question: data.question
          });
      
          if (error) {
            return NextResponse.json({ error: error });
          }
      
          return NextResponse.json({ success: true, post });

    } catch (err) {
        return NextResponse.json({ error: 'Internal server error' });
    }
}