"use client";

import { useState } from "react";
import { updateProfileSettings } from "@/app/actions/settings";
import { Save, User, MapPin, Globe, Phone } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";

interface ProfileData {
  full_name: string;
  phone: string;
  city: string;
  state: string;
  preferred_language: string;
}

export function SettingsForm({ initialData }: { initialData: ProfileData }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const result = await updateProfileSettings(formData);

    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("Settings saved successfully!");
      setTimeout(() => setStatus("idle"), 3000);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
          {message}
        </div>
      )}
      {status === "success" && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
            <User size={16} /> Full Name
          </label>
          <input
            type="text"
            name="full_name"
            defaultValue={initialData.full_name || ""}
            placeholder="John Doe"
            className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
            <Phone size={16} /> Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            defaultValue={initialData.phone || ""}
            placeholder="+91 9876543210"
            className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
            <MapPin size={16} /> City
          </label>
          <input
            type="text"
            name="city"
            defaultValue={initialData.city || ""}
            placeholder="Mumbai"
            className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
            <MapPin size={16} /> State
          </label>
          <input
            type="text"
            name="state"
            defaultValue={initialData.state || ""}
            placeholder="Maharashtra"
            className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
            <Globe size={16} /> Preferred Language
          </label>
          <select
            name="preferred_language"
            defaultValue={initialData.preferred_language || "english"}
            className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
          >
            <option value="english">English</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex justify-end">
        <NeonButton 
          type="submit" 
          variant="teal"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save size={18} /> Save Settings
            </span>
          )}
        </NeonButton>
      </div>
    </form>
  );
}
