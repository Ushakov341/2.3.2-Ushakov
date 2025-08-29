import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../cart/CartContext';
import { ProductCard } from './ProductCard';

const product = {
  id: 1,
  name: 'Broccoli',
  image: 'img',
  price: 120,
  category: 'vegetable',
};

function renderWithCart(ui: React.ReactNode) {
  return render(<CartProvider>{ui}</CartProvider>);
}

describe('ProductCard qty controls', () => {
  it('increments and decrements quantity', async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductCard product={product} />);
    const input = screen.getByRole('spinbutton', { name: /qty-1/i });
    expect(input).toHaveValue(1);
    await user.click(screen.getByRole('button', { name: /increase/i }));
    expect(input).toHaveValue(2);
    await user.click(screen.getByRole('button', { name: /decrease/i }));
    expect(input).toHaveValue(1);
  });
});
