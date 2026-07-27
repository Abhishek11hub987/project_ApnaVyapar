import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-md text-center">
        <div className="text-6xl font-bold text-gray-200 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8">The page you are looking for does not exist or has been moved.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="px-6 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors">
            Go Home
          </Link>
          <Link href="/ideas" className="px-6 py-2.5 rounded-lg bg-white text-gray-700 border border-gray-200 font-medium hover:bg-gray-50 transition-colors">
            Browse Ideas
          </Link>
        </div>
      </div>
    </div>
  );
}
