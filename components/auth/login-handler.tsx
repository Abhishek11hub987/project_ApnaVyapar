'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import LoginModal from '@/components/auth/login-modal';
import { useAuth } from '@/hooks/use-auth';

function isSafeRedirect(path: string | null): path is string {
  if (!path) return false;
  try {
    const url = new URL(path, 'http://localhost');
    return url.origin === 'http://localhost';
  } catch {
    return false;
  }
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
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initialize();
    }
  }, [initialize]);

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

  useEffect(() => {
    if (isLoading || !isAuthenticated || !isModalOpen) return;

    const redirect = searchParams.get('redirect');
    setIsModalOpen(false);
    if (isSafeRedirect(redirect)) {
      router.replace(redirect);
    } else {
      router.replace(stripLoginParams(pathname, searchParams), { scroll: false });
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
