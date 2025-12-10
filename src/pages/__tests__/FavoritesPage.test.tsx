import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesPage } from '../FavoritesPage';
import { useFavorites } from '../../context/FavoritesContext';
import { mockMovie } from '../../test/mocks';

vi.mock('../../context/FavoritesContext');

const mockUseFavorites = vi.mocked(useFavorites);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('FavoritesPage', () => {
  const mockRemoveFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir estado vazio quando não houver favoritos', () => {
    mockUseFavorites.mockReturnValue({
      favorites: [],
      addFavorite: vi.fn(),
      removeFavorite: mockRemoveFavorite,
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
    } as any);

    render(<FavoritesPage />, { wrapper });
    
    expect(screen.getByText('Nenhum filme favorito ainda')).toBeInTheDocument();
    expect(screen.getByText('Comece explorando filmes populares e adicione seus favoritos!')).toBeInTheDocument();
    expect(screen.getByText('Explorar Filmes')).toBeInTheDocument();
  });

  it('deve renderizar lista de favoritos', () => {
    mockUseFavorites.mockReturnValue({
      favorites: [mockMovie],
      addFavorite: vi.fn(),
      removeFavorite: mockRemoveFavorite,
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
    } as any);

    render(<FavoritesPage />, { wrapper });
    
    expect(screen.getByText('Meus Filmes Favoritos')).toBeInTheDocument();
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  it('deve ordenar por título A-Z por padrão', () => {
    const movieA = { ...mockMovie, id: 1, title: 'A Movie' };
    const movieZ = { ...mockMovie, id: 2, title: 'Z Movie' };
    
    mockUseFavorites.mockReturnValue({
      favorites: [movieZ, movieA],
      addFavorite: vi.fn(),
      removeFavorite: mockRemoveFavorite,
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
    } as any);

    const { container } = render(<FavoritesPage />, { wrapper });
    
    const titles = container.querySelectorAll('h3');
    expect(titles[0].textContent).toBe('A Movie');
    expect(titles[1].textContent).toBe('Z Movie');
  });

  it('deve ordenar por título Z-A quando selecionado', async () => {
    const user = userEvent.setup();
    const movieA = { ...mockMovie, id: 1, title: 'A Movie' };
    const movieZ = { ...mockMovie, id: 2, title: 'Z Movie' };
    
    mockUseFavorites.mockReturnValue({
      favorites: [movieA, movieZ],
      addFavorite: vi.fn(),
      removeFavorite: mockRemoveFavorite,
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
    } as any);

    const { container } = render(<FavoritesPage />, { wrapper });
    
    const select = screen.getByLabelText('Ordenar por:');
    await user.selectOptions(select, 'title-desc');
    
    const titles = container.querySelectorAll('h3');
    expect(titles[0].textContent).toBe('Z Movie');
    expect(titles[1].textContent).toBe('A Movie');
  });

  it('deve ordenar por nota maior-menor quando selecionado', async () => {
    const user = userEvent.setup();
    const movieLow = { ...mockMovie, id: 1, vote_average: 5.0 };
    const movieHigh = { ...mockMovie, id: 2, vote_average: 9.0 };
    
    mockUseFavorites.mockReturnValue({
      favorites: [movieLow, movieHigh],
      addFavorite: vi.fn(),
      removeFavorite: mockRemoveFavorite,
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
    } as any);

    const { container } = render(<FavoritesPage />, { wrapper });
    
    const select = screen.getByLabelText('Ordenar por:');
    await user.selectOptions(select, 'rating-desc');
    
    const titles = container.querySelectorAll('h3');
    expect(titles[0].textContent).toBe(movieHigh.title);
    expect(titles[1].textContent).toBe(movieLow.title);
  });

  it('deve chamar removeFavorite quando botão de lixeira for clicado', async () => {
    const user = userEvent.setup();
    mockUseFavorites.mockReturnValue({
      favorites: [mockMovie],
      addFavorite: vi.fn(),
      removeFavorite: mockRemoveFavorite,
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
    } as any);

    render(<FavoritesPage />, { wrapper });
    
    const deleteButton = screen.getByLabelText('Remover dos favoritos');
    await user.click(deleteButton);
    
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockMovie.id);
  });
});

