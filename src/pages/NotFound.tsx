import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h1 className="text-gray-100 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-[#3399ff] text-white rounded-lg hover:bg-[#2878cc] transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
