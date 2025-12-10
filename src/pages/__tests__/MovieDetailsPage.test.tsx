import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { MovieDetailsPage } from '../MovieDetailsPage';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { FavoritesProvider } from '../../context/FavoritesContext';
import { tmdbApi } from '../../services/tmdbApi';
import { mockMovieDetails } from '../../test/mocks';

vi.mock('../../hooks/useMovieDetails');
vi.mock('../../services/tmdbApi');

const mockUseMovieDetails = vi.mocked(useMovieDetails);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <FavoritesProvider>{children}</FavoritesProvider>
  </BrowserRouter>
);

describe('MovieDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.mocked(tmdbApi.getBackdropUrl).mockReturnValue('https://image.tmdb.org/t/p/original/backdrop.jpg');
  });

  it('deve exibir loading quando estiver carregando', () => {
    mockUseMovieDetails.mockReturnValue({
      movie: null,
      loading: true,
      error: null,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <FavoritesProvider>
          <MovieDetailsPage />
        </FavoritesProvider>
      </MemoryRouter>
    );
    
    const loadingElement = container.querySelector('.animate-spin');
    expect(loadingElement).toBeInTheDocument();
  });

  it('deve exibir erro quando houver erro', () => {
    const errorMessage = 'Erro ao carregar';
    mockUseMovieDetails.mockReturnValue({
      movie: null,
      loading: false,
      error: errorMessage,
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <FavoritesProvider>
          <MovieDetailsPage />
        </FavoritesProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('deve exibir detalhes do filme quando carregado', async () => {
    mockUseMovieDetails.mockReturnValue({
      movie: mockMovieDetails,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <FavoritesProvider>
          <MovieDetailsPage />
        </FavoritesProvider>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(mockMovieDetails.title)).toBeInTheDocument();
    });
    
    expect(screen.getByText(mockMovieDetails.overview)).toBeInTheDocument();
    expect(screen.getByText(/Data de lançamento:/)).toBeInTheDocument();
    expect(screen.getByText('Sinopse')).toBeInTheDocument();
  });

  it('deve exibir gêneros do filme', () => {
    mockUseMovieDetails.mockReturnValue({
      movie: mockMovieDetails,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <FavoritesProvider>
          <MovieDetailsPage />
        </FavoritesProvider>
      </MemoryRouter>
    );
    
    mockMovieDetails.genres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });

  it('deve exibir botão de adicionar aos favoritos quando não favoritado', () => {
    mockUseMovieDetails.mockReturnValue({
      movie: mockMovieDetails,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <FavoritesProvider>
          <MovieDetailsPage />
        </FavoritesProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Adicionar aos Favoritos')).toBeInTheDocument();
  });

  it('deve exibir botão de remover dos favoritos quando favoritado', async () => {
    const user = userEvent.setup();
    mockUseMovieDetails.mockReturnValue({
      movie: mockMovieDetails,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <FavoritesProvider>
          <MovieDetailsPage />
        </FavoritesProvider>
      </MemoryRouter>
    );
    
    const addButton = screen.getByText('Adicionar aos Favoritos');
    await user.click(addButton);
    
    expect(screen.getByText('Remover dos Favoritos')).toBeInTheDocument();
  });

  it('deve chamar toggleFavorite quando botão for clicado', async () => {
    const user = userEvent.setup();
    mockUseMovieDetails.mockReturnValue({
      movie: mockMovieDetails,
      loading: false,
      error: null,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <FavoritesProvider>
          <MovieDetailsPage />
        </FavoritesProvider>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(mockMovieDetails.title)).toBeInTheDocument();
    });

    const addButton = screen.getByText('Adicionar aos Favoritos');
    expect(addButton).toBeInTheDocument();
    
    await user.click(addButton);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText('Remover dos Favoritos')).toBeInTheDocument();
  });

  it('deve exibir placeholder quando backdrop não disponível', () => {
    const movieWithoutBackdrop = { ...mockMovieDetails, backdrop_path: null };
    mockUseMovieDetails.mockReturnValue({
      movie: movieWithoutBackdrop,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <FavoritesProvider>
          <MovieDetailsPage />
        </FavoritesProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Imagem Backdrop')).toBeInTheDocument();
  });
});

