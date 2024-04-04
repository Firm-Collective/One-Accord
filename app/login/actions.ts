'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

// Define schema for form data
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function login(formData: FormData) {
  const supabase = createClient()

  try {
    const data = loginSchema.parse({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      console.error(error)
      return { error: 'An error occurred during login.' };
    }

    return { success: true };
  } catch (error) {
    // Handle validation errors and return helpful error messages
    console.error(error);
    return { error: 'Invalid login credentials.' };
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  try {
    const data = signupSchema.parse({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    const { error } = await supabase.auth.signUp(data)

    if (error) {
      return { error: 'An error occurred during signup.' };
    }

    return { success: true };
  } catch (error) {
    // Handle validation errors and return helpful error messages
    console.error(error);
    return { error: 'Invalid signup data.' };
  }
}
