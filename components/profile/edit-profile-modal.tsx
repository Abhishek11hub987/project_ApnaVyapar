'use client';
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/language-context';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onProfileUpdated: () => void;
}

export default function EditProfileModal({ isOpen, onClose, user, onProfileUpdated }: EditProfileModalProps) {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setFullName(user.full_name || '');
      setPhone(user.phone || '');
      setCity(user.city || '');
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone: phone,
          city: city,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      onProfileUpdated();
      onClose();
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-scale-in">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('editModal.title')}</h2>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSave} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">{t('profile.name')}</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-900 dark:text-slate-100"
              placeholder={t('profile.namePlaceholder')}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">{t('editModal.phone')}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-900 dark:text-slate-100"
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">{t('profile.city')}</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-900 dark:text-slate-100"
              placeholder={t('profile.cityPlaceholder')}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={saving}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl mt-6 flex justify-center items-center gap-2 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <><div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div> {t('editModal.saving')}</>
            ) : (
              <><Save size={18} /> {t('editModal.save')}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
