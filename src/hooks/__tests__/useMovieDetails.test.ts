import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMovieDetails } from '../useMovieDetails';
import { tmdbApi } from '../../services/tmdbApi';
import { mockMovieDetails } from '../../test/mocks';

vi.mock('../../services/tmdbApi');

describe('useMovieDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve carregar detalhes do filme com sucesso', async () => {
    vi.mocked(tmdbApi.getMovieDetails).mockResolvedValue(mockMovieDetails);

    const { result } = renderHook(() => useMovieDetails(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.movie).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toEqual(mockMovieDetails);
    expect(result.current.error).toBe(null);
    expect(tmdbApi.getMovieDetails).toHaveBeenCalledWith(1);
  });

  it('não deve fazer requisição quando movieId for 0', async () => {
    const { result } = renderHook(() => useMovieDetails(0));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(tmdbApi.getMovieDetails).not.toHaveBeenCalled();
    expect(result.current.movie).toBe(null);
  });

  it('deve lidar com erros corretamente', async () => {
    const errorMessage = 'Erro ao carregar detalhes';
    vi.mocked(tmdbApi.getMovieDetails).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useMovieDetails(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.movie).toBe(null);
  });

  it('deve recarregar quando movieId mudar', async () => {
    const firstMovie = { ...mockMovieDetails, id: 1 };
    const secondMovie = { ...mockMovieDetails, id: 2 };

    vi.mocked(tmdbApi.getMovieDetails)
      .mockResolvedValueOnce(firstMovie)
      .mockResolvedValueOnce(secondMovie);

    const { result, rerender } = renderHook(
      ({ movieId }) => useMovieDetails(movieId),
      { initialProps: { movieId: 1 } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toEqual(firstMovie);

    rerender({ movieId: 2 });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toEqual(secondMovie);
    expect(tmdbApi.getMovieDetails).toHaveBeenCalledTimes(2);
  });
});

