import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation'
 
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  const { name, email, password } = validatedFields.data

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      return {
        message:
          errorData.message || 'Registration failed. Please try again.',
      }
    }
  } catch (error) {
    return {
      message: 'An unexpected error occurred. Please try again later.',
    }
  }

  redirect('/login')
}