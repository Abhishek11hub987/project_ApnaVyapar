"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateProfileSettings(formData: FormData) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return { error: "Not authenticated" };
    }

    const updates = {
      full_name: formData.get("full_name") as string,
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      preferred_language: formData.get("preferred_language") as string,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", session.user.id);

    if (error) {
      console.error("Error updating profile:", error);
      return { error: "Failed to update profile. Please try again." };
    }

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error: any) {
    console.error("Settings error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}
