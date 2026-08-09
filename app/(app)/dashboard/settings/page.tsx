import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { Settings, UserCircle } from "lucide-react";

export const metadata = {
  title: "Settings | Apna Vyapar Dashboard",
};

export default async function SettingsPage() {
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
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, city, state, preferred_language, email")
    .eq("id", session.user.id)
    .single();

  if (!profile) {
    redirect("/dashboard");
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
          <Settings className="text-gray-500" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account preferences and profile information.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-100 rounded-lg shadow-card p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center">
              <UserCircle className="text-gray-400" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              <p className="text-gray-500 text-sm">{profile.email}</p>
            </div>
          </div>

          <SettingsForm initialData={profile} />
        </div>
      </div>
    </div>
  );
}
