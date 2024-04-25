import { create } from 'zustand';
import { User } from '@supabase/supabase-js';


export type Imessage ={
    

    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    authorId: string;

}

interface MessageState {
  messages: Imessage[];
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
}));
