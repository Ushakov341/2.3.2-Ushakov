import { Container, SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';

export const LoadingGrid = () => {
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
        {Array.from({ length: 8 }).map((_, index) => (
          <Stack key={index} gap="md">
            <Skeleton height={160} radius="md" />
            <Skeleton height={20} width="70%" />
            <Skeleton height={16} width="50%" />
            <Skeleton height={32} width="80%" />
            <Skeleton height={36} />
          </Stack>
        ))}
      </SimpleGrid>
    </Container>
  );
};