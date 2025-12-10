import { useState, useMemo } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { MovieCard } from '../components/MovieCard';
import { EmptyState } from '../components/EmptyState';

type SortOption = 'title-asc' | 'title-desc' | 'rating-desc' | 'rating-asc';

export function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');

  const sortedFavorites = useMemo(() => {
    const sorted = [...favorites];
    switch (sortBy) {
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'rating-desc':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      case 'rating-asc':
        return sorted.sort((a, b) => a.vote_average - b.vote_average);
      default:
        return sorted;
    }
  }, [favorites, sortBy]);

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Nenhum filme favorito ainda"
          message="Comece explorando filmes populares e adicione seus favoritos!"
          actionLabel="Explorar Filmes"
          actionPath="/"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Meus Filmes Favoritos</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-300 font-semibold">
            Ordenar por:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="title-asc">Título (A-Z)</option>
            <option value="title-desc">Título (Z-A)</option>
            <option value="rating-desc">Nota (maior-menor)</option>
            <option value="rating-asc">Nota (menor-maior)</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {sortedFavorites.map((movie) => (
          <div key={movie.id} className="relative group">
            <MovieCard movie={movie} showFavoriteButton={false} />
            <button
              onClick={() => removeFavorite(movie.id)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all z-20"
              aria-label="Remover dos favoritos"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

