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

export const UserTypeArr = z.array(UserType)

export const ProfileSchema = z.object({
  username: z.string().min(4).nullish(),
  user_type_code: z.string(),
  user_type_id: UserType.shape.id.nullish(),
  country: z.string(),
  city: z.string(),
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

// Location Schema
const LocationSchema = z.object({
  id: z.string().uuid(),
  city: z.string(),
  country: z.string()
}).nullish();

// UserType Schema
const UserTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
}).nullish();

// User Schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().nullish(),
  birth_year: z.string().refine(dateString => {
    return !isNaN(Date.parse(dateString));
  }, {
    message: "Invalid date format"
  }),
  UserType: UserTypeSchema,
  Location: LocationSchema
});

export type LoginSchemaType = z.input<typeof LoginSchema>;
export type SignUpSchemaType = z.input<typeof SignUpSchema>;
export type ProfileSchemaType = z.input<typeof ProfileSchema>;
export type UserTypeType = z.input<typeof UserType>;





   