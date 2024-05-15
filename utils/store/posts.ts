import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

export type IPost = {
 

category_id: string;
content: string;
created_at: string;
event_id: string;
id: string;
is_offensive: boolean;
is_visible: boolean;
keywords_id: string;
media_type_id: string;
sentiment_id: string;
tag_id: string | null;
user_id: string;
users: {}[];


};

interface PostState {
  posts: IPost[];
}

export const usePost = create<PostState>()((set) => ({
  posts: [],
}));
