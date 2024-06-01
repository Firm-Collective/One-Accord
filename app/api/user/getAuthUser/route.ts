import { getUser } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = createClient();

    try {
        const user = await getUser();

        const isAuthenticated = !!user; // Checks if the user object is not null or undefined

        return NextResponse.json({ success: true, isAuthenticated, user });
    } catch (err) {
        return NextResponse.json({ success: false, error: 'Failed to fetch user ID', isAuthenticated: false });
    }
}
