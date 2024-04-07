import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { User } from "../../../../utils/types";

// Sign up a user to Supabase and create a user record in the database
export async function POST(request: Request) {
  const supabase = createClient();
  const userData = await request.json();

  try {
    // Sign up the user with Supabase authentication
    const { data, error } = await supabase.auth.signUp(userData);

    if (error) {
      console.error('Error signing up user:', error);
      return NextResponse.json({ error: 'An error occurred during sign up.' }, { status: 400 });
    }

    // Create a corresponding user record in the database
    const newUser = await supabase.from('User').insert({
      id: data?.user?.id,
      email: userData.email,
    });

    console.log('User signed up and added to database:', newUser);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error signing up user:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
