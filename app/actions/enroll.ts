import {
  EnrollSchema,
  FormState,
} from "@/app/lib/definitions";
import { redirect } from "next/navigation";

export async function enroll(state: FormState, formData: FormData) {
  const validatedFields = EnrollSchema.safeParse({
    email: formData.get("email"),
    training_id: Number(formData.get("training_id")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, training_id } = validatedFields.data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/enrollments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          training_id,
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.message || "Enrollment failed. Please try again.",
      };
    }
  } catch (error) {
    return {
      message: "An unexpected error occurred. Please try again later.",
    };
  }

  redirect("/user/enrolled-trainings");
}
