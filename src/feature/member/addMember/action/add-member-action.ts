"use server";

import { revalidatePath } from "next/cache";
import { AddMemberFormSchema } from "@/feature/member/addMember/schema/add-member-schema";
import { addMemberMutation } from "@/feature/member/addMember/mutation/add-member-mutation";

export async function onAddMemberSubmitAction(
  prevState: any,
  formData: FormData
) {
  try {
    // Parse FormData into an object
    const formDataObj = Object.fromEntries(formData.entries());

    // Validate the form data using Zod schema
    const validatedField = AddMemberFormSchema.safeParse(formDataObj);

    //   Return early if the form data is invalid
    if (!validatedField.success) {
      return {
        errors: validatedField.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      };
    }

    const data = validatedField.data;

    const result = await addMemberMutation(data);

    if (result.error) {
      return {
        success: false,
        message: result.error,
      };
    }

    // Revalidate the members page
    revalidatePath("/members");

    return {
      success: true,
      message: "User created successfully!",
    };
  } catch (error) {
    console.error("Error onAddMemberSubmitAction:", error);
    return {
      success: false,
      message: "An error occurred while creating the user.",
    };
  }
}
