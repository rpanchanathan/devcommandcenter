import { useState } from 'react';
import { X, Key, ExternalLink } from 'lucide-react';

interface GitHubTokenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (token: string) => void;
}

export function GitHubTokenDialog({ isOpen, onClose, onSubmit }: GitHubTokenDialogProps) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('Token is required');
      return;
    }
    if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
      setError('Invalid token format. Should start with ghp_ or github_pat_');
      return;
    }
    onSubmit(token.trim());
    setToken('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#3399ff]" />
            <h2 className="text-gray-100">GitHub Token Required</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-4">
          To edit and save changes, enter a GitHub Personal Access Token with{' '}
          <code className="bg-gray-800 px-1 rounded">repo</code> scope.
        </p>

        <a
          href="https://github.com/settings/tokens/new?description=DevCommandCenter&scopes=repo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#3399ff] text-sm hover:underline mb-4"
        >
          Create a new token <ExternalLink className="w-3 h-3" />
        </a>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setError('');
            }}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-200 placeholder-gray-500 focus:border-[#3399ff] focus:outline-none mb-2"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-700 rounded text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#3399ff] text-white rounded hover:bg-[#2277dd] transition-colors"
            >
              Save Token
            </button>
          </div>
        </form>

        <p className="text-gray-500 text-xs mt-4 text-center">
          Token is stored in sessionStorage (cleared when browser closes)
        </p>
      </div>
    </div>
  );
}
