import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'Password is required.',
    }),
});

export const SignUpSchema = z.object({email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password is required.',
  }),})

export type LoginSchemaType = z.input<typeof LoginSchema>;
export type SignUpSchemaType = z.input<typeof SignUpSchema>;


   