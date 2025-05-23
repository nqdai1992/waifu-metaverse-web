import { z } from 'zod';

// Constants for validation rules
const PASSWORD_MIN_LENGTH = 8;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .regex(EMAIL_REGEX, { message: 'Please enter a valid email address' }),
});

// Password validation schema
export const passwordSchema = z.object({
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(PASSWORD_MIN_LENGTH, {
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    }),
});

// Confirm password validation schema
export const confirmPasswordSchema = z.object({
  confirmPassword: z
    .string()
    .min(1, { message: 'Confirm password is required' }),
});

// Combined schema for sign-in form
export const signInSchema = emailSchema.merge(passwordSchema);

// Type for sign-in form values
export type SignInFormValues = z.infer<typeof signInSchema>;

// Sign-up form schema with password confirmation
export const signUpSchema = emailSchema
  .merge(passwordSchema)
  .merge(confirmPasswordSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Type for sign-up form values
export type SignUpFormValues = z.infer<typeof signUpSchema>;
