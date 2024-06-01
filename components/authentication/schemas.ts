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
  })
})


export const UserType = z.object({
  id: z.string(),
  name: z.string()
})

export const ProfileSchema = z.object({
  username: z.string().min(4),
  user_type_id: UserType.shape.id,
  country: z.string().min(2),
  city: z.string().min(2),
  birth_year: z.string().nullable().refine((value) => {
    if (!value) return true;
  
    const today = new Date();
    const dateOfBirth = new Date(value);
    let ageDiff = today.getFullYear() - dateOfBirth.getFullYear();
  
    dateOfBirth.setFullYear(today.getFullYear());

    if (today < dateOfBirth) {
      ageDiff--;
    }
  
    return ageDiff >= 18; 
  }, {
    message: "You must be over 18 years old to register.",
    path: ["birth_year"],
  })
});

export const UserTypeArr = z.array(UserType)



export type LoginSchemaType = z.input<typeof LoginSchema>;
export type SignUpSchemaType = z.input<typeof SignUpSchema>;
export type ProfileSchemaType = z.input<typeof ProfileSchema>;
export type UserTypeType = z.input<typeof UserType>;





   