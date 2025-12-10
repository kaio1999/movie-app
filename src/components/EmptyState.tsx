import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionPath?: string;
}

export function EmptyState({ title, message, actionLabel, actionPath }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6">
        <svg
          className="w-32 h-32 text-gray-600 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-8 max-w-md">{message}</p>
      {actionLabel && actionPath && (
        <Link
          to={actionPath}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

