import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Layout } from '../Layout';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Layout', () => {
  it('deve renderizar logo MovieDB', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
      { wrapper }
    );
    
    expect(screen.getByText('MovieDB')).toBeInTheDocument();
  });

  it('deve renderizar links de navegação', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
      { wrapper }
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
  });

  it('deve renderizar SearchBar', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
      { wrapper }
    );
    
    expect(screen.getByPlaceholderText('Buscar filmes...')).toBeInTheDocument();
  });

  it('deve renderizar children', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
      { wrapper }
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('deve destacar link Home quando estiver na rota /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout>
          <div>Test</div>
        </Layout>
      </MemoryRouter>
    );
    
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveClass('bg-blue-500');
  });

  it('deve destacar link Favoritos quando estiver na rota /favorites', () => {
    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <Layout>
          <div>Test</div>
        </Layout>
      </MemoryRouter>
    );
    
    const favoritesLink = screen.getByText('Favoritos').closest('a');
    expect(favoritesLink).toHaveClass('bg-blue-500');
  });

  it('deve ter link do logo apontando para /', () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>,
      { wrapper }
    );
    
    const logoLink = screen.getByText('MovieDB').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});

