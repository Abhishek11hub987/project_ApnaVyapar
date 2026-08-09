'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { MouseEvent, ReactNode } from 'react';

interface ProtectedLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  children: ReactNode;
}

export default function ProtectedLink({ href, children, onClick, ...props }: ProtectedLinkProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (!isLoading && !isAuthenticated) {
      e.preventDefault();
      // Redirect to home with login modal open, then redirect back to target after login
      router.push(`/?login=true&redirect=${encodeURIComponent(href)}`);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
