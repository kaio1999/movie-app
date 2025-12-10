import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Error } from '../Error';

describe('Error', () => {
  it('deve renderizar mensagem de erro padrão', () => {
    render(<Error />);
    expect(screen.getByText('Ocorreu um erro ao carregar os dados.')).toBeInTheDocument();
  });

  it('deve renderizar mensagem de erro customizada', () => {
    render(<Error message="Erro customizado" />);
    expect(screen.getByText('Erro customizado')).toBeInTheDocument();
  });

  it('deve renderizar botão de retry quando onRetry for fornecido', () => {
    const onRetry = vi.fn();
    render(<Error onRetry={onRetry} />);
    
    const retryButton = screen.getByText('Tentar novamente');
    expect(retryButton).toBeInTheDocument();
  });

  it('não deve renderizar botão de retry quando onRetry não for fornecido', () => {
    render(<Error />);
    expect(screen.queryByText('Tentar novamente')).not.toBeInTheDocument();
  });

  it('deve chamar onRetry quando botão for clicado', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<Error onRetry={onRetry} />);
    
    const retryButton = screen.getByText('Tentar novamente');
    await user.click(retryButton);
    
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('deve exibir ícone de erro', () => {
    const { container } = render(<Error />);
    const icon = container.querySelector('.text-red-400');
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe('⚠️');
  });
});

