import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../HomePage';
import { useMovies } from '../../hooks/useMovies';
import { FavoritesProvider } from '../../context/FavoritesContext';
import { mockMovie } from '../../test/mocks';

vi.mock('../../hooks/useMovies');

const mockUseMovies = vi.mocked(useMovies);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <FavoritesProvider>{children}</FavoritesProvider>
  </BrowserRouter>
);

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar título da página', () => {
    mockUseMovies.mockReturnValue({
      movies: [],
      loading: false,
      error: null,
      hasMore: false,
      totalResults: 0,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    render(<HomePage />, { wrapper });
    
    expect(screen.getByText('Filmes Populares')).toBeInTheDocument();
  });

  it('deve exibir loading quando estiver carregando e não houver filmes', () => {
    mockUseMovies.mockReturnValue({
      movies: [],
      loading: true,
      error: null,
      hasMore: true,
      totalResults: 0,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    const { container } = render(<HomePage />, { wrapper });
    
    const loadingElement = container.querySelector('.animate-spin');
    expect(loadingElement).toBeInTheDocument();
  });

  it('deve renderizar lista de filmes quando carregados', async () => {
    mockUseMovies.mockReturnValue({
      movies: [mockMovie],
      loading: false,
      error: null,
      hasMore: true,
      totalResults: 1,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    render(<HomePage />, { wrapper });
    
    await waitFor(() => {
      expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando houver erro', () => {
    const errorMessage = 'Erro ao carregar';
    mockUseMovies.mockReturnValue({
      movies: [],
      loading: false,
      error: errorMessage,
      hasMore: false,
      totalResults: 0,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    render(<HomePage />, { wrapper });
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('deve exibir loading adicional quando carregando mais filmes', () => {
    mockUseMovies.mockReturnValue({
      movies: [mockMovie],
      loading: true,
      error: null,
      hasMore: true,
      totalResults: 1,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    const { container } = render(<HomePage />, { wrapper });
    
    const loadingElements = container.querySelectorAll('.animate-spin');
    expect(loadingElements.length).toBeGreaterThan(0);
  });
});

