import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';
import { mockMovie } from '../../test/mocks';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('useFavorites', () => {
    it('deve lançar erro quando usado fora do provider', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => {
        renderHook(() => useFavorites());
      }).toThrow('useFavorites deve ser usado dentro de FavoritesProvider');
    });

    it('deve retornar valores iniciais corretos', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.favorites).toEqual([]);
      expect(result.current.isFavorite(1)).toBe(false);
    });

    it('deve carregar favoritos do localStorage', () => {
      const storedFavorites = [mockMovie];
      localStorage.setItem('movie-app-favorites', JSON.stringify(storedFavorites));

      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.favorites).toEqual(storedFavorites);
    });

    it('deve lidar com erro ao carregar do localStorage', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('movie-app-favorites', 'invalid json');

      renderHook(() => useFavorites(), { wrapper });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('addFavorite', () => {
    it('deve adicionar filme aos favoritos', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addFavorite(mockMovie);
      });

      expect(result.current.favorites).toHaveLength(1);
      expect(result.current.favorites[0]).toEqual(mockMovie);
      expect(result.current.isFavorite(mockMovie.id)).toBe(true);
    });

    it('não deve adicionar filme duplicado', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addFavorite(mockMovie);
        result.current.addFavorite(mockMovie);
      });

      expect(result.current.favorites).toHaveLength(1);
    });

    it('deve salvar no localStorage', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addFavorite(mockMovie);
      });

      const stored = localStorage.getItem('movie-app-favorites');
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toEqual([mockMovie]);
    });
  });

  describe('removeFavorite', () => {
    it('deve remover filme dos favoritos', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addFavorite(mockMovie);
        result.current.removeFavorite(mockMovie.id);
      });

      expect(result.current.favorites).toHaveLength(0);
      expect(result.current.isFavorite(mockMovie.id)).toBe(false);
    });

    it('não deve fazer nada se filme não estiver nos favoritos', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.removeFavorite(999);
      });

      expect(result.current.favorites).toHaveLength(0);
    });
  });

  describe('toggleFavorite', () => {
    it('deve adicionar quando não está favoritado', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.toggleFavorite(mockMovie);
      });

      expect(result.current.favorites).toHaveLength(1);
      expect(result.current.isFavorite(mockMovie.id)).toBe(true);
    });

    it('deve remover quando já está favoritado', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.toggleFavorite(mockMovie);
      });

      expect(result.current.favorites).toHaveLength(1);

      act(() => {
        result.current.toggleFavorite(mockMovie);
      });

      expect(result.current.favorites).toHaveLength(0);
      expect(result.current.isFavorite(mockMovie.id)).toBe(false);
    });
  });

  describe('isFavorite', () => {
    it('deve retornar true quando filme está favoritado', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addFavorite(mockMovie);
      });

      expect(result.current.isFavorite(mockMovie.id)).toBe(true);
    });

    it('deve retornar false quando filme não está favoritado', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.isFavorite(999)).toBe(false);
    });
  });
});

