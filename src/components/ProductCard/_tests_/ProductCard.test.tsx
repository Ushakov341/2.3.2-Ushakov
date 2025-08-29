import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types/product';

const mockProduct: Product = {
  id: 1,
  name: 'Broccoli',
  producer: 'Farm Fresh',
  description: 'Fresh green broccoli',
  image: '/broccoli.jpg',
  price: 1.20,
  quantity: '1 kg',
  availableCount: 10,
  imageUrl: '/broccoli.jpg',
};

const renderWithMantine = (component: React.ReactNode) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

describe('ProductCard', () => {
  const mockOnAddToCart = jest.fn();

  beforeEach(() => {
    mockOnAddToCart.mockClear();
  });

  it('renders product information correctly', () => {
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('$ 1.2')).toBeInTheDocument();
    expect(screen.getByText('1 kg')).toBeInTheDocument();
  });

  it('handles quantity increment correctly', () => {
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const incrementButton = screen.getByRole('button', { name: /plus/i });
    const quantityInput = screen.getByDisplayValue('1');

    fireEvent.click(incrementButton);
    expect(quantityInput).toHaveValue(2);
  });

  it('handles quantity decrement correctly', () => {
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const incrementButton = screen.getByRole('button', { name: /plus/i });
    const decrementButton = screen.getByRole('button', { name: /minus/i });
    
    // First increment to 2
    fireEvent.click(incrementButton);
    
    // Then decrement back to 1
    fireEvent.click(decrementButton);
    
    const quantityInput = screen.getByDisplayValue('1');
    expect(quantityInput).toHaveValue(1);
  });

  it('calls onAddToCart when add to cart button is clicked', () => {
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('prevents quantity from going below 1', () => {
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const decrementButton = screen.getByRole('button', { name: /minus/i });
    const quantityInput = screen.getByDisplayValue('1');

    // Try to decrement from 1 - should stay at 1
    fireEvent.click(decrementButton);
    expect(quantityInput).toHaveValue(1);
    expect(decrementButton).toBeDisabled();
  });
});