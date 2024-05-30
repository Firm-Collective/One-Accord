
import { getUser } from '@/utils/supabase/auth';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {


    try {

        const user = await getUser();
        console.log(user, "message");

          return NextResponse.json({ success: true, user });

    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch user ID' });
    }
}