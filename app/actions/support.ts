"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function submitSupportMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Name, email, and message are required." };
  }

  const { error } = await supabaseAdmin.from("platform_messages").insert({
    name,
    email,
    subject,
    message,
  });

  if (error) {
    console.error("Error submitting support message:", error);
    return { error: "Failed to send message. Please try again." };
  }

  return { success: true };
}
