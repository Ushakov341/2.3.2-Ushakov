import { useState } from 'react';
import { CartItem, Product } from '../types/product';
import { notifications } from '@mantine/notifications';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, cartQuantity: quantity }];
      }
    });

    notifications.show({
      title: 'Added to cart',
      message: `${product.name} has been added to your cart`,
      color: 'green',
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, cartQuantity: quantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.cartQuantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      const itemQuantity = typeof item.cartQuantity === 'number' ? item.cartQuantity : 0;
      return sum + (itemPrice * itemQuantity);
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  };
};