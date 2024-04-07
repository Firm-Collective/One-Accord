import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Sign up a user to Supabase
export async function POST(request: Request) {
  const supabase = createClient();
  const userData = await request.json();

  // Sign up the user
  const { data, error } = await supabase.auth.signUp(userData);

  if (error) {
    return NextResponse.json({ error: 'An error occurred during sign up.' });
  }

  return NextResponse.json({ success: true, data });
}