import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';


export async function POST() {

  const supabase = createClient();

  console.log('supabase', supabase);

return NextResponse.json({ message: 'Hello World' });
 
}