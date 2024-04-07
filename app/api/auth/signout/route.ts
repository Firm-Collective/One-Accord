import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
     return NextResponse.json({ error: 'An error occurred during login.' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
