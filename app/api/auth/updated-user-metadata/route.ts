import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { z } from "zod";

const rawUserMetadataSchema = z.object({
    userType: z.object({
      id: z.string().nullish(),
      name: z.string().nullish(),
    })
  });

export async function POST(request: Request) {
  const supabase = createClient();
  const data = await request.json();

  if (!rawUserMetadataSchema.safeParse(rawUserMetadataSchema).success) {
    console.error("Wrong schema for RawUserMetadata");
    return;
  }

  const { data: user, error } = await supabase.auth.admin
      .updateUserById(data.userId, {
          user_metadata: { ...data.userType },
      })
  

  if (error) {
    return NextResponse.json({ error: 'An error occurred during updating the user metadata.' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
