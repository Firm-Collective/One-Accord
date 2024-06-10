
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = createClient();

    try {

        const {
            data: { user },
            } = await supabase.auth.getUser();
        
            
          return NextResponse.json({ success: true, user });

    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch user ID' });
    }
}