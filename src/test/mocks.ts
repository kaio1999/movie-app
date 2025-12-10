import { vi } from 'vitest';
import type { Movie, MovieDetails, MoviesResponse } from '../types/movie';

export const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [1, 2],
};

export const mockMovieDetails: MovieDetails = {
  ...mockMovie,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
  ],
  runtime: 120,
  budget: 1000000,
  revenue: 5000000,
  tagline: 'Test tagline',
};

export const mockMoviesResponse: MoviesResponse = {
  page: 1,
  results: [mockMovie],
  total_pages: 10,
  total_results: 200,
};

export const createMockMoviesResponse = (movies: Movie[] = [mockMovie]): MoviesResponse => ({
  page: 1,
  results: movies,
  total_pages: 10,
  total_results: movies.length * 10,
});

export const mockNavigate = vi.fn();
export const mockUseSearchParams = {
  get: vi.fn().mockReturnValue(null),
};

