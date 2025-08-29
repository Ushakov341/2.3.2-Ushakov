import { Button, Card, Group, Image, NumberInput, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { Product } from '../../types/product';
import classes from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number | string) => {
    if (value === '' || value === null || value === undefined) {
      return; // Don't update if value is empty
    }
    const newQuantity = typeof value === 'string' ? parseInt(value) : value;
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(Math.max(1, Math.min(newQuantity, product.availableCount)));
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => Math.min(prev + 1, product.availableCount));
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <Card className={classes.card} padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={product.imageUrl}
          height={160}
          alt={product.name}
          fit="cover"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} size="sm">
          {product.name}
        </Text>
        <Text size="xs" c="dimmed">
          {product.quantity}
        </Text>
      </Group>

      <Text size="xl" fw={700} c="green.6" mb="md">
        $ {product.price}
      </Text>

      <Group justify="space-between" mb="md">
        <Group gap={4}>
          <Button
            variant="outline"
            size="xs"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className={classes.quantityButton}
          >
            <IconMinus size={12} />
          </Button>
          
          <NumberInput
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={product.availableCount}
            size="xs"
            w={60}
            allowDecimal={false}
            allowNegative={false}
            clampBehavior="strict"
            styles={{
              input: {
                textAlign: 'center',
                padding: '4px',
              }
            }}
          />
          
          <Button
            variant="outline"
            size="xs"
            onClick={handleIncrement}
            disabled={quantity >= product.availableCount}
            className={classes.quantityButton}
          >
            <IconPlus size={12} />
          </Button>
        </Group>
      </Group>

      <Button
        variant="filled"
        color="green"
        fullWidth
        onClick={handleAddToCart}
        className={classes.addButton}
      >
        Add to cart
      </Button>
    </Card>
  );
};