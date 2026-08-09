'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, X, Github } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/language-context';
import Logo from '@/components/logo';

interface LoginModalProps {
  onClose?: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'success'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(searchParams.get('error') || '');

  const getAuthCallbackUrl = () => {
    const redirectTarget = searchParams.get('redirect');
    if (redirectTarget && redirectTarget.startsWith('/') && !redirectTarget.startsWith('//')) {
      return `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTarget)}`;
    }
    return `${window.location.origin}/auth/callback`;
  };

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: getAuthCallbackUrl(),
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getAuthCallbackUrl(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      setLoading(true);
      setError('');
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: getAuthCallbackUrl(),
        }
      });
      
      if (error) throw error;
      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-modal overflow-hidden border border-gray-100 animate-scale-in relative" onClick={e => e.stopPropagation()}>
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all">
            <X size={16} />
          </button>
        )}

        {/* Header with gradient accent bar */}
        <div className="relative p-8 text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-600 via-accent-400 to-accent-600" />
          <div className="flex flex-col items-center mb-4 pt-2">
            <Logo iconSize={44} showTagline={false} className="items-center" />
          </div>
          <p className="text-gray-500 text-sm font-medium">{t('auth.subtitle')}</p>
        </div>

        <div className="px-8 pb-8">
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
              <div className="text-sm text-red-700 font-medium">{error}</div>
            </div>
          )}

          {step === 'email' ? (
            <div className="space-y-5">
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xs hover:shadow-subtle disabled:opacity-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {loading ? t('auth.loggingIn') : t('auth.continueGoogle')}
                </button>

                <button
                  onClick={handleGithubLogin}
                  disabled={loading}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xs disabled:opacity-50"
                >
                  <Github size={18} />
                  {loading ? 'Logging in...' : 'Continue with GitHub'}
                </button>
              </div>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink-0 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">or</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.emailPlaceholder')}
                    className="input-base pl-11"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full bg-gradient-to-r from-accent-600 to-accent-500 hover:shadow-glow text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('auth.continueEmail')}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 animate-scale-in">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('auth.checkEmail')}</h3>
              <p className="text-gray-500 mb-6 text-sm">
                {t('auth.linkSent')} <strong className="text-gray-900">{email}</strong>. {t('auth.clickToSign')}
              </p>
              <button
                onClick={() => setStep('email')}
                className="text-accent-600 font-semibold hover:underline text-sm"
              >
                {t('auth.back')}
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
            <ShieldCheck size={13} />
            Secure login powered by Supabase
          </div>
        </div>
      </div>
    </div>
  );
}
