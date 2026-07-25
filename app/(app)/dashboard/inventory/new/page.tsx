"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "0",
    sku: "",
    status: "active",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: userData, error: authError } = await supabase.auth.getUser();
      if (authError || !userData?.user) {
        throw new Error("You must be logged in to add a product.");
      }

      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${userData.user.id}-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
          
        imageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("products").insert({
        user_id: userData.user.id,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity, 10),
        sku: formData.sku,
        status: formData.status,
        image_url: imageUrl,
      });

      if (insertError) throw insertError;

      router.push("/dashboard/inventory");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to add product");
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/inventory" className="p-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Add Product</h1>
          <p className="text-white/60">Create a new product in your inventory catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 md:p-8 border-white/5 space-y-6">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Basic Information</h3>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Product Image</label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-xl bg-navy border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={32} className="text-white/20" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer px-4 py-2 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors inline-flex items-center gap-2">
                    <Upload size={16} /> Choose Image
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                  <p className="text-white/40 text-xs mt-2">Recommended: Square image, max 2MB. (Requires 'product-images' bucket)</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                placeholder="e.g. Handmade Silk Saree"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors resize-none"
                placeholder="Describe your product..."
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Pricing & Inventory</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">SKU (Stock Keeping Unit)</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                  placeholder="e.g. PRD-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors appearance-none"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/dashboard/inventory"
            className="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-cyan text-navy-dark font-bold hover:scale-105 transition-all shadow-neon-cyan flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
