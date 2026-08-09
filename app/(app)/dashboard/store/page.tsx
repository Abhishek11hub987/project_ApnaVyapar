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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-24 relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-accent-400/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="mb-10 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-br from-white to-gray-50 rounded-2xl mb-5 border border-gray-100 shadow-sm">
          <Sparkles className="text-accent-500 w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Store Builder
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-lg mx-auto">
          Design your storefront and bring your brand to life.
        </p>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-100 rounded-lg shadow-card p-16 flex justify-center items-center flex-col">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-6" />
          <p className="text-gray-400 font-medium animate-pulse">Loading your store...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm font-medium flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm font-medium flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Store settings saved successfully! Your storefront is updated.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Basics Card */}
              <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 hover:shadow-elevated transition-shadow duration-500 group relative overflow-hidden shadow-card">
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-gray-500">
                    <Store size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Store Identity</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Store Name</label>
                    <input
                      type="text"
                      required
                      value={formData.store_name}
                      onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                      placeholder="e.g. My Awesome Shop"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Store URL</label>
                    <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden focus-within:border-accent-500 focus-within:ring-1 focus-within:ring-accent-500">
                      <span className="px-4 py-2.5 bg-gray-50 text-gray-400 border-r border-gray-200 whitespace-nowrap font-mono text-sm">
                        apnavyapar.com/store/
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                        className="w-full bg-transparent px-4 py-2.5 text-gray-900 outline-none font-mono text-sm"
                        placeholder="my-awesome-shop"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Card */}
              <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 hover:shadow-elevated transition-shadow duration-500 group relative overflow-hidden shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-gray-500">
                    <ImageIcon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Brand Logo</h3>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                  <div className="w-32 h-32 rounded-lg bg-white border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-gray-300 transition-colors">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                    ) : (
                      <div className="flex flex-col items-center text-gray-300">
                        <ImageIcon size={32} className="mb-2" />
                        <span className="text-xs font-medium">No Logo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="cursor-pointer bg-white text-gray-800 font-bold border border-gray-200 px-5 py-3 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all inline-flex items-center gap-2 text-sm">
                      <Upload size={16} className="text-gray-500" /> 
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
                    <p className="text-gray-400 text-xs mt-4 leading-relaxed max-w-xs">
                      Make your store stand out. We recommend a square image or transparent PNG, max 2MB.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Settings */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Appearance */}
              <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-card hover:shadow-elevated transition-shadow duration-500">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-gray-500">
                    <Palette size={16} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-3">Primary Brand Color</label>
                  <div className="flex items-center gap-4 p-2 bg-white rounded-lg border border-gray-200">
                    <input
                      type="color"
                      value={formData.theme_color}
                      onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                      className="w-14 h-14 rounded-lg cursor-pointer border-0 bg-transparent p-1"
                    />
                    <div className="flex-1">
                      <span className="text-gray-900 font-mono text-sm font-medium">{formData.theme_color.toUpperCase()}</span>
                      <p className="text-gray-400 text-xs mt-1">Used for buttons & accents</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visibility */}
              <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-card hover:shadow-elevated transition-shadow duration-500">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-gray-500">
                    <Globe size={16} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Visibility</h3>
                </div>
                
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-gray-900/20 transition-colors border border-gray-200 peer-checked:border-gray-900/50" />
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 peer-checked:bg-gray-900 transition-all shadow-sm" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">Store is Live</p>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">Turn off to hide your store from the public and show a maintenance page.</p>
                  </div>
                </label>
              </div>

            </div>

          </div>

          {/* Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-2xl border-t border-gray-100 z-40">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
                {storeUrl && formData.id && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(storeUrl);
                        alert("Store link copied to clipboard!");
                      }}
                      className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <Copy size={16} /> Copy Link
                    </button>
                    <a
                      href={`https://wa.me/?text=Check%20out%20my%20new%20store:%20${encodeURIComponent(storeUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#25D366] border border-[#25D366]/30 px-5 py-2.5 rounded-xl hover:bg-[#25D366]/10 text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <Share2 size={16} /> WhatsApp
                    </a>
                    <a
                      href={storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <Globe size={16} /> View Live
                    </a>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-bold"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
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
