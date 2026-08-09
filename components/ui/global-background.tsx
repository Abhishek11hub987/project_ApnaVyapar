import React from 'react';
import Image from 'next/image';

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-surface-secondary">
      {/* Subtle Business Background Image (Highly Transparent & Blurred) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-luminosity">
        <Image
          src="/images/ideas/digital-marketing-agency.jpg"
          alt="Business Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Decorative gradient blobs matching landing page */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-200/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-100/30 rounded-full blur-[100px]" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-accent-50/40 rounded-full blur-[120px]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
    </div>
  );
}
