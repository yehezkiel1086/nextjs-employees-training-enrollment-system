import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/app/lib/definitions";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.message || "Registration failed. Please try again.",
      };
    }
  } catch (error) {
    return {
      message: "An unexpected error occurred. Please try again later.",
    };
  }

  redirect("/login");
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message:
          errorData.message || "Login failed. Please check your credentials.",
      };
    }
  } catch (error) {
    return {
      message: "An unexpected error occurred. Please try again later.",
    };
  }

  redirect("/dashboard");
}
