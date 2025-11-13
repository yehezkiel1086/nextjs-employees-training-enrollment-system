import * as z from 'zod'
 
export const SignupFormSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
 
export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});
 
export const EnrollSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  training_id: z
    .number()
    .int()
    .positive({ message: "Training ID must be a positive integer." }),
});

export const TrainingFormSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  date: z.string({ message: "Date is required." }),
  duration: z.coerce
    .number()
    .int()
    .positive({ message: "Duration must be a positive number of days." }),
  instructor: z
    .string()
    .min(3, { message: "Instructor name must be at least 3 characters." }),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        training_id?: string[];
        description?: string[];
        date?: string[];
        duration?: string[];
        instructor?: string[];
      };
      message?: string;
    }
  | undefined;