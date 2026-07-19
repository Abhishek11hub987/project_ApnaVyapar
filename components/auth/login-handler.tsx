'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import LoginModal from '@/components/auth/login-modal';
import { useAuth } from '@/hooks/use-auth';

function isSafeRedirect(path: string | null): path is string {
  return !!path && path.startsWith('/') && !path.startsWith('//');
}

function stripLoginParams(pathname: string, searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.delete('login');
  newSearchParams.delete('redirect');
  return `${pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
}

export default function LoginHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, initialize } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Open modal when ?login=true AND auth is done loading AND user is not logged in
  useEffect(() => {
    if (isLoading) return;

    if (searchParams.get('login') !== 'true') return;

    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    const redirect = searchParams.get('redirect');
    if (isSafeRedirect(redirect)) {
      router.replace(redirect);
      return;
    }

    if (pathname && searchParams.toString()) {
      router.replace(stripLoginParams(pathname, searchParams), { scroll: false });
    }
  }, [searchParams.get('login'), searchParams.get('redirect'), isAuthenticated, isLoading, pathname, router]);

  // After login on the same page, follow redirect target if present
  useEffect(() => {
    if (isLoading || !isAuthenticated || !isModalOpen) return;

    const redirect = searchParams.get('redirect');
    if (isSafeRedirect(redirect)) {
      setIsModalOpen(false);
      router.replace(redirect);
    }
  }, [isAuthenticated, isLoading, isModalOpen, searchParams, router]);

  const handleClose = () => {
    setIsModalOpen(false);

    if (searchParams.get('login') === 'true') {
      router.replace(stripLoginParams(pathname, searchParams), { scroll: false });
    }
  };

  if (!isModalOpen) return null;

  return <LoginModal onClose={handleClose} />;
}