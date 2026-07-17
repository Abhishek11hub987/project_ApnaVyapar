'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import LoginModal from '@/components/auth/login-modal';
import { useAuth } from '@/hooks/use-auth';

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

    if (searchParams.get('login') === 'true' && !isAuthenticated) {
      setIsModalOpen(true);
    }
  }, [searchParams, isAuthenticated, isLoading]);

  const handleClose = () => {
    setIsModalOpen(false);

    // Remove ?login=true from URL without reload
    if (searchParams.get('login') === 'true') {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('login');
      const newUrl = `${pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
      router.replace(newUrl, { scroll: false });
    }
  };

  return <LoginModal isOpen={isModalOpen} onClose={handleClose} />;
}