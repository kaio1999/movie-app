import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { useMovies } from '../hooks/useMovies';

vi.mock('../hooks/useMovies');
vi.mock('../hooks/useMovieDetails');

const mockUseMovies = vi.mocked(useMovies);

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMovies.mockReturnValue({
      movies: [],
      loading: false,
      error: null,
      hasMore: false,
      totalResults: 0,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });
  });

  it('deve renderizar layout com navegação', () => {
    render(<App />);
    
    expect(screen.getByText('MovieDB')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
  });

  it('deve renderizar HomePage na rota padrão', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Filmes Populares')).toBeInTheDocument();
    });
  });
});

