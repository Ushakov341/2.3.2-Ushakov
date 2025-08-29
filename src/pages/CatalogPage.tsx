import { Grid, Loader, Center, Alert, Title, Space } from '@mantine/core';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../features/catalog/ProductCard';

export function CatalogPage() {
  const { products, loading, error } = useProducts();

  return (
    <>
      <Title order={3} my="sm">
        Catalog
      </Title>
      <Space h="sm" />
      {loading && (
        <Center py={40}>
          <Loader />
        </Center>
      )}
      {error && (
        <Alert color="red" title="Error" variant="light">
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Grid gutter="md">
          {products.map((p) => (
            <Grid.Col key={p.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={p} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  );
}
