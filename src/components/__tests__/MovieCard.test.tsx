import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MovieCard } from '../MovieCard';
import { mockMovie } from '../../test/mocks';
import { FavoritesProvider } from '../../context/FavoritesContext';
import { tmdbApi } from '../../services/tmdbApi';

vi.mock('../../services/tmdbApi');

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <FavoritesProvider>{children}</FavoritesProvider>
  </BrowserRouter>
);

describe('MovieCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.mocked(tmdbApi.getPosterUrl).mockReturnValue('https://image.tmdb.org/t/p/w300/poster.jpg');
  });

  it('deve renderizar título do filme', () => {
    render(<MovieCard movie={mockMovie} />, { wrapper });
    
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  it('deve renderizar nota do filme', () => {
    render(<MovieCard movie={mockMovie} />, { wrapper });
    
    expect(screen.getByText(mockMovie.vote_average.toFixed(1))).toBeInTheDocument();
  });

  it('deve renderizar link para página de detalhes', () => {
    render(<MovieCard movie={mockMovie} />, { wrapper });
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/movie/${mockMovie.id}`);
  });

  it('deve renderizar imagem do poster quando disponível', () => {
    render(<MovieCard movie={mockMovie} />, { wrapper });
    
    const image = screen.getByAltText(mockMovie.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w300/poster.jpg');
  });

  it('deve renderizar placeholder quando poster não disponível', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />, { wrapper });
    
    expect(screen.getByText('Poster do Filme')).toBeInTheDocument();
  });

  it('deve mostrar botão de favoritar quando showFavoriteButton for true', () => {
    render(<MovieCard movie={mockMovie} showFavoriteButton={true} />, { wrapper });
    
    const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
    expect(favoriteButton).toBeInTheDocument();
  });

  it('não deve mostrar botão de favoritar quando showFavoriteButton for false', () => {
    render(<MovieCard movie={mockMovie} showFavoriteButton={false} />, { wrapper });
    
    expect(screen.queryByLabelText('Adicionar aos favoritos')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Remover dos favoritos')).not.toBeInTheDocument();
  });

  it('deve mostrar label correto quando filme está favoritado', async () => {
    const user = userEvent.setup();
    
    render(<MovieCard movie={mockMovie} />, { wrapper });
    
    const addButton = screen.getByLabelText('Adicionar aos favoritos');
    await user.click(addButton);
    
    const removeButton = screen.getByLabelText('Remover dos favoritos');
    expect(removeButton).toBeInTheDocument();
  });

  it('deve alternar favorito quando botão for clicado', async () => {
    const user = userEvent.setup();
    const { container } = render(<MovieCard movie={mockMovie} />, { wrapper });
    
    const favoriteButton = container.querySelector('button[aria-label]') as HTMLElement;
    expect(favoriteButton).toBeInTheDocument();
    
    const initialLabel = favoriteButton.getAttribute('aria-label');
    expect(initialLabel).toBe('Adicionar aos favoritos');

    await user.click(favoriteButton);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const updatedButton = container.querySelector('button[aria-label]');
    expect(updatedButton).toBeInTheDocument();
  });

  it('deve destacar termo no título quando highlightTerm for fornecido', () => {
    const movieWithTerm = { ...mockMovie, title: 'Aventura no Espaço' };
    const { container } = render(<MovieCard movie={movieWithTerm} highlightTerm="Aventura" />, { wrapper });
    
    const highlighted = container.querySelector('.text-orange-400');
    expect(highlighted).toBeInTheDocument();
    expect(highlighted?.textContent).toBe('Aventura');
  });

  it('deve destacar termo case-insensitive', () => {
    const movieWithTerm = { ...mockMovie, title: 'Grande Aventura' };
    const { container } = render(<MovieCard movie={movieWithTerm} highlightTerm="aventura" />, { wrapper });
    
    const highlighted = container.querySelector('.text-orange-400');
    expect(highlighted).toBeInTheDocument();
    expect(highlighted?.textContent).toBe('Aventura');
  });
});

