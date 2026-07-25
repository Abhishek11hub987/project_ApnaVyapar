"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Store, Globe, Palette, Share2, Copy, PhoneCall, Mail, Type } from "lucide-react";
import Link from "next/link";

export default function StoreBuilderPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    id: "",
    store_name: "",
    slug: "",
    theme_color: "#00D4FF",
    is_active: true,
    support_email: "",
    support_phone: "",
    hero_text: "",
  });

  const addLog = (msg: string) => {
    console.log(msg);
    setDebugLog(prev => [...prev, msg]);
  };

  useEffect(() => {
    let isMounted = true;
    addLog("useEffect mounted");
    
    async function fetchStoreSettings() {
      addLog("fetchStoreSettings started");
      try {
        const { data: userData, error: authError } = await supabase.auth.getUser();
        addLog(`getUser finished. authError: ${authError?.message}, user: ${userData?.user?.id}`);
        
        if (authError || !userData?.user) {
          addLog("No user, returning");
          return;
        }

        addLog("Fetching store settings...");
        const { data, error } = await supabase
          .from("store_settings")
          .select("*")
          .eq("user_id", userData.user.id)
          .single();

        addLog(`Fetch settings finished. Error: ${error?.message}`);

        if (error && error.code !== "PGRST116") {
          console.error(error);
        } else if (data && isMounted) {
          addLog("Setting form data");
          setFormData({
            id: data.id,
            store_name: data.store_name,
            slug: data.slug,
            theme_color: data.theme_color,
            is_active: data.is_active,
            support_email: data.support_email || "",
            support_phone: data.support_phone || "",
            hero_text: data.hero_text || "",
          });
        }
      } catch (err: any) {
        addLog(`Catch block hit: ${err?.message}`);
        console.error(err);
      } finally {
        addLog("Finally block hit");
        if (isMounted) {
          addLog("Setting loading false");
          setLoading(false);
        }
      }
    }
    
    fetchStoreSettings();
    return () => { 
      addLog("useEffect cleanup");
      isMounted = false; 
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("Not authenticated");

      if (formData.id) {
        // Update existing
        const { error } = await supabase
          .from("store_settings")
          .update({
            store_name: formData.store_name,
            slug: formData.slug,
            theme_color: formData.theme_color,
            is_active: formData.is_active,
            support_email: formData.support_email,
            support_phone: formData.support_phone,
            hero_text: formData.hero_text,
          })
          .eq("id", formData.id);
        if (error) throw error;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from("store_settings")
          .insert({
            user_id: userData.user.id,
            store_name: formData.store_name,
            slug: formData.slug,
            theme_color: formData.theme_color,
            is_active: formData.is_active,
            support_email: formData.support_email,
            support_phone: formData.support_phone,
            hero_text: formData.hero_text,
          })
          .select()
          .single();
        if (error) throw error;
        if (data) setFormData(prev => ({ ...prev, id: data.id }));
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save store settings.");
    } finally {
      setSaving(false);
    }
  };

  const storeUrl = formData.slug ? `${typeof window !== 'undefined' ? window.location.origin : ''}/store/${formData.slug}` : "";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Store Builder</h1>
        <p className="text-white/60">Configure your public storefront where customers can view and buy your products.</p>
        
        {/* Debug UI block */}
        <div className="mt-4 p-4 bg-black/50 text-xs font-mono text-green-400 rounded overflow-auto max-h-32">
          {debugLog.length === 0 ? "No logs..." : debugLog.map((log, i) => <div key={i}>{log}</div>)}
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-12 flex justify-center items-center flex-col">
          <div className="w-8 h-8 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin mb-4" />
          <button onClick={() => setLoading(false)} className="text-xs text-white/40 underline">Force Skip Loading</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6 md:p-8 border-white/5 space-y-8">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-teal-500/10 border border-teal-500/20 text-teal-400 p-4 rounded-xl text-sm font-medium">
                Store settings saved successfully!
              </div>
            )}

            {/* Store Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                <Store size={18} className="text-cyan" />
                <h3 className="text-lg font-bold text-white">Store Identity</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Store Name *</label>
                <input
                  type="text"
                  required
                  value={formData.store_name}
                  onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                  className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                  placeholder="e.g. My Awesome Shop"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Store URL (Slug) *</label>
                <div className="flex bg-navy border border-white/10 rounded-xl overflow-hidden focus-within:border-cyan transition-colors">
                  <span className="px-4 py-3 bg-white/5 text-white/40 border-r border-white/10 whitespace-nowrap">
                    apnavyapar.com/store/
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                    className="w-full bg-transparent px-4 py-3 text-white outline-none"
                    placeholder="my-awesome-shop"
                  />
                </div>
                {storeUrl && (
                  <p className="mt-2 text-xs text-white/40">
                    Your store will be live at: <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">{storeUrl}</a>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5 flex items-center gap-2">
                  <Type size={14} className="text-white/40" /> Hero Subtitle Text
                </label>
                <input
                  type="text"
                  value={formData.hero_text}
                  onChange={(e) => setFormData({ ...formData, hero_text: e.target.value })}
                  className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                  placeholder="e.g. Welcome to the best shop in India!"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                <PhoneCall size={18} className="text-cyan" />
                <h3 className="text-lg font-bold text-white">Contact & Support</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5 flex items-center gap-2">
                    <Mail size={14} className="text-white/40" /> Support Email
                  </label>
                  <input
                    type="email"
                    value={formData.support_email}
                    onChange={(e) => setFormData({ ...formData, support_email: e.target.value })}
                    className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                    placeholder="help@myshop.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5 flex items-center gap-2">
                    <PhoneCall size={14} className="text-white/40" /> Support Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.support_phone}
                    onChange={(e) => setFormData({ ...formData, support_phone: e.target.value })}
                    className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                <Palette size={18} className="text-cyan" />
                <h3 className="text-lg font-bold text-white">Appearance</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Brand Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={formData.theme_color}
                    onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                    className="w-12 h-12 rounded bg-navy border border-white/10 cursor-pointer"
                  />
                  <span className="text-white/60 font-mono text-sm">{formData.theme_color.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                <Globe size={18} className="text-cyan" />
                <h3 className="text-lg font-bold text-white">Visibility</h3>
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 rounded bg-navy border border-white/10 text-cyan focus:ring-cyan focus:ring-offset-navy"
                />
                <div>
                  <p className="text-white font-medium">Store is Active</p>
                  <p className="text-white/40 text-sm">If unchecked, customers will see a "Maintenance" page.</p>
                </div>
              </label>
            </div>

          </div>

          <div className="flex justify-end gap-3">
            {storeUrl && formData.id && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(storeUrl);
                    alert("Store link copied to clipboard!");
                  }}
                  className="px-4 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <Copy size={16} /> <span className="hidden sm:inline">Copy Link</span>
                </button>
                <a
                  href={`https://wa.me/?text=Check%20out%20my%20new%20store:%20${encodeURIComponent(storeUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl border border-green-500/30 text-green-400 font-medium hover:bg-green-500/10 transition-colors flex items-center gap-2"
                >
                  <Share2 size={16} /> <span className="hidden sm:inline">WhatsApp</span>
                </a>
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-cyan/30 text-cyan font-medium hover:bg-cyan/10 transition-colors flex items-center gap-2"
                >
                  View Store <Globe size={16} />
                </a>
              </>
            )}
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-cyan text-navy-dark font-bold hover:scale-105 transition-all shadow-neon-cyan flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              Save Settings
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
