'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import LoginModal from '@/components/auth/login-modal';
import { useAuth } from '@/hooks/use-auth';

export default function LoginHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // Check if ?login=true is in the URL
    if (searchParams.get('login') === 'true' && !isAuthenticated) {
      setIsModalOpen(true);
    }
  }, [searchParams, isAuthenticated, isLoading]);

  const handleClose = () => {
    setIsModalOpen(false);
    
    // Remove the ?login=true from the URL without triggering a page reload
    if (searchParams.get('login') === 'true') {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('login');
      const newUrl = `${pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
      router.replace(newUrl, { scroll: false });
    }
  };

  return <LoginModal isOpen={isModalOpen} onClose={handleClose} />;
}
