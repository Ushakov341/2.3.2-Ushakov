import { renderHook, act } from '@testing-library/react';
import { useCart } from '../useCart';
import { Product } from '../../types/product';

// Mock notifications
jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

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

describe('useCart', () => {
  it('should add product to cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].cartQuantity).toBe(2);
    expect(result.current.getTotalItems()).toBe(2);
    expect(result.current.getTotalPrice()).toBe(2.40);
  });

  it('should update quantity when adding existing product', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 1);
    });

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].cartQuantity).toBe(3);
    expect(result.current.getTotalItems()).toBe(3);
  });

  it('should remove product from cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('should update cart quantity', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    act(() => {
      result.current.updateCartQuantity(mockProduct.id, 5);
    });

    expect(result.current.cartItems[0].cartQuantity).toBe(5);
    expect(result.current.getTotalItems()).toBe(5);
  });

  it('should remove product when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    act(() => {
      result.current.updateCartQuantity(mockProduct.id, 0);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });
});