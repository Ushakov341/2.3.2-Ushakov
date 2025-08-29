import { useEffect, useState } from 'react';
import type { Product } from '../types/product';

const URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error('Failed to load');
        const data: Product[] = await res.json();
        if (!cancelled) setProducts(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? 'Error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
