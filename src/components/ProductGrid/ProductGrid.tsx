import { SimpleGrid, Container, Title } from '@mantine/core';
import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="xl" ta="center" c="green.8">
        Catalog
      </Title>
      
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 4 }}
        spacing="lg"
        verticalSpacing="lg"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};