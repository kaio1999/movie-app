import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { mockMoviesResponse, mockMovieDetails } from '../../test/mocks';

vi.mock('axios');

describe('tmdbApi', () => {
  const mockedGet = vi.fn();
  const mockedAxiosInstance = {
    get: mockedGet,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(axios.create).mockReturnValue(mockedAxiosInstance as any);
    vi.resetModules();
  });

  afterEach(() => {
    vi.resetModules();
  });

  describe('getPopularMovies', () => {
    it('deve buscar filmes populares com sucesso', async () => {
      mockedGet.mockResolvedValue({ data: mockMoviesResponse });
      
      const { tmdbApi } = await import('../tmdbApi');
      const result = await tmdbApi.getPopularMovies(1);

      expect(result).toEqual(mockMoviesResponse);
    });

    it('deve usar página padrão quando não fornecida', async () => {
      mockedGet.mockResolvedValue({ data: mockMoviesResponse });
      
      const { tmdbApi } = await import('../tmdbApi');
      await tmdbApi.getPopularMovies();

      expect(mockedGet).toHaveBeenCalled();
    });
  });

  describe('searchMovies', () => {
    it('deve buscar filmes por termo com sucesso', async () => {
      mockedGet.mockResolvedValue({ data: mockMoviesResponse });
      
      const { tmdbApi } = await import('../tmdbApi');
      const result = await tmdbApi.searchMovies('test', 1);

      expect(result).toEqual(mockMoviesResponse);
    });

    it('deve usar página padrão quando não fornecida', async () => {
      mockedGet.mockResolvedValue({ data: mockMoviesResponse });
      
      const { tmdbApi } = await import('../tmdbApi');
      await tmdbApi.searchMovies('test');

      expect(mockedGet).toHaveBeenCalled();
    });
  });

  describe('getMovieDetails', () => {
    it('deve buscar detalhes do filme com sucesso', async () => {
      mockedGet.mockResolvedValue({ data: mockMovieDetails });
      
      const { tmdbApi } = await import('../tmdbApi');
      const result = await tmdbApi.getMovieDetails(1);

      expect(result).toEqual(mockMovieDetails);
    });
  });

  describe('getPosterUrl', () => {
    it('deve retornar URL do poster quando fornecido', async () => {
      const { tmdbApi } = await import('../tmdbApi');
      const result = tmdbApi.getPosterUrl('/test-poster.jpg');
      expect(result).toBe('https://image.tmdb.org/t/p/w300/test-poster.jpg');
    });

    it('deve retornar placeholder quando poster_path for null', async () => {
      const { tmdbApi } = await import('../tmdbApi');
      const result = tmdbApi.getPosterUrl(null);
      expect(result).toBe('/placeholder-poster.png');
    });
  });

  describe('getBackdropUrl', () => {
    it('deve retornar URL do backdrop quando fornecido', async () => {
      const { tmdbApi } = await import('../tmdbApi');
      const result = tmdbApi.getBackdropUrl('/test-backdrop.jpg');
      expect(result).toBe('https://image.tmdb.org/t/p/original/test-backdrop.jpg');
    });

    it('deve retornar placeholder quando backdrop_path for null', async () => {
      const { tmdbApi } = await import('../tmdbApi');
      const result = tmdbApi.getBackdropUrl(null);
      expect(result).toBe('/placeholder-backdrop.png');
    });
  });
});

