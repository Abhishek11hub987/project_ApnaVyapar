'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something Broke</h1>
            <p className="text-gray-500 mb-2">An unexpected error occurred. Our team has been notified.</p>
            {error.digest && (
              <p className="text-xs font-mono text-gray-400 mb-6">Error ID: {error.digest}</p>
            )}
            <button onClick={reset} className="px-6 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors">
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
