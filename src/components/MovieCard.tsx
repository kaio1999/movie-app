import { Link } from 'react-router-dom';
import { tmdbApi } from '../services/tmdbApi';
import { useFavorites } from '../context/FavoritesContext';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  highlightTerm?: string;
  showFavoriteButton?: boolean;
}

export function MovieCard({ movie, highlightTerm, showFavoriteButton = true }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);

  const highlightTitle = (title: string) => {
    if (!highlightTerm) return title;
    const regex = new RegExp(`(${highlightTerm})`, 'gi');
    const parts = title.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-orange-400 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative group">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-gray-700 aspect-[2/3] mb-2 shadow-lg">
          {movie.poster_path ? (
            <img
              src={tmdbApi.getPosterUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <span>Poster do Filme</span>
            </div>
          )}
          {showFavoriteButton && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(movie);
              }}
              className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all z-10"
              aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <svg
                className={`w-5 h-5 ${isFav ? 'fill-red-500' : 'fill-none stroke-red-500'}`}
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          )}
          <div className="absolute bottom-2 left-2 z-10">
            <div className="flex items-center gap-1 bg-yellow-500 text-gray-900 rounded-full px-2 py-1 text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <h3 className="text-white font-medium mb-1 line-clamp-2 min-h-[3rem] mt-2">
          {highlightTitle(movie.title)}
        </h3>
      </Link>
    </div>
  );
}

