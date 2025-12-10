import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { mockNavigate, mockUseSearchParams } from '../../test/mocks';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [mockUseSearchParams, vi.fn()],
  };
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSearchParams.get.mockReturnValue(null);
  });

  it('deve renderizar input de busca', () => {
    render(<SearchBar />, { wrapper });
    
    const input = screen.getByPlaceholderText('Buscar filmes...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('deve atualizar valor quando usuário digita', async () => {
    const user = userEvent.setup();
    render(<SearchBar />, { wrapper });
    
    const input = screen.getByPlaceholderText('Buscar filmes...') as HTMLInputElement;
    await user.type(input, 'teste');
    
    expect(input.value).toBe('teste');
  });

  it('deve navegar para página de busca ao submeter formulário', async () => {
    const user = userEvent.setup();
    render(<SearchBar />, { wrapper });
    
    const input = screen.getByPlaceholderText('Buscar filmes...');
    await user.type(input, 'aventura');
    await user.keyboard('{Enter}');
    
    expect(mockNavigate).toHaveBeenCalledWith('/search?q=aventura');
  });

  it('não deve navegar se termo estiver vazio', async () => {
    const user = userEvent.setup();
    render(<SearchBar />, { wrapper });
    
    const form = screen.getByRole('textbox').closest('form');
    if (form) {
      await user.click(form);
      await user.keyboard('{Enter}');
    }
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('deve preencher input com query param da URL', () => {
    mockUseSearchParams.get.mockReturnValue('teste');
    
    render(<SearchBar />, { wrapper });
    
    const input = screen.getByPlaceholderText('Buscar filmes...') as HTMLInputElement;
    expect(input.value).toBe('teste');
  });

  it('deve atualizar quando query param mudar', () => {
    mockUseSearchParams.get.mockReturnValue('inicial');
    
    const { rerender } = render(<SearchBar />, { wrapper });
    
    let input = screen.getByPlaceholderText('Buscar filmes...') as HTMLInputElement;
    expect(input.value).toBe('inicial');
    
    mockUseSearchParams.get.mockReturnValue('atualizado');
    rerender(<SearchBar />);
    
    input = screen.getByPlaceholderText('Buscar filmes...') as HTMLInputElement;
    expect(input.value).toBe('atualizado');
  });

  it('deve trimar espaços antes de navegar', async () => {
    const user = userEvent.setup();
    render(<SearchBar />, { wrapper });
    
    const input = screen.getByPlaceholderText('Buscar filmes...');
    await user.type(input, '  teste  ');
    await user.keyboard('{Enter}');
    
    expect(mockNavigate).toHaveBeenCalledWith('/search?q=teste');
  });
});

