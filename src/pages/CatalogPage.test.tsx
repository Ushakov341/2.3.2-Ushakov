import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

const mockProducts = [
  { id: 1, name: 'Broccoli', image: 'img', price: 120, category: 'vegetable' },
  { id: 2, name: 'Tomato', image: 'img', price: 80, category: 'vegetable' },
];

describe('Catalog & Cart', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    } as any);
  });

  it('shows loader and then products', async () => {
    render(<App />);
    expect(screen.getByRole('status')).toBeInTheDocument(); // Loader
    expect(await screen.findByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('Tomato')).toBeInTheDocument();
  });
});
