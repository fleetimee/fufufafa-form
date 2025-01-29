import { sql } from "@/db/dbConfiguration";
import { AddMemberFormSchema } from "../schema/add-member-schema";
import { z } from "zod";

/**
 * Adds a new member to the database.
 *
 * @param data - The data for the new member, inferred from the AddMemberFormSchema.
 * @returns An object indicating success or an error message if the operation fails.
 *
 */
export async function addMemberMutation(
  data: z.infer<typeof AddMemberFormSchema>
) {
  "use server";

  try {
    await sql`
      INSERT INTO tbl_user (nama, email) 
      VALUES (${data.nama}, ${data.email})
    `;
    return { success: true };
  } catch {
    return { error: "Failed to add member" };
  }
}
