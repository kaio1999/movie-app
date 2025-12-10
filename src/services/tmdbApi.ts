import axios from 'axios';
import type { MovieDetails, MoviesResponse } from '../types/movie';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export const tmdbApi = {
  // Buscar filmes populares
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  // Buscar filmes por termo
  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  // Buscar detalhes de um filme
  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const response = await api.get<MovieDetails>(`/movie/${id}`);
    return response.data;
  },

  // Obter URL da imagem do poster
  getPosterUrl: (posterPath: string | null): string => {
    if (!posterPath) return '/placeholder-poster.png';
    return `https://image.tmdb.org/t/p/w300${posterPath}`;
  },

  // Obter URL da imagem de backdrop
  getBackdropUrl: (backdropPath: string | null): string => {
    if (!backdropPath) return '/placeholder-backdrop.png';
    return `https://image.tmdb.org/t/p/original${backdropPath}`;
  },
};

