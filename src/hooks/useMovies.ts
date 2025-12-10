import { useState, useEffect, useCallback } from 'react';
import { tmdbApi } from '../services/tmdbApi';
import type { Movie, MoviesResponse } from '../types/movie';

interface UseMoviesOptions {
  initialPage?: number;
  query?: string;
}

export function useMovies({ initialPage = 1, query }: UseMoviesOptions = {}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = useCallback(async (pageNum: number, reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      let response: MoviesResponse;
      if (query) {
        response = await tmdbApi.searchMovies(query, pageNum);
      } else {
        response = await tmdbApi.getPopularMovies(pageNum);
      }

      if (reset) {
        setMovies(response.results);
      } else {
        setMovies((prev) => [...prev, ...response.results]);
      }

      setTotalResults(response.total_results);
      setHasMore(pageNum < response.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar filmes');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    setPage(initialPage);
    setMovies([]);
    fetchMovies(initialPage, true);
  }, [query, initialPage, fetchMovies]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage, false);
    }
  };

  return {
    movies,
    loading,
    error,
    hasMore,
    totalResults,
    loadMore,
    refetch: () => fetchMovies(page, true),
  };
}

