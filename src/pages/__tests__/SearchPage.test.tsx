import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../SearchPage';
import { useMovies } from '../../hooks/useMovies';
import { FavoritesProvider } from '../../context/FavoritesContext';
import { mockMovie } from '../../test/mocks';

vi.mock('../../hooks/useMovies');

const mockUseMovies = vi.mocked(useMovies);

const wrapper = ({ children, initialEntries = ['/search?q=test'] }: { children: React.ReactNode; initialEntries?: string[] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <FavoritesProvider>{children}</FavoritesProvider>
  </MemoryRouter>
);

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir estado vazio quando query estiver vazia', () => {
    mockUseMovies.mockReturnValue({
      movies: [],
      loading: false,
      error: null,
      hasMore: false,
      totalResults: 0,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    const WrapperEmpty = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/search']}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </MemoryRouter>
    );

    render(<SearchPage />, { wrapper: WrapperEmpty });
    
    expect(screen.getByText('Digite um termo para buscar')).toBeInTheDocument();
  });

  it('deve exibir título com termo de busca', () => {
    mockUseMovies.mockReturnValue({
      movies: [],
      loading: false,
      error: null,
      hasMore: false,
      totalResults: 0,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    const WrapperSearch = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/search?q=aventura']}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </MemoryRouter>
    );

    render(<SearchPage />, { wrapper: WrapperSearch });
    
    expect(screen.getByText(/Resultados para:/)).toBeInTheDocument();
    expect(screen.getByText('"aventura"')).toBeInTheDocument();
  });

  it('deve exibir contador de resultados', () => {
    mockUseMovies.mockReturnValue({
      movies: [mockMovie],
      loading: false,
      error: null,
      hasMore: false,
      totalResults: 1,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    render(<SearchPage />, { wrapper });
    
    expect(screen.getByText(/Encontrados 1 filme/)).toBeInTheDocument();
  });

  it('deve exibir plural correto quando houver múltiplos resultados', () => {
    mockUseMovies.mockReturnValue({
      movies: [mockMovie, mockMovie],
      loading: false,
      error: null,
      hasMore: false,
      totalResults: 2,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    render(<SearchPage />, { wrapper });
    
    expect(screen.getByText(/Encontrados 2 filmes/)).toBeInTheDocument();
  });

  it('deve exibir loading quando estiver carregando', () => {
    mockUseMovies.mockReturnValue({
      movies: [],
      loading: true,
      error: null,
      hasMore: true,
      totalResults: 0,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    const { container } = render(<SearchPage />, { wrapper });
    
    const loadingElement = container.querySelector('.animate-spin');
    expect(loadingElement).toBeInTheDocument();
  });

  it('deve exibir erro quando houver erro', () => {
    const errorMessage = 'Erro ao buscar';
    mockUseMovies.mockReturnValue({
      movies: [],
      loading: false,
      error: errorMessage,
      hasMore: false,
      totalResults: 0,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    render(<SearchPage />, { wrapper });
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('deve exibir estado vazio quando não houver resultados', () => {
    mockUseMovies.mockReturnValue({
      movies: [],
      loading: false,
      error: null,
      hasMore: false,
      totalResults: 0,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    render(<SearchPage />, { wrapper });
    
    expect(screen.getByText('Nenhum filme encontrado')).toBeInTheDocument();
  });

  it('deve renderizar filmes encontrados', async () => {
    mockUseMovies.mockReturnValue({
      movies: [mockMovie],
      loading: false,
      error: null,
      hasMore: false,
      totalResults: 1,
      loadMore: vi.fn(),
      refetch: vi.fn(),
    });

    const { container } = render(<SearchPage />, { wrapper });
    
    await waitFor(() => {
      const titleElement = container.querySelector('h3');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement?.textContent).toContain(mockMovie.title);
    });
  });
});

