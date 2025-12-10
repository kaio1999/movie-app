import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('deve renderizar o componente de loading', () => {
    const { container } = render(<Loading />);
    const loadingElement = container.firstChild as HTMLElement;
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveClass('flex', 'items-center', 'justify-center', 'min-h-[400px]');
  });

  it('deve conter o spinner de loading', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('rounded-full', 'h-12', 'w-12', 'border-b-2', 'border-yellow-400');
  });
});


