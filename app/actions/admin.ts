"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function markMessageRead(id: number) {
  const { error } = await supabaseAdmin
    .from("platform_messages")
    .update({ is_read: true })
    .eq("id", id);

  if (error) {
    console.error("Error marking message as read:", error);
    return { error: "Failed to update message." };
  }

  revalidatePath("/dashboard/admin/messages");
  return { success: true };
}
