'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">Oops!</h1>
        <h2 className="text-gray-700 mb-4 text-3xl font-semibold">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8 text-xl">
          We&apos;re sorry, but an error occurred while processing your request.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-secondary px-6 py-3 text-white transition-colors hover:bg-primary"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-gray-600 hover:bg-gray-700 rounded-lg px-6 py-3 text-white transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
