"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Store, Globe, Palette, Share2, Copy, Image as ImageIcon, Upload, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function StoreBuilderPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    store_name: "",
    slug: "",
    theme_color: "#00D4FF",
    is_active: true,
    logo_url: "",
  });
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchStoreSettings() {
      try {
        const { data: userData, error: authError } = await supabase.auth.getUser();
        
        if (authError || !userData?.user) {
          return;
        }

        const { data, error } = await supabase
          .from("store_settings")
          .select("id, store_name, slug, theme_color, is_active, logo_url")
          .eq("user_id", userData.user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error(error);
        } else if (data && isMounted) {
          setFormData({
            id: data.id,
            store_name: data.store_name,
            slug: data.slug,
            theme_color: data.theme_color,
            is_active: data.is_active,
            logo_url: data.logo_url || "",
          });
          if (data.logo_url) {
            setLogoPreview(data.logo_url);
          }
        }
      } catch (err: any) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchStoreSettings();
    return () => { 
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

      let uploadedLogoUrl = formData.logo_url;

      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${userData.user.id}-logo-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, logoFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
          
        uploadedLogoUrl = publicUrlData.publicUrl;
      }

      if (formData.id) {
        const { error } = await supabase
          .from("store_settings")
          .update({
            store_name: formData.store_name,
            slug: formData.slug,
            theme_color: formData.theme_color,
            is_active: formData.is_active,
            logo_url: uploadedLogoUrl,
          })
          .eq("id", formData.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("store_settings")
          .insert({
            user_id: userData.user.id,
            store_name: formData.store_name,
            slug: formData.slug,
            theme_color: formData.theme_color,
            is_active: formData.is_active,
            logo_url: uploadedLogoUrl,
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-20">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-cyan/10 rounded-2xl mb-4 border border-cyan/20">
          <Sparkles className="text-cyan w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight mb-3">
          Store Builder
        </h1>
        <p className="text-white/60 text-lg max-w-lg mx-auto">
          Design your storefront and bring your brand to life.
        </p>
      </div>

      {loading ? (
        <div className="glass-card p-16 flex justify-center items-center flex-col shadow-2xl shadow-cyan/5">
          <div className="w-10 h-10 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin mb-6" />
          <p className="text-white/40 font-medium animate-pulse">Loading your store...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm font-medium flex items-center gap-3 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              {error}
            </div>
          )}
          {success && (
            <div className="bg-cyan/10 border border-cyan/30 text-cyan-light p-4 rounded-2xl text-sm font-medium flex items-center gap-3 backdrop-blur-md shadow-neon-cyan animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-5 h-5 text-cyan" />
              Store settings saved successfully! Your storefront is updated.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Basics Card */}
              <div className="glass-card p-8 rounded-3xl border-white/10 shadow-xl shadow-black/20 hover:border-white/20 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none transition-transform group-hover:scale-150 duration-700" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-cyan">
                    <Store size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Store Identity</h3>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Store Name</label>
                    <input
                      type="text"
                      required
                      value={formData.store_name}
                      onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                      className="w-full bg-navy-dark/50 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all shadow-inner placeholder:text-white/20 font-medium text-lg"
                      placeholder="e.g. My Awesome Shop"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Store URL</label>
                    <div className="flex bg-navy-dark/50 border border-white/10 rounded-2xl overflow-hidden focus-within:border-cyan focus-within:ring-1 focus-within:ring-cyan transition-all shadow-inner">
                      <span className="px-5 py-4 bg-black/20 text-white/40 border-r border-white/10 whitespace-nowrap font-mono text-sm">
                        apnavyapar.com/store/
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                        className="w-full bg-transparent px-5 py-4 text-white outline-none font-mono text-sm"
                        placeholder="my-awesome-shop"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Card */}
              <div className="glass-card p-8 rounded-3xl border-white/10 shadow-xl shadow-black/20 hover:border-white/20 transition-colors group relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-cyan">
                    <ImageIcon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Brand Logo</h3>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 relative z-10">
                  <div className="w-32 h-32 rounded-2xl bg-navy-dark/50 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner group-hover:border-cyan/30 transition-colors">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                    ) : (
                      <div className="flex flex-col items-center text-white/20">
                        <ImageIcon size={32} className="mb-2" />
                        <span className="text-xs font-medium">No Logo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="cursor-pointer px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2 shadow-sm">
                      <Upload size={16} className="text-cyan" /> 
                      <span>Choose New Image</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setLogoFile(file);
                            setLogoPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                    <p className="text-white/40 text-xs mt-4 leading-relaxed max-w-xs">
                      Make your store stand out. We recommend a square image or transparent PNG, max 2MB.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Settings */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Appearance */}
              <div className="glass-card p-6 rounded-3xl border-white/10 shadow-xl shadow-black/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-cyan">
                    <Palette size={16} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Appearance</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Primary Brand Color</label>
                  <div className="flex items-center gap-4 p-2 bg-navy-dark/50 rounded-2xl border border-white/10">
                    <input
                      type="color"
                      value={formData.theme_color}
                      onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                      className="w-14 h-14 rounded-xl cursor-pointer border-0 bg-transparent p-1"
                    />
                    <div className="flex-1">
                      <span className="text-white font-mono text-sm font-medium">{formData.theme_color.toUpperCase()}</span>
                      <p className="text-white/40 text-xs mt-1">Used for buttons & accents</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visibility */}
              <div className="glass-card p-6 rounded-3xl border-white/10 shadow-xl shadow-black/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-cyan">
                    <Globe size={16} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Visibility</h3>
                </div>
                
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="w-12 h-6 bg-white/10 rounded-full peer-checked:bg-cyan/20 transition-colors border border-white/10 peer-checked:border-cyan/50" />
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full peer-checked:translate-x-6 peer-checked:bg-cyan transition-all shadow-sm" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm group-hover:text-cyan transition-colors">Store is Live</p>
                    <p className="text-white/40 text-xs mt-1 leading-relaxed">Turn off to hide your store from the public and show a maintenance page.</p>
                  </div>
                </label>
              </div>

            </div>

          </div>

          {/* Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-navy/80 backdrop-blur-xl border-t border-white/10 z-40">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
                {storeUrl && formData.id && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(storeUrl);
                        alert("Store link copied to clipboard!");
                      }}
                      className="px-4 py-2.5 rounded-xl border border-white/10 text-white/80 text-sm font-medium hover:bg-white/5 hover:text-white transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <Copy size={14} /> Copy Link
                    </button>
                    <a
                      href={`https://wa.me/?text=Check%20out%20my%20new%20store:%20${encodeURIComponent(storeUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl border border-[#25D366]/30 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/10 transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <Share2 size={14} /> WhatsApp
                    </a>
                    <a
                      href={storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl border border-cyan/30 text-cyan text-sm font-medium hover:bg-cyan/10 transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <Globe size={14} /> View Live
                    </a>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-cyan text-navy-dark font-black hover:scale-[1.02] active:scale-95 transition-all shadow-neon-cyan flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Save Store
              </button>
            </div>
          </div>
          
        </form>
      )}
    </div>
  );
}
