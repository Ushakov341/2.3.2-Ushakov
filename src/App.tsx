import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { fetchProducts } from './api/products';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { Header } from './components/Header/Header';
import { LoadingGrid } from './components/LoadingGrid/LoadingGrid';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { useCart } from './hooks/useCart';
import { Product } from './types/product';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartOpened, setCartOpened] = useState(false);
  
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleCartToggle = () => {
    setCartOpened(!cartOpened);
  };

  return (
    <MantineProvider>
      <Notifications position="top-right" />
      
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Header
          cartItemsCount={getTotalItems()}
          cartTotal={getTotalPrice()}
          onCartClick={handleCartToggle}
        />

        <main>
          {loading ? (
            <LoadingGrid />
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>{error}</p>
            </div>
          ) : (
            <ProductGrid products={products} onAddToCart={addToCart} />
          )}
        </main>

        <CartDrawer
          opened={cartOpened}
          onClose={handleCartToggle}
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          totalPrice={getTotalPrice()}
          onClearCart={clearCart}
        />
      </div>
    </MantineProvider>
  );
}

export default App;