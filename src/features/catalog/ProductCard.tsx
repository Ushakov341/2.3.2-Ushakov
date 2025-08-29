import {
  Card,
  Image,
  Text,
  Group,
  Button,
  NumberInput,
  ActionIcon,
  rem,
} from '@mantine/core';
import { IconMinus, IconPlus, IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';
import type { Product } from '../../types/product';
import { useCart } from '../cart/CartContext';
import { money } from '../../shared/currency';

export function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const inc = () => setQty((q) => Math.min(99, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="lg"
      withBorder
      style={{
        transition: 'transform .15s ease, box-shadow .15s ease',
      }}
      className="product-card"
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = 'translateY(-2px)')
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <Card.Section
        p="md"
        style={{ background: 'var(--mantine-color-gray-0)' }}
      >
        <Image src={product.image} alt={product.name} h={180} fit="contain" />
      </Card.Section>

      <Text mt="sm" fw={600}>
        {product.name}
      </Text>
      <Text size="xs" c="dimmed">
        1 kg
      </Text>

      <Group justify="space-between" mt="sm" align="center">
        <Text fw={700}>{money(product.price)}</Text>

        <Group gap={6} align="center">
          <ActionIcon variant="light" onClick={dec} aria-label="decrease">
            <IconMinus style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>

          <NumberInput
            value={qty}
            min={1}
            max={99}
            onChange={(v) => setQty(Number(v) || 1)}
            w={68}
            aria-label={`qty-${product.id}`}
          />

          <ActionIcon variant="light" onClick={inc} aria-label="increase">
            <IconPlus style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
        </Group>
      </Group>

      <Button
        fullWidth
        mt="md"
        leftSection={<IconShoppingCart size={18} />}
        onClick={() => add(product, qty)}
        color="leaf"
        variant="filled"
      >
        Add to cart
      </Button>
    </Card>
  );
}
