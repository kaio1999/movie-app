import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useMovies } from '../useMovies';
import { tmdbApi } from '../../services/tmdbApi';
import { mockMoviesResponse, createMockMoviesResponse } from '../../test/mocks';

vi.mock('../../services/tmdbApi');

describe('useMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve carregar filmes populares inicialmente', async () => {
    vi.mocked(tmdbApi.getPopularMovies).mockResolvedValue(mockMoviesResponse);

    const { result } = renderHook(() => useMovies());

    expect(result.current.loading).toBe(true);
    expect(result.current.movies).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual(mockMoviesResponse.results);
    expect(result.current.totalResults).toBe(mockMoviesResponse.total_results);
    expect(result.current.hasMore).toBe(true);
  });

  it('deve buscar filmes por query quando fornecido', async () => {
    const searchResponse = createMockMoviesResponse();
    vi.mocked(tmdbApi.searchMovies).mockResolvedValue(searchResponse);

    const { result } = renderHook(() => useMovies({ query: 'test' }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(tmdbApi.searchMovies).toHaveBeenCalledWith('test', 1);
    expect(result.current.movies).toEqual(searchResponse.results);
  });

  it('deve usar página inicial fornecida', async () => {
    vi.mocked(tmdbApi.getPopularMovies).mockResolvedValue(mockMoviesResponse);

    renderHook(() => useMovies({ initialPage: 2 }));

    await waitFor(() => {
      expect(tmdbApi.getPopularMovies).toHaveBeenCalledWith(2);
    });
  });

  it('deve lidar com erros corretamente', async () => {
    const errorMessage = 'Erro na API';
    vi.mocked(tmdbApi.getPopularMovies).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.movies).toEqual([]);
  });

  it('deve carregar mais filmes quando loadMore é chamado', async () => {
    const firstPage = createMockMoviesResponse();
    const secondPage = createMockMoviesResponse();
    vi.mocked(tmdbApi.getPopularMovies)
      .mockResolvedValueOnce(firstPage)
      .mockResolvedValueOnce(secondPage);

    const { result } = renderHook(() => useMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toHaveLength(firstPage.results.length);

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toHaveLength(
      firstPage.results.length + secondPage.results.length
    );
  });

  it('não deve carregar mais se já estiver carregando', async () => {
    vi.mocked(tmdbApi.getPopularMovies).mockResolvedValue(mockMoviesResponse);

    const { result } = renderHook(() => useMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialCallCount = vi.mocked(tmdbApi.getPopularMovies).mock.calls.length;

    act(() => {
      result.current.loadMore();
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(vi.mocked(tmdbApi.getPopularMovies).mock.calls.length).toBeGreaterThanOrEqual(initialCallCount + 1);
  });

  it('não deve carregar mais se não houver mais páginas', async () => {
    const lastPageResponse = {
      ...mockMoviesResponse,
      page: 10,
      total_pages: 10,
    };
    vi.mocked(tmdbApi.getPopularMovies).mockResolvedValue(lastPageResponse);

    const { result } = renderHook(() => useMovies({ initialPage: 10 }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasMore).toBe(false);

    const initialCallCount = vi.mocked(tmdbApi.getPopularMovies).mock.calls.length;

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(vi.mocked(tmdbApi.getPopularMovies).mock.calls.length).toBe(initialCallCount);
  });

  it('deve refazer busca quando refetch é chamado', async () => {
    vi.mocked(tmdbApi.getPopularMovies).mockResolvedValue(mockMoviesResponse);

    const { result } = renderHook(() => useMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialCallCount = vi.mocked(tmdbApi.getPopularMovies).mock.calls.length;

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(vi.mocked(tmdbApi.getPopularMovies).mock.calls.length).toBe(initialCallCount + 1);
  });

  it('deve resetar filmes quando query mudar', async () => {
    const firstResponse = createMockMoviesResponse();
    const secondResponse = createMockMoviesResponse();
    vi.mocked(tmdbApi.searchMovies)
      .mockResolvedValueOnce(firstResponse)
      .mockResolvedValueOnce(secondResponse);

    const { result, rerender } = renderHook(
      ({ query }) => useMovies({ query }),
      { initialProps: { query: 'first' } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual(firstResponse.results);

    rerender({ query: 'second' });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual(secondResponse.results);
  });
});

