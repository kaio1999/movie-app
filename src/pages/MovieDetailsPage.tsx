import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useFavorites } from '../context/FavoritesContext';
import { tmdbApi } from '../services/tmdbApi';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = id ? parseInt(id, 10) : 0;
  const { movie, loading, error } = useMovieDetails(movieId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Error message={error || 'Filme não encontrado'} />
      </div>
    );
  }

  const isFav = isFavorite(movie.id);
  const releaseDate = new Date(movie.release_date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden bg-gray-700 aspect-video">
          {movie.backdrop_path ? (
            <img
              src={tmdbApi.getBackdropUrl(movie.backdrop_path)}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <span>Imagem Backdrop</span>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Data de lançamento:</span> {releaseDate}
          </p>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-gray-300 font-semibold">Nota TMDB:</span>
            <div className="flex items-center gap-1 bg-yellow-500 text-gray-900 rounded-full px-3 py-1 font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Sinopse</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
          <button
            onClick={() => toggleFavorite(movie)}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              isFav
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            <svg
              className={`w-5 h-5 ${isFav ? 'fill-white' : 'fill-white'}`}
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
}

