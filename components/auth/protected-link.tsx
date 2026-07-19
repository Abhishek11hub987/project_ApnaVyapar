'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { MouseEvent, ReactNode } from 'react';

interface ProtectedLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  children: ReactNode;
}

export default function ProtectedLink({ href, children, onClick, ...props }: ProtectedLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (!isLoading && !isAuthenticated) {
      e.preventDefault();
      const params = new URLSearchParams({
        login: 'true',
        redirect: href,
      });
      router.push(`${href}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
