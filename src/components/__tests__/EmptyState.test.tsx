import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EmptyState } from '../EmptyState';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('EmptyState', () => {
  it('deve renderizar título e mensagem', () => {
    render(
      <EmptyState title="Título teste" message="Mensagem teste" />,
      { wrapper }
    );
    
    expect(screen.getByText('Título teste')).toBeInTheDocument();
    expect(screen.getByText('Mensagem teste')).toBeInTheDocument();
  });

  it('deve renderizar botão de ação quando actionLabel e actionPath forem fornecidos', () => {
    render(
      <EmptyState
        title="Título"
        message="Mensagem"
        actionLabel="Explorar"
        actionPath="/explore"
      />,
      { wrapper }
    );
    
    const actionButton = screen.getByText('Explorar');
    expect(actionButton).toBeInTheDocument();
    expect(actionButton.closest('a')).toHaveAttribute('href', '/explore');
  });

  it('não deve renderizar botão de ação quando actionLabel não for fornecido', () => {
    render(
      <EmptyState title="Título" message="Mensagem" actionPath="/explore" />,
      { wrapper }
    );
    
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('não deve renderizar botão de ação quando actionPath não for fornecido', () => {
    render(
      <EmptyState title="Título" message="Mensagem" actionLabel="Explorar" />,
      { wrapper }
    );
    
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('deve exibir ícone de filme', () => {
    const { container } = render(
      <EmptyState title="Título" message="Mensagem" />,
      { wrapper }
    );
    
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('w-32', 'h-32', 'text-gray-600');
  });
});

