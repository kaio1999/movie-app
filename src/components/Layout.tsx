import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 bg-blue-600 shadow-lg z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg
                className="w-8 h-8 text-purple-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4H5l-2-4H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-2zm-1.94 13L12 10.5 7.94 17h8.12z" />
              </svg>
              <span className="text-xl font-bold text-orange-400">MovieDB</span>
            </Link>
            <div className="flex-1 max-w-md mx-4">
              <SearchBar />
            </div>
            <nav className="flex items-center gap-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded transition-colors ${
                  location.pathname === '/'
                    ? 'bg-blue-500 text-white'
                    : 'text-white hover:text-gray-200'
                }`}
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className={`px-4 py-2 rounded transition-colors ${
                  location.pathname === '/favorites'
                    ? 'bg-blue-500 text-white'
                    : 'text-white hover:text-gray-200'
                }`}
              >
                Favoritos
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="bg-gray-800 min-h-screen pt-16">
        {children}
      </main>
    </div>
  );
}

