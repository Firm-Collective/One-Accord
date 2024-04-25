import { PrismaClient } from '@prisma/client/extension';
import { createBrowserClient } from '@supabase/ssr';

export const supabaseBrowswer = () => 
    createBrowserClient<PrismaClient>(
        
        process.env.NEXT_PUBLIC_SUPABASE_URL!, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    );
