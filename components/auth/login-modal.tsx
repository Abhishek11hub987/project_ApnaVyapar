'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { X, Mail, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'success'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(searchParams.get('error') || '');

  if (!isOpen) return null;

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          {step === 'email' ? 'Welcome to Apna Vyapar' : 'Check Your Email'}
        </h2>

        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

        {step === 'email' ? (
          <form onSubmit={handleSendMagicLink} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-slate-300 pl-10 pr-3 py-2.5 focus:border-teal-500 focus:ring-teal-500 sm:text-sm outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 focus:outline-none transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending link...' : 'Send Magic Link'}
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-3 bg-white text-slate-500 font-medium">Or continue with</span></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-slate-300 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-colors disabled:opacity-50"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">We've sent a magic link to</p>
              <p className="font-semibold text-slate-900">{email}</p>
            </div>
            <p className="text-xs text-slate-500">
              Click the link in the email to automatically log in. You can close this window.
            </p>
            <button
              onClick={() => setStep('email')}
              className="text-sm font-medium text-teal-700 hover:text-teal-800 mt-2"
            >
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}