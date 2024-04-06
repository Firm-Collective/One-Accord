import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// logout user from supabase
export async function POST(request: Request) {
  const supabase = createClient();

  // Call signOut method to logout the user
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: 'An error occurred during sign out.' });
  }

  return NextResponse.json({ success: true });
}
