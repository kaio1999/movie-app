import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdbApi';
import type { MovieDetails } from '../types/movie';

export function useMovieDetails(movieId: number) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await tmdbApi.getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar detalhes do filme');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movie, loading, error };
}


