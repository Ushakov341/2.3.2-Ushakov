import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const mockProducts = [
  { id: 1, name: 'Broccoli', image: 'img', price: 120, category: 'vegetable' },
];

describe('Header totals update', () => {
  it('updates count and total after add to cart', async () => {
    global.fetch = async () =>
      ({ ok: true, json: async () => mockProducts } as any);

    const user = userEvent.setup();
    render(<App />);

    const addBtn = await screen.findByRole('button', { name: /add to cart/i });
    await user.click(addBtn);

    expect(screen.getByText(/Items:/i).nextSibling).toHaveTextContent('1'); // индикатор количества
    expect(screen.getByText(/Total:/i).nextSibling).toHaveTextContent('$120'); // сумма
  });
});
