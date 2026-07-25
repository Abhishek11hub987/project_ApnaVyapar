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
        <div className="w-12 h-12 bg-cyan/10 border border-cyan/20 rounded-xl flex items-center justify-center">
          <Settings className="text-cyan" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Settings</h1>
          <p className="text-white/50 text-sm mt-1">Manage your account preferences and profile information.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 md:p-8 border-white/5">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="w-16 h-16 bg-navy border border-white/10 rounded-full flex items-center justify-center">
              <UserCircle className="text-white/40" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Profile Information</h2>
              <p className="text-white/50 text-sm">{profile.email}</p>
            </div>
          </div>

          <SettingsForm initialData={profile} />
        </div>
      </div>
    </div>
  );
}
