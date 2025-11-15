"use server";

import {
  DeleteTrainingSchema,
  FormState,
  TrainingFormSchema,
} from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";

export async function createTraining(state: FormState, formData: FormData) {
  const validatedFields = TrainingFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    duration: formData.get("duration"),
    instructor: formData.get("instructor"),
    category_id: formData.get("category_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create training.",
    };
  }

  const { title, description, date, duration, instructor, category_id } =
    validatedFields.data;

  const session = await verifySession();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/trainings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `jwt_token=${session.jwt_token}`,
        },
        body: JSON.stringify({
          title,
          description,
          date,
          duration,
          instructor,
          category_id,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.message || "Failed to create training.",
      };
    }
  } catch (error) {
    return {
      message: "An unexpected error occurred. Please try again.",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteTraining(state: FormState, formData: FormData) {
  const validatedFields = DeleteTrainingSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to delete training.",
    };
  }

  const { id } = validatedFields.data;

  const session = await verifySession();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/trainings/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: `jwt_token=${session.jwt_token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.message || "Failed to delete training.",
      };
    }
  } catch (error) {
    return {
      message: "An unexpected error occurred. Please try again.",
    };
  }

  revalidatePath("/");
  return { message: "success" };
}

export async function updateTraining(state: FormState, formData: FormData) {
  const validatedFields = TrainingFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    duration: formData.get("duration"),
    instructor: formData.get("instructor"),
    category_id: formData.get("category_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to update training.",
    };
  }

  const { id, title, description, date, duration, instructor, category_id } =
    validatedFields.data;

  if (!id) {
    return { message: "Training ID is missing. Cannot update." };
  }

  const session = await verifySession();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/trainings/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `jwt_token=${session.jwt_token}`,
        },
        body: JSON.stringify({
          title,
          description,
          date,
          duration,
          instructor,
          category_id,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.message || "Failed to update training.",
      };
    }
  } catch (error) {
    return {
      message: "An unexpected error occurred. Please try again.",
    };
  }

  revalidatePath("/");
  redirect("/");
}